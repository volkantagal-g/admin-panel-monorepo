import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { getActiveOrdersForGrowth, getActiveOrdersPromoStats } from '@shared/api/marketOrderAnalytics';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLimitAndOffset } from '@shared/utils/common';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector, getSelectedDomainType } from '@shared/redux/selectors/common';
import { t } from '@shared/i18n';

import { Creators, Types } from './actions';
import { filtersSelector } from './selectors';
import { getPermittedIntegrationTypes, lowerCaseN11 } from '../../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY, SLOTTED_STATE } from '../constants';
import { getFilteredAndExcludedIntegrationTypes } from '../utils';
import { getDefaultDomainTypeForCountry } from '../../utils';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES } from '@app/pages/MarketOrderAnalytics/constants';

function* getActiveOrdersForGrowthRequest() {
  const domainType = yield select(filtersSelector.getSelectedDomainType);
  const cities = yield select(filtersSelector.getSelectedCities);
  const warehouses = yield select(filtersSelector.getSelectedWarehouses);
  const slottedState = yield select(filtersSelector.getSelectedSlottedState);
  const orderStatuses = yield select(filtersSelector.getSelectedOrderStatuses);
  const promos = yield select(filtersSelector.getSelectedPromos);
  const paymentMethods = yield select(filtersSelector.getSelectedPaymentMethods);
  const pagination = yield select(filtersSelector.getPagination);
  const integrationTypes = yield select(filtersSelector.getIntegrationTypes);
  const excludedIntegrationTypes = yield select(filtersSelector.getExcludedIntegrationTypes);
  const sortOptions = yield select(filtersSelector.getSortOptions);
  const { limit, offset } = getLimitAndOffset(pagination);

  let isSlottedDelivery;

  if (slottedState === SLOTTED_STATE.SCHEDULED) {
    isSlottedDelivery = true;
  }
  else if (slottedState === SLOTTED_STATE.ON_DEMAND) {
    isSlottedDelivery = false;
  }

  const requestBody = {
    domainType,
    cities,
    limit,
    offset,
    statuses: orderStatuses.length > 0 ? orderStatuses : Object.values(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES),
    isSlottedDelivery,
    integrationTypes: integrationTypes?.length ? integrationTypes : undefined,
    excludedIntegrationTypes: excludedIntegrationTypes?.length ? excludedIntegrationTypes : undefined,
    sortOptions,
  };

  if (warehouses?.length) {
    requestBody.warehouseIds = warehouses;
  }
  if (promos?.length) {
    requestBody.promoIds = promos;
  }
  if (paymentMethods?.length) {
    requestBody.paymentMethods = paymentMethods;
  }

  try {
    const requestData = yield call(getActiveOrdersForGrowth, requestBody);
    yield put(Creators.getActiveOrdersForGrowthSuccess({ data: requestData }));
  }

  catch (error) {
    yield put(Creators.getActiveOrdersForGrowthFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* setSelectedDomainType() {
  while (true) {
    const { domainType } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    yield put(CommonCreators.setSelectedDomainType({ data: domainType }));
  }
}

function* getPromoRequest() {
  const domainType = yield select(filtersSelector.getSelectedDomainType);
  const cities = yield select(filtersSelector.getSelectedCities);
  const warehouses = yield select(filtersSelector.getSelectedWarehouses);
  const integrationTypes = yield select(filtersSelector.getIntegrationTypes);
  const excludedIntegrationTypes = yield select(filtersSelector.getExcludedIntegrationTypes);

  const requestBody = {
    domainType,
    cities,
    warehouseIds: warehouses?.length ? warehouses : undefined,
    integrationTypes: integrationTypes?.length ? integrationTypes : undefined,
    excludedIntegrationTypes: excludedIntegrationTypes?.length ? excludedIntegrationTypes : undefined,
  };

  try {
    const ordersPromoStats = yield call(getActiveOrdersPromoStats, requestBody);

    const selectablePromos = [];
    ordersPromoStats.forEach(order => {
      if (order.promo._id === 'ORGANIC') return;
      selectablePromos.push({ _id: order.promo._id, promoCode: order.promo.promoCode });
    });
    yield put(Creators.getPromoSuccess({ data: selectablePromos }));
  }
  catch (error) {
    yield put(Creators.getPromoFailure({ error }));
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

  yield put(Creators.setSelectedDomainType({ domainType }));
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
    yield put(Creators.setIntegrationTypes({ integrationTypes: [permittedIntegrationTypes[0]] }));
  }
  // What is excluded depends solely on the user's access rights, so it is set at the start of the page and cannot be changed (UX)
  if (excluded) {
    yield put(Creators.setExcludedIntegrationTypes({ excludedIntegrationTypes: excluded }));
  }

  yield put(Creators.getActiveOrdersForGrowthRequest());
  yield put(Creators.getPromoRequest());
}

function* watchFetchInitialData() {
  yield takeLatest(Types.FETCH_INITIAL_DATA, fetchInitialData);
}

function* watchGetPromoRequest() {
  yield takeLatest(Types.GET_PROMO_REQUEST, getPromoRequest);
}

function* watchGetActiveOrdersForGrowthRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_FOR_GROWTH_REQUEST, getActiveOrdersForGrowthRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetActiveOrdersForGrowthRequest),
      fork(setSelectedDomainType),
      fork(watchGetPromoRequest),
      fork(watchFetchInitialData),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
