import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getFranchiseConfig, getFranchiseConfigType } from '@shared/api/franchiseDynamicConfig';

function* getFranchiseDynamicConfigListRequest({ filters, configType }) {
  try {
    const { data, total } = yield call(getFranchiseConfig, { filters, configType });

    yield put(Creators.getFranchiseDynamicConfigListSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getFranchiseDynamicConfigListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFranchiseDynamicConfigListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_DYNAMIC_CONFIG_LIST_REQUEST, getFranchiseDynamicConfigListRequest);
}

function* getFranchiseDynamicConfigTypeListRequest() {
  try {
    const { data } = yield call(getFranchiseConfigType, {});

    yield put(Creators.getFranchiseDynamicConfigTypeListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseDynamicConfigTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFranchiseDynamicConfigTypeListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_REQUEST, getFranchiseDynamicConfigTypeListRequest);
}

export default function* franchiseDynamicConfigListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFranchiseDynamicConfigListRequest),
      fork(watchFranchiseDynamicConfigTypeListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
