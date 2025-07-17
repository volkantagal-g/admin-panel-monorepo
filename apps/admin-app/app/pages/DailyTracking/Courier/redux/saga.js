import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getLiveMapData, getOperationStatsTimeSeries } from '@shared/api/dailyTracking';
import { Types, Creators } from './actions';
import { Types as CommonsTypes, Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { setSelectedCityFilterToLocalStorage } from './localStorage';

function* getLiveMapDataRequest({ data }) {
  try {
    const liveMapData = yield call(getLiveMapData, data);
    yield put(Creators.getLiveMapDataSuccess({ data: liveMapData }));
  }
  catch (error) {
    yield put(Creators.getLiveMapDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getOperationTimeSeriesDataRequest({ data }) {
  try {
    const operationTimeSeriesData = yield call(getOperationStatsTimeSeries, data);
    yield put(Creators.getOperationTimeSeriesDataSuccess({ data: { ...operationTimeSeriesData } }));
  }
  catch (error) {
    yield put(Creators.getOperationTimeSeriesDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCitiesAction({ data: cities }) {
  try {
    const cityIds = cities.map(city => {
      return city._id;
    });
    yield put(Creators.setCities({ cities: cityIds }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* setSelectedDomainType() {
  while (true) {
    const { selectedDomainType } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    yield put(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }
}

function* setSelectedCityFilter() {
  while (true) {
    const { selectedCityFilter } = yield take(Types.SET_SELECTED_CITY_FILTER);
    setSelectedCityFilterToLocalStorage(selectedCityFilter);
    yield put({ type: Types.SET_SELECTED_CITY_FILTER, selectedCityFilter });
  }
}

function* watchLiveMapDataRequest() {
  yield takeLatest(Types.GET_LIVE_MAP_DATA_REQUEST, getLiveMapDataRequest);
}

function* watchOperationTimeSeriesRequest() {
  yield takeLatest(Types.GET_OPERATION_TIME_SERIES_DATA_REQUEST, getOperationTimeSeriesDataRequest);
}

function* watchGetCitiesAction() {
  yield takeLatest(CommonsTypes.GET_CITIES_SUCCESS, getCitiesAction);
}

export default function* dailyTrackingInstantRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchLiveMapDataRequest),
      fork(watchOperationTimeSeriesRequest),
      fork(watchGetCitiesAction),
      fork(setSelectedDomainType),
      fork(setSelectedCityFilter),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
