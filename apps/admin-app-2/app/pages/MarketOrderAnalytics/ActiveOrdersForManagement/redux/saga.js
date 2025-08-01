import { all, call, cancel, fork, put, take, takeLatest, select, debounce } from 'redux-saga/effects';
import { isBoolean } from 'lodash';

import { getActiveOrdersForManagement, getActiveOrdersExecutiveStatsManagement, getClientsWhoHasActiveOrder } from '@shared/api/marketOrderAnalytics';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector, getSelectedDomainType } from '@shared/redux/selectors/common';
import { t } from '@shared/i18n';

import { Types, Creators } from './actions';
import { getPagination, getSubmittedFilters, getSortOptions } from './selectors';
import { filterNonNullFields, getFilteredAndExcludedIntegrationTypes } from '../utils';
import { getPermittedIntegrationTypes, lowerCaseN11 } from '../../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from '../constant';
import { getDefaultDomainTypeForCountry } from '../../utils';

const CLIENT_SEARCH_DEBOUNCE_MS = 1000;

function* getActiveOrdersRequest() {
  const filters = yield select(getSubmittedFilters);
  const pagination = yield select(getPagination);
  const sort = yield select(getSortOptions);
  const requestBody = {
    ...filters,
    ...sort,
    ...getLimitAndOffset(pagination),
    orderStatus: filters?.orderStatus?.length ? filters.orderStatus : undefined,
    integrationTypes: filters.integrationTypes?.length ? filters.integrationTypes : undefined,
    excludedIntegrationTypes: filters.excludedIntegrationTypes?.length ? filters.excludedIntegrationTypes : undefined,
  };

  const formattedRequest = filterNonNullFields(requestBody);

  try {
    const data = yield call(getActiveOrdersForManagement, formattedRequest);
    yield put(Creators.getActiveOrdersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getActiveOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getActiveOrderStatsRequest() {
  const {
    city,
    domainType,
    warehouse,
    orderStatus,
    isSlottedDelivery,
    integrationTypes,
    excludedIntegrationTypes,
  } = yield select(getSubmittedFilters);

  const requestBody = {
    ...(city && { city }),
    ...(domainType && { domainType }),
    ...(warehouse ? { warehouseIds: [warehouse] } : undefined),
    ...(isBoolean(isSlottedDelivery) ? { isSlottedDelivery } : undefined),
    ...(orderStatus?.length ? { orderStatus } : undefined),
    ...(integrationTypes?.length > 0 ? { integrationTypes } : undefined),
    ...(excludedIntegrationTypes?.length ? { excludedIntegrationTypes } : undefined),
  };

  try {
    const data = yield call(getActiveOrdersExecutiveStatsManagement, requestBody);
    yield put(Creators.getActiveOrderStatsSuccess({ data }));
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

  yield put(Creators.submitFilters({ filters: { domainType } }));
  yield put(CommonCreators.setSelectedDomainType({ data: domainType }));

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
    yield put(Creators.submitFilters({ filters: { integrationTypes: [permittedIntegrationTypes[0]] } }));
  }
  // What is excluded depends solely on the user's access rights, so it is set at the start of the page and cannot be changed (UX)
  if (excluded) {
    yield put(Creators.submitFilters({ filters: { excludedIntegrationTypes: excluded } }));
  }

  yield put(Creators.getActiveOrdersRequest());
  yield put(Creators.getActiveOrderStatsRequest());
}

function* watchFetchInitialData() {
  yield takeLatest(Types.FETCH_INITIAL_DATA, fetchInitialData);
}

function* clientSearchRequest() {
  try {
    const data = yield call(getClientsWhoHasActiveOrder);
    yield put(Creators.clientSearchSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.clientSearchFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetActiveOrdersRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_REQUEST, getActiveOrdersRequest);
}

function* watchGetActiveOrderStatsRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDER_STATS_REQUEST, getActiveOrderStatsRequest);
}

function* watchClientSearchRequest() {
  yield debounce(CLIENT_SEARCH_DEBOUNCE_MS, Types.CLIENT_SEARCH_REQUEST, clientSearchRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFetchInitialData),
      fork(watchGetActiveOrdersRequest),
      fork(watchGetActiveOrderStatsRequest),
      fork(watchClientSearchRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
