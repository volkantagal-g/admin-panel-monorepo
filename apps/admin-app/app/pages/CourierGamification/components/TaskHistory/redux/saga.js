import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getTaskHistory } from '@shared/api/courierGamification';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getTaskHistoryRequest({ id, limit, offset }) {
  try {
    const data = yield call(getTaskHistory, { id, limit, offset });
    yield put(Creators.getTaskHistorySuccess({ data: data?.taskHistory }));
  }
  catch (error) {
    yield put(Creators.getTaskHistoryFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTaskHistoryRequest() {
  yield takeLatest(Types.GET_TASK_HISTORY_REQUEST, getTaskHistoryRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTaskHistoryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
