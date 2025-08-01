import { all, cancel, fork, put, select, take, takeLatest, call } from 'redux-saga/effects';

import { isEmpty } from 'lodash';

import { getActiveOrdersForCustomerServices as getActiveOrdersForCustomerServicesApi } from '@shared/api/marketOrderAnalytics';
import { getCouriersByName } from '@shared/api/courier';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import { t } from '@shared/i18n';

import { Types, Creators } from './actions';
import { filtersSelector } from './selectors';
import { getPermittedIntegrationTypes, lowerCaseN11 } from '../../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from '../constants';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector, getSelectedDomainType } from '@shared/redux/selectors/common';
import { getFilteredAndExcludedIntegrationTypes } from '../utils';
import { getDefaultDomainTypeForCountry } from '../../utils';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES, SLOTTED_STATE } from '@app/pages/MarketOrderAnalytics/constants';

function* getActiveOrdersForCustomerServices() {
  const city = yield select(filtersSelector.getSelectedCity);
  const warehouse = yield select(filtersSelector.getWarehouseSelector);
  const domainType = yield select(filtersSelector.getSelectedDomainType);
  const courierId = yield select(filtersSelector.getSelectedCourierId);
  const slottedState = yield select(filtersSelector.getSlottedState);
  const orderStatuses = yield select(filtersSelector.getOrderStatuses);
  const pagination = yield select(filtersSelector.getPagination);
  const { limit, offset } = getLimitAndOffset(pagination);
  const integrationTypes = yield select(filtersSelector.getIntegrationTypes);
  const excludedIntegrationTypes = yield select(filtersSelector.getExcludedIntegrationTypes);

  const formattedRequest = {
    domainType,
    limit,
    offset,
    statuses: orderStatuses.length > 0 ? orderStatuses : Object.values(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES),
    integrationTypes: integrationTypes?.length ? integrationTypes : undefined,
    excludedIntegrationTypes: excludedIntegrationTypes?.length ? excludedIntegrationTypes : undefined,
  };

  if (!isEmpty(city)) {
    formattedRequest.city = city;
  }
  if (!isEmpty(warehouse)) {
    formattedRequest.warehouseIds = [warehouse?.value];
  }
  if (!isEmpty(courierId)) {
    formattedRequest.courierId = courierId;
  }

  if (slottedState === SLOTTED_STATE.SCHEDULED) {
    formattedRequest.isSlottedDelivery = true;
  }
  else if (slottedState === SLOTTED_STATE.ON_DEMAND) {
    formattedRequest.isSlottedDelivery = false;
  }

  try {
    const orders = yield call(getActiveOrdersForCustomerServicesApi, formattedRequest);
    yield put(Creators.getActiveOrdersForCustomerServicesSuccess({ data: orders }));
  }
  catch (error) {
    yield put(Creators.getActiveOrdersForCustomerServicesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* courierSearchRequest({ name }) {
  try {
    const data = yield call(getCouriersByName, { courierName: name });
    yield put(Creators.getCourierSearchSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCourierSearchFailure({ error }));
  }
}

function* fetchInitialData({ canAccess }) {
  // These two are filter data, no need to wait them to be completed
  yield put(CommonCreators.getFilteredWarehousesRequest({ fields: '_id name city domainTypes' }));
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

  yield put(Creators.getActiveOrdersForCustomerServicesRequest());
}

function* watchFetchInitialData() {
  yield takeLatest(Types.FETCH_INITIAL_DATA, fetchInitialData);
}

function* watchGetActiveOrdersForCustomerServicesRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES_REQUEST, getActiveOrdersForCustomerServices);
}

function* watchGetCourierSearchRequest() {
  yield takeLatest(Types.GET_COURIER_SEARCH_REQUEST, courierSearchRequest);
}

export default function* activeOrdersForCustomerServicesPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetActiveOrdersForCustomerServicesRequest),
      fork(watchGetCourierSearchRequest),
      fork(watchFetchInitialData),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
