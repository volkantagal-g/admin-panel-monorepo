import { all, call, cancel, delay, fork, put, race, take } from 'redux-saga/effects';

import { getLiveMapAllCourierCountsAndCourierPlan } from '@shared/api/artisanLiveMap';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { REQUEST_INTERVAL_MS } from '../constants';

function* getCourierPlanAndCountsRequest() {
  while (true) {
    try {
      const { data } = yield call(getLiveMapAllCourierCountsAndCourierPlan);
      yield put(Creators.getCourierPlanAndCountsSuccess({ data }));
      yield delay(REQUEST_INTERVAL_MS);
    }
    catch (error) {
      yield put(Creators.getCourierPlanAndCountsFailure({ error }));
      yield put(ToastCreators.error({ error }));
      yield put({ type: 'STOP_WATCHER_TASK', error });
    }
  }
}

function* watchCourierPlanAndCountsRequest() {
  while (true) {
    yield take(Types.GET_COURIER_PLAN_AND_COUNTS_REQUEST);
    yield race([call(getCourierPlanAndCountsRequest), take('STOP_WATCHER_TASK')]);
  }
}

export default function* getirLocalsCourierLiveMonitoringRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchCourierPlanAndCountsRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
