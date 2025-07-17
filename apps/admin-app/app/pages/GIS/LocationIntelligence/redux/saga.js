import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import { getPolygonReqBody } from '../utils/helper';

import { getGPolygons } from '@shared/api/gis/gpolygon';

import { locationIntelligenceSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { getAvailableStats, getPolygonStats } from '@shared/api/gis/core';

const errorMessagePath = 'response.data.details.0.message';

function* getAvailableStatsRequest() {
  try {
    const filters = yield select(locationIntelligenceSelector.getAvailableStatFilters);
    const { geoBoundaryType } = filters;
    if (geoBoundaryType) {
      const data = yield call(getAvailableStats, geoBoundaryType);
      yield put(Creators.getAvailableStatsSuccess({ data }));
    }
  }
  catch (error) {
    const errorMessage = get(error, errorMessagePath);
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getAvailableStatsFailure({ error: errorMessage }));
  }
}
function* watchGetAvailableStatsRequest() {
  yield takeLatest(Types.GET_AVAILABLE_STATS_REQUEST, getAvailableStatsRequest);
}

function* getStatsLocationsRequest() {
  try {
    const filters = yield select(locationIntelligenceSelector.getStatsLocationsFilters);
    delete filters.dateRangeType;

    const data = yield call(getPolygonStats, filters);
    yield put(Creators.getStatsLocationsSuccess({ data }));
  }
  catch (error) {
    const statErrorPath = 'response.data.message';
    const errorMessage = get(error, statErrorPath);
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getStatsLocationsFailure({ error: errorMessage }));
  }
}
function* watchGetStatsLocationsRequest() {
  yield takeLatest(Types.GET_STATS_LOCATIONS_REQUEST, getStatsLocationsRequest);
}

function* getPolygonsRequest() {
  try {
    const filters = yield select(locationIntelligenceSelector.getPolygonFilters);
    const requestBody = getPolygonReqBody({ filters });

    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getPolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, errorMessagePath);
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getPolygonsFailure({ error: errorMessage }));
  }
}

function* watchGetPolygonsRequest() {
  yield takeLatest(Types.GET_POLYGONS_REQUEST, getPolygonsRequest);
}

export default function* gisLocationIntelligenceRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPolygonsRequest),
      fork(watchGetAvailableStatsRequest),
      fork(watchGetStatsLocationsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
