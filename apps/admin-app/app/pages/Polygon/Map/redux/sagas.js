import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { Types, Creators } from './actions';
import { polygonsMapSelector } from './selectors';
import { getPolygonRequestBody } from '../utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { updatePolygonsByPolygonType } from '@shared/api/polygon';
import { getGPolygons } from '@shared/api/gis/gpolygon';

import { getGisConfigByKey } from '@shared/api/gis/config';

function* getGorillasWhsRequest({ body }) {
  const { key, type } = body;
  try {
    const data = yield call(getGisConfigByKey, { key, type });
    yield put(Creators.getGorillasWhsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getGorillasWhsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetGorillasWhsRequest() {
  yield takeLatest(Types.GET_GORILLAS_WHS_REQUEST, getGorillasWhsRequest);
}

function* getSlottedDeliveryConfigRequest({ body }) {
  const { key, type } = body;
  try {
    const data = yield call(getGisConfigByKey, { key, type });
    yield put(Creators.getSlottedDeliveryConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSlottedDeliveryConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetSlottedDeliveryConfigRequest() {
  yield takeLatest(Types.GET_SLOTTED_DELIVERY_CONFIG_REQUEST, getSlottedDeliveryConfigRequest);
}

function* getPolygonsRequest() {
  try {
    const filters = yield select(polygonsMapSelector.getFilters);
    const requestBody = getPolygonRequestBody({ filters });

    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getPolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetPolygonsRequest() {
  yield takeLatest(Types.GET_POLYGONS_REQUEST, getPolygonsRequest);
}

function* updatePolygonsRequest({ polygonType, updateData }) {
  try {
    const { polygon: data } = yield call(updatePolygonsByPolygonType, { polygonType, updateData });
    yield put(Creators.updatePolygonsSuccess({ data }));
    yield put(ToastCreators.success());
    // TODO
    // Remove next line after gPolygons POST method implementation
    yield put(Creators.getPolygonsRequest());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchUpdatePolygonsRequest() {
  yield takeLatest(Types.UPDATE_POLYGONS_REQUEST, updatePolygonsRequest);
}

export default function* polygonMapRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetPolygonsRequest),
      fork(watchUpdatePolygonsRequest),
      fork(watchGetGorillasWhsRequest),
      fork(watchGetSlottedDeliveryConfigRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
