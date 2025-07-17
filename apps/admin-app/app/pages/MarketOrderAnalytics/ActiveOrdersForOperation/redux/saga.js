import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { getActiveOrderStatsByFilters, getActiveOrdersForOperation } from '@shared/api/marketOrderAnalytics';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getEmployeesPure } from '@shared/api/employee';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLimitAndOffset } from '@shared/utils/common';
import { getCouriersByName } from '@shared/api/courier';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector, getSelectedDomainType } from '@shared/redux/selectors/common';

import { getPermittedIntegrationTypes, lowerCaseN11 } from '../../integrationTypeUtils';
import { getDefaultDomainTypeForCountry } from '../../utils';
import { getFilteredAndExcludedIntegrationTypes, manipulateValuesBeforeSubmit } from '../utils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from '../constants';
import { filtersSelector, getFilteredWarehouses } from './selectors';
import { Types, Creators } from './actions';

function* getActiveOrdersRequest() {
  const domainType = yield select(filtersSelector.getDomainType);
  const city = yield select(filtersSelector.getCity);
  const selectedFieldManagers = yield select(filtersSelector.getFieldManagers);
  const selectedCourierId = yield select(filtersSelector.getCourierId);
  const selectedWarehouses = yield select(filtersSelector.getWarehouses);
  const selectedWarehouseIds = selectedWarehouses.map(w => w.value);
  const warehousesForSelect = yield select(getFilteredWarehouses);
  const orderStatus = yield select(filtersSelector.getOrderStatus);
  const orderStatusMoreThan = yield select(filtersSelector.getOrderStatusMoreThan);
  const pagination = yield select(filtersSelector.getPagination);
  const sortOptions = yield select(filtersSelector.getSortOptions);
  const integrationTypes = yield select(filtersSelector.getIntegrationTypes);
  const excludedIntegrationTypes = yield select(filtersSelector.getExcludedIntegrationTypes);
  const { limit, offset } = getLimitAndOffset(pagination);
  const isSlottedDelivery = yield select(filtersSelector.getIsSlottedDelivery);

  // if we selected field manager but not selected warehouses
  // We should pass all the field manager filtered warehouse ids
  // since endpoint doesn't accept field manager input
  const shouldPassFilteredWarehouses = selectedFieldManagers.length && !selectedWarehouses.length;
  const warehouseIds = shouldPassFilteredWarehouses ? warehousesForSelect.map(w => w._id) : selectedWarehouseIds;

  const requestBody = {
    domainType,
    limit,
    offset,
    isSlottedDelivery,
    integrationTypes: integrationTypes?.length ? integrationTypes : undefined,
    excludedIntegrationTypes: excludedIntegrationTypes?.length ? excludedIntegrationTypes : undefined,
  };

  const formattedRequestBody = manipulateValuesBeforeSubmit(
    {
      requestBody,
      warehouseIds,
      orderStatus,
      orderStatusMoreThan,
      city,
      sortOptions,
      selectedCourierId,
    },
  );

  try {
    const response = yield call(getActiveOrdersForOperation, formattedRequestBody);
    yield put(Creators.getActiveOrdersSuccess({ data: response }));
  }
  catch (error) {
    yield put(Creators.getActiveOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFieldManagersRequest({ employeeIds }) {
  try {
    const { employees } = yield call(getEmployeesPure, { employeeIds });
    yield put(Creators.getFieldManagersSuccess({ data: employees }));
  }
  catch (error) {
    yield put(Creators.getFieldManagersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCourierSearchRequest({ courierName }) {
  try {
    const data = yield call(getCouriersByName, { courierName });
    yield put(Creators.getCourierSearchSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCourierSearchFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getActiveOrderStatsRequest() {
  const domainType = yield select(filtersSelector.getDomainType);
  const city = yield select(filtersSelector.getCity);
  const selectedCourierId = yield select(filtersSelector.getCourierId);
  const selectedFieldManagers = yield select(filtersSelector.getFieldManagers);
  const selectedWarehouses = yield select(filtersSelector.getWarehouses);
  const selectedWarehouseIds = selectedWarehouses.map(w => w.value);
  const warehousesForSelect = yield select(getFilteredWarehouses);
  const isSlottedDelivery = yield select(filtersSelector.getIsSlottedDelivery);
  const orderStatus = yield select(filtersSelector.getOrderStatus);
  const orderStatusMoreThan = yield select(filtersSelector.getOrderStatusMoreThan);
  const integrationTypes = yield select(filtersSelector.getIntegrationTypes);
  const excludedIntegrationTypes = yield select(filtersSelector.getExcludedIntegrationTypes);

  // if we selected field manager but not selected warehouses
  // We should pass all the field manager filtered warehouse ids
  // since endpoint doesn't accept field manager input
  const shouldPassFilteredWarehouses = selectedFieldManagers.length && !selectedWarehouses.length;
  const warehouseIds = shouldPassFilteredWarehouses ? warehousesForSelect.map(w => w._id) : selectedWarehouseIds;

  const requestBody = {
    domainType,
    courierAssignedOrderCounts: true,
    courierUnassignedOrderCounts: true,
    averageVolumeOfOrder: true,
    averageWeightOfOrder: true,
    isSlottedDelivery,
    integrationTypes: integrationTypes?.length ? integrationTypes : undefined,
    excludedIntegrationTypes: excludedIntegrationTypes?.length ? excludedIntegrationTypes : undefined,
  };

  const formattedRequestBody = manipulateValuesBeforeSubmit({ requestBody, warehouseIds, orderStatus, orderStatusMoreThan, city, selectedCourierId });

  try {
    const activeOrderCourierStats = yield call(getActiveOrderStatsByFilters, { ...formattedRequestBody });
    yield put(Creators.getActiveOrderStatsSuccess({ data: activeOrderCourierStats }));
  }
  catch (error) {
    yield put(Creators.getActiveOrderStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* fetchInitialData({ canAccess }) {
  // cities are used in the filter, so fetch them in background without waiting
  yield put(CommonCreators.getCitiesRequest());
  yield put(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  yield put(CommonCreators.getAvailableIntegrationTypesForCountryRequest());

  // only available domains and integration types are needed for the page to be initialized
  const [domainResult, integrationResult] = yield all([
    take([CommonCreators.getAvailableDomainTypesForCountrySelectorSuccess().type, CommonCreators.getAvailableDomainTypesForCountrySelectorFailure().type]),
    take([CommonCreators.getAvailableIntegrationTypesForCountrySuccess().type, CommonCreators.getAvailableIntegrationTypesForCountryFailure().type]),
  ]);

  if (domainResult.error || integrationResult.error) {
    yield put(
      ToastCreators.error({ message: t('error:DEPENDENT_DATA_FAILED_TO_FETCH', { dependentDataName: `${t('DOMAIN_TYPE')} - ${t('INTEGRATION_TYPE')}` }) }),
    );
    return;
  }

  const availableDomainTypes = yield select(availableDomainTypesForCountrySelector.getDomainTypes);

  const domainType = getDefaultDomainTypeForCountry({
    staticDefaultDomainType: getSelectedDomainType(),
    availableDomainTypesForSelectedCountry: availableDomainTypes,
  });

  yield put(Creators.setDomainType({ domainType }));
  yield put(CommonCreators.setSelectedDomainType({ data: domainType }));
  const city = yield select(filtersSelector.getCity);

  // this is for select, fetch them in background
  yield put(CommonCreators.getFilteredWarehousesRequest({
    cities: city ? [city] : undefined,
    domainTypes: [domainType],
    fields: '_id name fieldManagers city',
  }));

  const availableIntegrationTypes = yield select(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);

  const permittedIntegrationTypes = getPermittedIntegrationTypes({
    canAccess,
    n11AccessKey: INTEGRATION_TYPE_TO_ACCESS_KEY[lowerCaseN11],
    restOfGetirAccessKey: REST_OF_GETIR_ACCESS_KEY,
    availableIntegrationTypes,
  });

  const { isForced, excluded } = getFilteredAndExcludedIntegrationTypes({ canAccess, permittedIntegrationTypes });
  // if there is only one integration type selectable and the user only has access to that integration type
  // then it is forced selected at the start of the page and cannot be changed (UX)
  if (isForced) {
    yield put(Creators.setIntegrationTypes({ integrationTypes: [permittedIntegrationTypes[0]] }));
  }
  // What is excluded depends solely on the user's access rights, so it is set at the start of the page and cannot be changed (UX)
  if (excluded) {
    yield put(Creators.setExcludedIntegrationTypes({ excludedIntegrationTypes: excluded }));
  }

  yield put(Creators.getActiveOrdersRequest());
  yield put(Creators.getActiveOrderStatsRequest());
}

function* watchFetchInitialData() {
  yield takeLatest(Types.FETCH_INITIAL_DATA, fetchInitialData);
}

function* watchGetCourierSearchRequest() {
  yield takeLatest(Types.GET_COURIER_SEARCH_REQUEST, getCourierSearchRequest);
}

function* watchActiveOrdersRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_REQUEST, getActiveOrdersRequest);
}

function* watchFieldManagersRequest() {
  yield takeLatest(Types.GET_FIELD_MANAGERS_REQUEST, getFieldManagersRequest);
}

function* watchActiveOrderStatsRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDER_STATS_REQUEST, getActiveOrderStatsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchActiveOrdersRequest),
      fork(watchFieldManagersRequest),
      fork(watchFetchInitialData),
      fork(watchActiveOrderStatsRequest),
      fork(watchGetCourierSearchRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
