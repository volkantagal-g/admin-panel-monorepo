import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import { Types, Creators } from './actions';
import { heatMapSelector } from './selectors';
import { getPolygonReqBody, getDataGWReqBody } from '../utils/helpers';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getGPolygons } from '@shared/api/gis/gpolygon';

import {
  getAppOpenLocations,
  getSuccessfulOrderLocations,
  getMissedOrderLocations,
  getDownloadLocations,
} from '@shared/api/gis/heatmap';

function* getPolygonsRequest() {
  try {
    const filters = yield select(heatMapSelector.getPolygonFilters);
    const requestBody = getPolygonReqBody({ filters });

    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getPolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetPolygonsRequest() {
  yield takeLatest(Types.GET_POLYGONS_REQUEST, getPolygonsRequest);
}

function* getAppOpenLocationsRequest() {
  try {
    const filters = yield select(heatMapSelector.getHeatMapFilters);
    const requestBody = getDataGWReqBody({ filters });

    const { data: appOpen } = yield call(getAppOpenLocations, { requestBody });
    yield put(Creators.getAppOpenLocationsSuccess({ data: appOpen }));
    yield put(Creators.setHeatMapData({ data: appOpen }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetAppOpenLocationsRequest() {
  yield takeLatest(Types.GET_APP_OPEN_LOCATIONS_REQUEST, getAppOpenLocationsRequest);
}

function* getMissedOrderLocationsRequest() {
  try {
    const filters = yield select(heatMapSelector.getHeatMapFilters);
    const requestBody = getDataGWReqBody({ filters });

    const { data: missedOrders } = yield call(getMissedOrderLocations, { requestBody });
    yield put(Creators.getMissedOrderLocationsSuccess({ data: missedOrders }));
    yield put(Creators.setHeatMapData({ data: missedOrders }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetMissedOrderLocationsRequest() {
  yield takeLatest(Types.GET_MISSED_ORDER_LOCATIONS_REQUEST, getMissedOrderLocationsRequest);
}

function* getSuccessOrderLocationsRequest() {
  try {
    const filters = yield select(heatMapSelector.getHeatMapFilters);
    const requestBody = getDataGWReqBody({ filters });

    const { data: successOrders } = yield call(getSuccessfulOrderLocations, { requestBody });
    yield put(Creators.getSuccessOrderLocationsSuccess({ data: successOrders }));
    yield put(Creators.setHeatMapData({ data: successOrders }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetSuccessOrderLocationsRequest() {
  yield takeLatest(Types.GET_SUCCESS_ORDER_LOCATIONS_REQUEST, getSuccessOrderLocationsRequest);
}

function* getDownloadLocationsRequest() {
  try {
    const filters = yield select(heatMapSelector.getHeatMapFilters);
    const requestBody = getDataGWReqBody({ filters });

    const { data: downloadLocations } = yield call(getDownloadLocations, { requestBody });
    yield put(Creators.getDownloadLocationsSuccess({ data: downloadLocations }));
    yield put(Creators.setHeatMapData({ data: downloadLocations }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetDownloadLocationsRequest() {
  yield takeLatest(Types.GET_DOWNLOAD_LOCATIONS_REQUEST, getDownloadLocationsRequest);
}

export default function* heatMapRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPolygonsRequest),
      fork(watchGetAppOpenLocationsRequest),
      fork(watchGetMissedOrderLocationsRequest),
      fork(watchGetSuccessOrderLocationsRequest),
      fork(watchGetDownloadLocationsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
