import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { cloneDeep, isArray } from 'lodash';

import { getFranchiseConfigTypeDetail, updateFranchiseConfigTypeDetail } from '@shared/api/franchiseDynamicConfig';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getFranchiseConfigTypeDetailRequest({ id }) {
  try {
    const data = yield call(getFranchiseConfigTypeDetail, { id });
    yield put(Creators.getFranchiseConfigTypeDetailSuccess({ data, initialData: cloneDeep(data) }));
  }
  catch (error) {
    yield put(Creators.getFranchiseConfigTypeDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseConfigTypeDetailRequest({ id, name, description, fields, keys }) {
  try {
    const data = yield call(updateFranchiseConfigTypeDetail, { id, name, description, fields, keys });
    yield put(Creators.updateFranchiseConfigTypeDetailSuccess({ data }));
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateFranchiseConfigTypeDetailFailure({ error }));
    yield put(ToastCreators.error({
      error: error.message,
      message: isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message,
    }));
  }
}

function* watchGetFranchiseConfigTypeDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_REQUEST, getFranchiseConfigTypeDetailRequest);
}

function* watchUpdateFranchiseConfigTypeDetailRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_CONFIG_TYPE_DETAIL_REQUEST, updateFranchiseConfigTypeDetailRequest);
}

export default function* franchiseConfigTypeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFranchiseConfigTypeDetailRequest),
      fork(watchUpdateFranchiseConfigTypeDetailRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
