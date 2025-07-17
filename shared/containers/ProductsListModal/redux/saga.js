import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getActiveOrdersProductsCount } from '@shared/api/marketOrderAnalytics';
import { PROMO_OPTIONS } from './reducer';

const convertClientSideFiltersToRequestFormat = data => {
  const {
    domainType, city, promo, paymentType, addressType, queueStatus, warehouseIds, isSlottedDelivery, orderStatus,
    clientId, integrationTypes,
  } = data;

  return {
    domainType: domainType || undefined,
    city: city || undefined,
    queueStatus: queueStatus || undefined,
    addressType: addressType || undefined,
    paymentMethod: paymentType || undefined,
    excludeOrganicOrders: promo === PROMO_OPTIONS.promo,
    excludePromoOrders: promo === PROMO_OPTIONS.organic,
    warehouseIds: warehouseIds?.length ? warehouseIds : undefined,
    isSlottedDelivery: isSlottedDelivery !== null ? isSlottedDelivery : undefined,
    orderStatus: orderStatus?.length ? orderStatus : undefined,
    clientId: clientId || undefined,
    integrationTypes: integrationTypes?.length ? integrationTypes : undefined,
  };
};

function* getActiveOrdersProductsRequest({ data: filters }) {
  const requestBody = convertClientSideFiltersToRequestFormat(filters);
  try {
    const responseData = yield call(getActiveOrdersProductsCount, requestBody);
    yield put(Creators.getActiveOrdersProductsSuccess({ data: responseData }));
  }
  catch (error) {
    yield put(Creators.getActiveOrdersProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchProductsRequest() {
  yield takeLatest(Types.GET_ACTIVE_ORDERS_PRODUCTS_REQUEST, getActiveOrdersProductsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchProductsRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
