import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getActiveOrdersExecutiveStats } from '@shared/api/marketOrderAnalytics';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';

import { Types, Creators } from './actions';
import { FILTER_FIELD_NAMES, PROMO_OPTIONS } from './reducer';
import { filtersSelector, getChartFilters } from './selectors';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from '../constants';
import { getPermittedIntegrationTypes, lowerCaseN11 } from '../../integrationTypeUtils';
import { getFilteredAndExcludedIntegrationTypes } from '../utils';
import { getDefaultDomainTypeForCountry } from '../../utils';

const convertClientSideFiltersToRequestFormat = data => {
  const { domainType, city, warehouseIds, promo, paymentType, addressType, queueStatus, orderStatus, isSlottedDelivery, integrationTypes } = data;

  return {
    domainType: domainType || undefined,
    city: city || undefined,
    warehouseIds: warehouseIds.length > 0 ? warehouseIds : undefined,
    queueStatus: queueStatus || undefined,
    addressType: addressType || undefined,
    paymentMethod: paymentType || undefined,
    excludeOrganicOrders: promo === PROMO_OPTIONS.promo,
    excludePromoOrders: promo === PROMO_OPTIONS.organic,
    status: orderStatus || undefined,
    isSlottedDelivery: isSlottedDelivery !== null ? isSlottedDelivery : undefined,
    integrationTypes: integrationTypes.length > 0 ? integrationTypes : undefined,
  };
};

function* getActiveOrdersExecutiveStatsRequest() {
  const chartFilters = yield select(getChartFilters);
  const filters = yield select(filtersSelector.getAll);
  const selectedDomainType = yield select(filtersSelector.getDomainType);
  const selectedIntegrationTypes = yield select(filtersSelector.getIntegrationTypes);
  const excludedIntegrationTypes = yield select(filtersSelector.getExcludedIntegrationTypes);
  const data = {
    ...filters,
    ...chartFilters,
    domainType: selectedDomainType,
  };
  const requestBody = convertClientSideFiltersToRequestFormat(data);

  const integrationParams = {
    integrationTypes: selectedIntegrationTypes?.length ? selectedIntegrationTypes : undefined,
    excludedIntegrationTypes: excludedIntegrationTypes?.length ? excludedIntegrationTypes : undefined,
  };

  try {
    const data2 = yield call(getActiveOrdersExecutiveStats, { ...requestBody, ...integrationParams });
    yield put(Creators.getActiveOrdersExecutiveStatsSuccess({ data: data2 }));
  }
  catch (error) {
    yield put(Creators.getActiveOrdersExecutiveStatsFailure({ error }));
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

  let savedDomainType = null;
  try {
    savedDomainType = JSON.parse(localStorage.getItem('selectedDomainType'));
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while parsing selectedDomainType from localStorage', error);
  }

  const domainType = getDefaultDomainTypeForCountry({
    // Note: i didn't use common selector "getSelectedDomainType" because we can have null value in localStorage for this page
    staticDefaultDomainType: savedDomainType,
    availableDomainTypesForSelectedCountry: availableDomainTypes,
    isNullAllowed: true,
  });

  yield put(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.domainType, value: domainType }));
  yield put(CommonCreators.setSelectedDomainType({ data: domainType }));
  const city = yield select(filtersSelector.getCity);
  // this is for select, fetch them in background
  yield put(CommonCreators.getFilteredWarehousesRequest({
    cities: city ? [city] : undefined,
    domainTypes: domainType ? [domainType] : undefined,
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
    yield put(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.integrationTypes, value: [permittedIntegrationTypes[0]] }));
  }
  // What is excluded depends solely on the user's access rights, so it is set at the start of the page and cannot be changed (UX)
  if (excluded) {
    yield put(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.excludedIntegrationTypes, value: excluded }));
  }

  yield put(Creators.getActiveOrdersExecutiveStatsRequest());
}

function* watchExecutiveStatsRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_EXECUTIVE_STATS_REQUEST, getActiveOrdersExecutiveStatsRequest);
}

function* watchFetchInitialData() {
  yield takeLatest(Types.FETCH_INITIAL_DATA, fetchInitialData);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFetchInitialData),
      fork(watchExecutiveStatsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
