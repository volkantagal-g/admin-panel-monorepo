import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getCourierGamificationKPI as getCourierGamificationKPIApi } from '@shared/api/courierGamification';

function* getCourierGamificationKPIRequest() {
  try {
    const { kpis } = yield call(getCourierGamificationKPIApi);
    yield put(Creators.getCourierGamificationKpiSuccess({ data: kpis }));
  }
  catch (error) {
    yield put(Creators.getCourierGamificationKpiFailure({ error }));
  }
}

function* watchGetCourierGamificationKPIRequest() {
  yield takeLatest(Types.GET_COURIER_GAMIFICATION_KPI_REQUEST, getCourierGamificationKPIRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundtasks = yield all([
      fork(watchGetCourierGamificationKPIRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundtasks);
  }
}
