import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getTestList } from '@shared/api/abTesting';

import { Types, Creators } from './actions';

function* getABTestsRequest({ requestData }) {
  try {
    const data = yield call(getTestList, requestData);
    yield put(Creators.getABTestsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getABTestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetABTestsRequest() {
  yield takeLatest(Types.GET_AB_TESTS_REQUEST, getABTestsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetABTestsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
