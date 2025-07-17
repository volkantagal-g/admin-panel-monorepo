import { call, all, cancel, fork, put, take, takeLatest, delay } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getAlertData, alertResolve } from '@shared/api/getirLocalsReturn';
import { Types, Creators } from './actions';

const REFRESH_INTERVAL = 60 * 1000;

function* refreshAlertData() {
  const data = yield call(getAlertData);
  yield put(Creators.getAlertDataSuccess({ data }));
}

function* getAlertDataRequest() {
  try {
    yield call(refreshAlertData);

    while (true) {
      yield delay(REFRESH_INTERVAL);
      yield call(refreshAlertData);
    }
  }
  catch (error) {
    yield put(Creators.getAlertDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAlertResolveDataRequest({ id }) {
  try {
    const data = yield call(alertResolve, { id });
    yield put(Creators.getAlertResolveDataSuccess({ data }));
    if (data?.resolved) {
      yield put(Creators.getAlertDataRequest());
    }
  }
  catch (error) {
    yield put(Creators.getAlertResolveDataFailure({ error }));
  }
}

function* watchGetAlertDataRequest() {
  yield takeLatest(Types.GET_ALERT_DATA_REQUEST, getAlertDataRequest);
}

function* watchGetAlertResolveDataRequest() {
  yield takeLatest(Types.GET_ALERT_RESOLVE_DATA_REQUEST, getAlertResolveDataRequest);
}

export default function* dataTrackingOrderRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAlertDataRequest),
      fork(watchGetAlertResolveDataRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
