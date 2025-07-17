import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getCountries, getXWeekStats, getStatsBetweenDates } from '@shared/api/euGrowthComparison';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getCountriesRequest() {
  try {
    const data = yield call(getCountries);
    yield put(Creators.getCountriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCountriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCountriesRequest() {
  yield takeLatest(Types.GET_COUNTRIES_REQUEST, getCountriesRequest);
}

function* getXWeekStatsRequest({ week }) {
  try {
    const data = yield call(getXWeekStats, { week });
    yield put(Creators.getXWeekStatsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getXWeekStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetXWeekStatsRequest() {
  yield takeLatest(Types.GET_X_WEEK_STATS_REQUEST, getXWeekStatsRequest);
}

function* getStatsBetweenDatesRequest({
  startDateL,
  endDateL,
}) {
  try {
    const data = yield call(getStatsBetweenDates, {
      startDateL,
      endDateL,
    });
    yield put(Creators.getStatsBetweenDatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getStatsBetweenDatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetStatsBetweenDatesRequest() {
  yield takeLatest(Types.GET_STATS_BETWEEN_DATES_REQUEST, getStatsBetweenDatesRequest);
}

export default function* euGrowthComparisonRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCountriesRequest),
      fork(watchGetXWeekStatsRequest),
      fork(watchGetStatsBetweenDatesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
