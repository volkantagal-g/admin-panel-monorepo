import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { isArray } from 'lodash';

import history from '@shared/utils/history';
import { createFranchiseDynamicConfig, getFranchiseConfigType } from '@shared/api/franchiseDynamicConfig';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

function* createFranchiseDynamicConfigRequest({ configType, values }) {
  try {
    yield call(createFranchiseDynamicConfig, { configType, values });

    yield put(Creators.createFranchiseDynamicConfigSuccess());
    yield put(ToastCreators.success());
    history.push(ROUTE.FRANCHISE_CONFIG_LIST.path);
  }
  catch (error) {
    yield put(Creators.createFranchiseDynamicConfigFailure({ error }));
    yield put(ToastCreators.error({
      error: error.message,
      message: isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message,
    }));
  }
}

function* watchCreateFranchiseDynamicConfigRequest() {
  yield takeLatest(Types.CREATE_FRANCHISE_DYNAMIC_CONFIG_REQUEST, createFranchiseDynamicConfigRequest);
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

export default function* franchiseDynamicConfigRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateFranchiseDynamicConfigRequest),
      fork(watchFranchiseDynamicConfigTypeListRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
