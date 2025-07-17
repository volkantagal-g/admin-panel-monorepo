import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { get } from 'lodash';

import { Creators, Types } from './actions';

import { getH3IdsByGeometry, getPolygonReqBody } from '../utils/helper';

import { getGPolygons } from '@shared/api/gis/gpolygon';
import { getWeatherForecast } from '@shared/api/gis/weather';

import { weatherMapSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const errorMessagePath = 'response.data.details.0.message';

function* getWeatherForecastRequest() {
  try {
    const polygonFilters = yield select(weatherMapSelector.getPolygonFilters);
    const requestBody = getPolygonReqBody({ filters: polygonFilters });

    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getPolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, errorMessagePath);
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getPolygonsFailure({ error: errorMessage }));
  }

  try {
    const weatherFilters = yield select(weatherMapSelector.getWeatherForecastFilters);
    const polygons = yield select(weatherMapSelector.getPolygons);
    const h3Ids = yield getH3IdsByGeometry(polygons);

    const requestBody = { hexagonIds: h3Ids, ...weatherFilters };
    const data = yield call(getWeatherForecast, { requestBody });
    yield put(Creators.getWeatherForecastSuccess({ data }));
  }
  catch (error) {
    const weatherForcastErrorPath = 'response.data.message';
    const errorMessage = get(error, weatherForcastErrorPath);
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getWeatherForecastFailure({ error: errorMessage }));
  }
}

function* watchGetWeatherForecastRequest() {
  yield takeLatest(Types.GET_WEATHER_FORECAST_REQUEST, getWeatherForecastRequest);
}
export default function* gisWeatherMapRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWeatherForecastRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
