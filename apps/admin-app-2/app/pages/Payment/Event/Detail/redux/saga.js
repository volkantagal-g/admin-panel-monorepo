import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getEventDetail } from '@shared/api/payment';
import { Types, Creators } from './actions';

function* getEventDetailRequest({ id }) {
  try {
    const { data } = yield call(getEventDetail, { id });
    yield put(Creators.getEventDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getEventDetailFailure({ error }));
  }
}

function* watchGetEventDetailRequest() {
  yield takeLatest(Types.GET_EVENT_DETAIL_REQUEST, getEventDetailRequest);
}

export default function* transactionEventDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetEventDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
