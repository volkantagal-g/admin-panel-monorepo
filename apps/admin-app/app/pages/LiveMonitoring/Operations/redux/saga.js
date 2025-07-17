import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { filtersSelector } from './selectors';
import {
  getCityOperationStats,
  getCountryCitiesOperationStats,
  getCourierStatusCountsWithCourierPlanV2,
} from '@shared/api/businessMonitoring';

function* fetchInitialDataRequest({ selectedCity }) {
  yield put(CommonCreators.getCitiesRequest());
  yield put(CommonCreators.getFilteredWarehousesRequest({ fields: '_id name city domainTypes aggressionLevel' }));
  yield put(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  yield put(CommonCreators.getAvailableIntegrationTypesForCountryRequest());
  yield put(CommonCreators.getSlottedOrderActiveDomainTypesRequest());

  const filters = yield select(filtersSelector);
  const { domainType, integrationType } = filters;

  if (selectedCity) {
    yield put(Creators.getLiveMapDataBySelectedCityRequest({ data: { selectedCity, domainType, integrationType } }));
  }
  else {
    yield put(Creators.getOperationStatsRequest({ data: { domainType, integrationType } }));
  }
}

function* watchFetchInitialDataAction() {
  yield takeLatest(Types.FETCH_INITIAL_DATA, fetchInitialDataRequest);
}

function* getOperationStatsRequest({ data }) {
  const { domainType, integrationType } = data;
  try {
    const [operationStats, courierStatusCounts] = yield all([
      call(getCountryCitiesOperationStats, { domainType: domainType || undefined, integrationType: integrationType || undefined }),
      call(getCourierStatusCountsWithCourierPlanV2),
    ]);
    yield put(Creators.getOperationStatsSuccess({ data: { operationStats, courierStatusCounts } }));
  }
  catch (error) {
    yield put(Creators.getOperationStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLiveMapDataBySelectedCityRequest({ data }) {
  const { selectedCity, domainType, integrationType } = data;
  try {
    const [operationStats, courierStatusCounts] = yield all([
      call(getCityOperationStats, { selectedCityId: selectedCity, domainType: domainType || undefined, integrationType: integrationType || undefined }),
      call(getCourierStatusCountsWithCourierPlanV2, { selectedCity, onlyCityData: true }),
    ]);
    yield put(Creators.getLiveMapDataBySelectedCitySuccess({ data: { operationStats, courierStatusCounts } }));
  }
  catch (error) {
    yield put(Creators.getLiveMapDataBySelectedCityFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetOperationStatsAction() {
  yield takeLatest(Types.GET_OPERATION_STATS_REQUEST, getOperationStatsRequest);
}

function* watchLiveMapDataBySelectedCityAction() {
  yield takeLatest(Types.GET_LIVE_MAP_DATA_BY_SELECTED_CITY_REQUEST, getLiveMapDataBySelectedCityRequest);
}

export default function* dailyTrackingInstantRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOperationStatsAction),
      fork(watchLiveMapDataBySelectedCityAction),
      fork(watchFetchInitialDataAction),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
