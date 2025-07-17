import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { eventChannel } from 'redux-saga';

import { getBusinessMonitoringDataForLiveMap } from '@shared/api/businessMonitoring';
import { getGPolygons } from '@shared/api/gis/gpolygon';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { SOCKET_EVENT } from '@shared/api/socket/constants';
import { getInitialCouriersForLiveMap } from '@shared/api/courier';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { createSocketEventChannel } from '@shared/redux/sagas/common';
import { Types, Creators } from './actions';
import { formatCourierCountsTableData } from '../components/CourierStatsPanel/utils';
import socketCache from './socketCache';
import {
  getFilteredWarehousesMap,
  filtersSelector,
  getSelectedFilterCountryCode,
  getSelectedDivisionSelector,
} from './selectors';

const {
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
} = require('@shared/shared/constants');

function* getPolygonsRequest({ data }) {
  const { selectedPolygonType, selectedCity } = data;
  const [domainType, polygonType] = selectedPolygonType.split('-');

  const requestBody = {
    domainTypes: [Number(domainType)],
    city: [selectedCity],
    polygonTypes: [Number(polygonType)],
    current: true,
  };

  try {
    const { polygons } = yield call(getGPolygons, { requestBody });

    yield put(Creators.getPolygonsSuccess({ data: polygons }));
  }
  catch (error) {
    yield put(Creators.getPolygonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLiveMapDataRequest({ selectedCity, selectedCountryCode, selectedDivision }) {
  const requestBody = { selectedCity, selectedCountryCode, selectedDivision };
  try {
    const liveMapData = yield call(getBusinessMonitoringDataForLiveMap, requestBody);

    yield put(Creators.getLiveMapDataSuccess({ data: liveMapData }));
  }
  catch (error) {
    yield put(Creators.getLiveMapDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getInitialCouriersRequest({ data }) {
  try {
    yield put(Creators.startListeningSocketEvents());
    const dataFetched = yield call(getInitialCouriersForLiveMap, data);
    const arrayToIdMap = dataFetched.reduce((accum, courier) => {
      // eslint-disable-next-line no-param-reassign
      accum[courier._id || courier.id] = courier;
      return accum;
    }, {});
    // initialize socket cache with newly fetched couirers
    socketCache.resetCouriers(arrayToIdMap);
    yield put(Creators.getInitialCouriersSuccess({ data: dataFetched }));
  }
  catch (error) {
    yield put(Creators.getInitialCouriersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* setDomainType() {
  while (true) {
    const { domainType } = yield take(Types.SET_DOMAIN_TYPE);
    yield put(CommonCreators.setSelectedDomainType({ data: domainType }));
  }
}

function intervalCounter(delay) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter(delay);
    }, delay);
    return () => {
      clearInterval(iv);
    };
  });
}

const UPDATE_INTERVAL_IN_MS = 30_000; // 30 secs

function* refetchPageData() {
  const intervalCounterChannel = yield call(intervalCounter, UPDATE_INTERVAL_IN_MS);
  const selectedCountry = getSelectedCountry()._id;
  try {
    while (true) {
      yield take(intervalCounterChannel);
      const selectedCity = yield select(filtersSelector.getCity);
      const selectedFilterCountryCode = yield select(getSelectedFilterCountryCode);
      const selectedDivision = yield select(getSelectedDivisionSelector);

      yield put(
        Creators.getLiveMapDataRequest({
          selectedCity,
          selectedCountryCode: selectedFilterCountryCode,
          selectedDivision: selectedDivision?.id,
        }),
      );
      const socketData = socketCache.getData(selectedCity, selectedCountry);
      yield put(Creators.updateStateWithSocketData({ data: socketData }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    intervalCounterChannel.close();
  }
}

function* watchStartInterval() {
  yield takeLatest(Types.START_INTERVAL, refetchPageData);
}

function* watchSocketEvents() {
  // take once
  yield take(Types.START_LISTENING_SOCKET_EVENTS);
  const [
    locationChannel,
    statusChannel,
    marketNewChannel,
    foodFailChannel,
    localsFailChannel,
  ] = yield all([
    call(createSocketEventChannel, SOCKET_EVENT.COURIER_LOCATION),
    call(createSocketEventChannel, SOCKET_EVENT.COURIER_STATUS),
    call(createSocketEventChannel, SOCKET_EVENT.MARKET_CHECKOUT_NEW),
    call(createSocketEventChannel, SOCKET_EVENT.FOOD_ORDER_FAIL),
    call(createSocketEventChannel, SOCKET_EVENT.ARTISAN_ORDER_CHECKOUT_FAILED_EVENT),
  ]);
  yield all([
    fork(watchCourierLocation, locationChannel),
    fork(watchCourierStatus, statusChannel),
    fork(watchMarketNew, marketNewChannel),
    fork(watchFoodFail, foodFailChannel),
    fork(watchLocalsFail, localsFailChannel),
  ]);
}

function* watchCourierStatus(channel) {
  try {
    while (true) {
      const { courier } = yield take(channel);
      const warehouseMap = yield select(getFilteredWarehousesMap);
      const selectedCity = yield select(filtersSelector.getCity);
      if (warehouseMap?.[courier.warehouse]?.city === selectedCity) {
        socketCache.updateCourier(courier);
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}

function* watchCourierLocation(channel) {
  try {
    while (true) {
      const { courier } = yield take(channel);
      const existingData = socketCache.getCourierData(courier.id || courier._id);
      // if no courier exist previously, don't need the location
      if (existingData) {
        socketCache.updateCourier(courier);
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}
function* watchMarketNew(channel) {
  const selectedCountry = getSelectedCountry()._id;
  try {
    while (true) {
      const data = yield take(channel);
      if (!data.isSucceeded) {
        if (data.order.country === selectedCountry) {
          const extOrder = { ...data.order, returnCode: data?.returnCode };
          socketCache.addFailedOrder(extOrder);
        }
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}
function* watchFoodFail(channel) {
  try {
    while (true) {
      const data = yield take(channel);
      socketCache.addFailedOrder({ ...data, domainType: GETIR_FOOD_DOMAIN_TYPE });
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}

function* watchLocalsFail(channel) {
  try {
    while (true) {
      const data = yield take(channel);
      socketCache.addFailedOrder({ ...data, domainType: GETIR_LOCALS_DOMAIN_TYPE });
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}

function* setMappedWarehouses({ warehouses }) {
  const mappedWarehouses = {};
  warehouses.forEach(({ _id, name }) => {
    mappedWarehouses[_id] = name;
  });
  yield put(Creators.setMappedWarehousesSuccess({ mappedWarehouses }));
}

function* formatCourierCountsTable({
  warehouseSearch,
  domainType,
  rawData,
  courierPlanViolations,
  warehouses,
  noBreadStockWarehouses,
  noRamadanPitaStockWarehouses,
}) {
  try {
    const data = formatCourierCountsTableData({
      data: rawData,
      courierPlanViolations,
      warehouses,
      warehouseSearch,
      domainType,
      noBreadStockWarehouses,
      noRamadanPitaStockWarehouses,
    });
    yield put(Creators.formatCourierCountsTableSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.formatCourierCountsTableError({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPolygonsRequest() {
  yield takeLatest(Types.GET_POLYGONS_REQUEST, getPolygonsRequest);
}

function* watchFormatCourierCountsTableRequest() {
  yield takeLatest(Types.FORMAT_COURIER_COUNTS_TABLE_REQUEST, formatCourierCountsTable);
}

function* watchLiveMapDataRequest() {
  yield takeLatest(Types.GET_LIVE_MAP_DATA_REQUEST, getLiveMapDataRequest);
}

function* watchInitialCouriersRequest() {
  yield takeLatest(Types.GET_INITIAL_COURIERS_REQUEST, getInitialCouriersRequest);
}

function* watchSetMappedWarehouses() {
  yield takeLatest(Types.SET_MAPPED_WAREHOUSES, setMappedWarehouses);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPolygonsRequest),
      fork(watchLiveMapDataRequest),
      fork(watchInitialCouriersRequest),
      fork(setDomainType),
      fork(watchSocketEvents),
      fork(watchSetMappedWarehouses),
      fork(watchFormatCourierCountsTableRequest),
      fork(watchStartInterval),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
