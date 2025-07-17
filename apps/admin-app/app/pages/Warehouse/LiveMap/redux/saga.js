import { all, call, cancel, fork, put, take, takeLatest, select, delay } from 'redux-saga/effects';
import { isEmpty as _isEmpty } from 'lodash';

import { getWarehouseInfoForWarehouseBasedLiveMap as getWarehouseInfoForWarehouseBasedLiveMapAPI } from '@shared/api/warehouse';
import { getInitialCouriersForLiveMap as getInitialCouriersForLiveMapAPI } from '@shared/api/courier';
import { getPolygonsByPolygonTypes as getPolygonsByPolygonTypesAPI } from '@shared/api/polygon';

import history from '@shared/utils/history';
import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { filtersSelector } from '@app/pages/Warehouse/LiveMap/redux/selectors';
import { COURIERS_DATE_REFRESH_INTERVAL_AS_MS } from '../constants';
import { Types, Creators } from './actions';
import { WAREHOUSE_REQUIRED_POLYGON_TYPES } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getWarehouse({ id }) {
  try {
    const warehouse = yield call(getWarehouseInfoForWarehouseBasedLiveMapAPI, { id });
    yield put(Creators.getWarehouseSuccess({ data: warehouse || {} }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getWarehouseFailure({ error }));
    if (!_isEmpty(error?.response?.data?.[getLangKey()])) {
      history.push(ROUTE.WAREHOUSE_LIST.path);
    }
  }
}

function* watchGetWarehouseRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_REQUEST, getWarehouse);
}

function* getPolygons({ id }) {
  try {
    const requestBody = { warehouseId: id, isActive: true, polygonTypes: WAREHOUSE_REQUIRED_POLYGON_TYPES };
    const { polygons } = yield call(getPolygonsByPolygonTypesAPI, { requestBody });
    yield put(Creators.getPolygonsSuccess({ data: polygons || {} }));
  }
  catch (error) {
    yield put(Creators.getPolygonsFailure({ error }));
  }
}

function* watchGetPolygonsRequest() {
  yield takeLatest(Types.GET_POLYGONS_REQUEST, getPolygons);
}

function* getWarehouseCouriers() {
  try {
    const { warehouseId } = yield select(filtersSelector.getFilters);
    const couriers = yield call(getInitialCouriersForLiveMapAPI, { warehouseIds: [warehouseId] });
    yield put(Creators.getWarehouseCouriersSuccess({ data: couriers || [] }));
  }
  catch (error) {
    yield put(Creators.getWarehouseCouriersFailure({ error }));
  }
}

function* refreshCouriers() {
  while (true) {
    yield call(getWarehouseCouriers);
    yield delay(COURIERS_DATE_REFRESH_INTERVAL_AS_MS);
  }
}

function* startCouriersRefreshLogic() {
  yield takeLatest(Types.START_COURIERS_REFRESH_LOGIC, refreshCouriers);
}

function* stopCouriersRefreshLogic() {
  while (true) {
    yield take(Types.STOP_COURIERS_REFRESH_LOGIC);
    yield cancel(refreshCouriers);
  }
}

export default function* warehouseLiveMapPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWarehouseRequest),
      fork(watchGetPolygonsRequest),
      fork(startCouriersRefreshLogic),
      fork(stopCouriersRefreshLogic),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
