import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { isArray } from 'lodash';

import { getFranchiseConfigTypeDetail, getFranchiseDynamicDetailConfig, updateFranchiseDynamicConfig } from '@shared/api/franchiseDynamicConfig';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getFranchiseDynamicConfigDetailRequest({ id }) {
  try {
    const data = yield call(getFranchiseDynamicDetailConfig, { id });
    yield put(Creators.getFranchiseDynamicConfigDetailSuccess({ data }));
    yield put(Creators.getFranchiseConfigTypeDetailRequest({ id: data.configType }));
  }
  catch (error) {
    yield put(Creators.getFranchiseDynamicConfigDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseDynamicConfigRequest({ values }) {
  try {
    const data = yield call(updateFranchiseDynamicConfig, { values });
    yield put(Creators.updateFranchiseDynamicConfigSuccess({ data }));
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateFranchiseDynamicConfigFailure({ error }));
    yield put(ToastCreators.error({
      error: error.message,
      message: isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message,
    }));
  }
}

function* getFranchiseConfigTypeDetailRequest({ id }) {
  try {
    const data = yield call(getFranchiseConfigTypeDetail, { id });
    yield put(Creators.getFranchiseConfigTypeDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseConfigTypeDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFranchiseConfigTypeDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_REQUEST, getFranchiseConfigTypeDetailRequest);
}

function* watchGetFranchiseDynamicConfigDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_DYNAMIC_CONFIG_DETAIL_REQUEST, getFranchiseDynamicConfigDetailRequest);
}

function* watchUpdateFranchiseConfigRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_DYNAMIC_CONFIG_REQUEST, updateFranchiseDynamicConfigRequest);
}

export default function* franchiseConfigRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFranchiseDynamicConfigDetailRequest),
      fork(watchUpdateFranchiseConfigRequest),
      fork(watchGetFranchiseConfigTypeDetailRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
