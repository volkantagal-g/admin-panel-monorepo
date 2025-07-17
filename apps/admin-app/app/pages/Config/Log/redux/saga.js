import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getConfigLog } from '@shared/api/marketConfig';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getConfigLogRequest({ key, startDate, endDate, limit, offset }) {
  try {
    const data = yield call(getConfigLog, { key, startDate, endDate, limit, offset });
    yield put(Creators.getConfigLogSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigLogFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetConfigLogRequest() {
  yield takeLatest(Types.GET_CONFIG_LOG_REQUEST, getConfigLogRequest);
}

export default function* createConfigRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetConfigLogRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
