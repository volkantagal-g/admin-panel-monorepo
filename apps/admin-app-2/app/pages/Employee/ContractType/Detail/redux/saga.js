import { get } from 'lodash';
import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getForm } from '@shared/api/dynamicForm';
import { getContractDetailApi, saveContractDetailApi, updateContractDetailApi } from '@shared/api/personContractType';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { PERSON_CONTRACT_GROUP_ID as contractGroupId } from '@shared/shared/constants';
import { Creators, Types } from './actions';

function getCountryCode() {
  const country = getSelectedCountry();
  const countryCode = get(country, ['code', 'alpha2'], '');
  return countryCode;
}

function* getFormRequest({ formType, formName }) {
  try {
    const countryCode = getCountryCode();
    const data = yield call(getForm, { formType, formName, countryCode });
    yield put(Creators.getContractFormSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getContractFormFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDetailFormRequest() {
  yield takeLatest(Types.GET_CONTRACT_FORM_REQUEST, getFormRequest);
}

function* getDetailRequest({ id }) {
  try {
    const data = yield call(getContractDetailApi, id);
    yield put(Creators.getContractSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getContractFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDetailRequest() {
  yield takeLatest(Types.GET_CONTRACT_REQUEST, getDetailRequest);
}

function* saveDetailRequest({ type, ...formData }) {
  try {
    const data = yield call(saveContractDetailApi, formData);
    yield put(Creators.saveContractSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.saveContractFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSaveDetailRequest() {
  yield takeLatest(Types.SAVE_CONTRACT_REQUEST, saveDetailRequest);
}

function updateDetailRequest(groupId) {
  let creatorSuccess;
  let creatorFailure;

  switch (groupId) {
    case contractGroupId.break:
      creatorSuccess = Creators.updateContractBreakSuccess;
      creatorFailure = Creators.updateContractBreakFailure;
      break;
    case contractGroupId.leave:
      creatorSuccess = Creators.updateContractLeaveSuccess;
      creatorFailure = Creators.updateContractLeaveFailure;
      break;
    case contractGroupId.compConfig:
      creatorSuccess = Creators.updateContractCompSuccess;
      creatorFailure = Creators.updateContractCompFailure;
      break;
    case contractGroupId.schdConfig:
      creatorSuccess = Creators.updateContractSchdConfigSuccess;
      creatorFailure = Creators.updateContractSchdConfigFailure;
      break;
    default:
      creatorSuccess = Creators.updateContractSuccess;
      creatorFailure = Creators.updateContractFailure;
      break;
  }

  return function* req({ id, data: formData }) {
    try {
      const data = yield call(updateContractDetailApi, { groupId, id, ...formData });
      yield put(creatorSuccess({ data }));
    }
    catch (error) {
      yield put(creatorFailure({ error }));
      yield put(ToastCreators.error({ error }));
    }
  };
}

function watchUpdateDetailRequest(groupId) {
  let actionType;

  switch (groupId) {
    case contractGroupId.break:
      actionType = Types.UPDATE_CONTRACT_BREAK_REQUEST;
      break;
    case contractGroupId.leave:
      actionType = Types.UPDATE_CONTRACT_LEAVE_REQUEST;
      break;
    case contractGroupId.compConfig:
      actionType = Types.UPDATE_CONTRACT_COMP_REQUEST;
      break;
    case contractGroupId.schdConfig:
      actionType = Types.UPDATE_CONTRACT_SCHD_CONFIG_REQUEST;
      break;
    default:
      actionType = Types.UPDATE_CONTRACT_REQUEST;
      break;
  }
  return function* watcher() {
    yield takeLatest(actionType, updateDetailRequest(groupId));
  };
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDetailFormRequest),
      fork(watchGetDetailRequest),
      fork(watchSaveDetailRequest),
      fork(watchUpdateDetailRequest(contractGroupId.leave)),
      fork(watchUpdateDetailRequest(contractGroupId.break)),
      fork(watchUpdateDetailRequest(contractGroupId.genInfo)),
      fork(watchUpdateDetailRequest(contractGroupId.schdConfig)),
      fork(watchUpdateDetailRequest(contractGroupId.compConfig)),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
