import { all, call, cancel, delay, fork, put, take, takeLatest } from 'redux-saga/effects';

import { t as translate } from '@shared/i18n';
import {
  addMhProblem, getMissingProductOrders,
  getOrderCancelReasons, getOrderDetail,
  updateMissingProductStatus,
} from '@shared/api/marketOrder';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from './actions';
import { setSelectedDomainTypeToLocalStorage } from './localStorage';
import {
  watchCancelOrderRequest, watchCreateMarketOrderFeedbackRequest,
  watchCreatePromoRequest, watchCreateStockRefundOrderRequest, watchPartialRefundOrderCustomerRequest,
} from '../../OrderDetail/redux/sagas';
import { partialRefundOrder } from '@shared/api/customer';

export function* fetchMissingProductOrders({ domainType, limit, offset, city }) {
  const data = yield call(getMissingProductOrders, { domainType, offset, limit, city });
  yield put(Creators.getMissingProductOrdersSuccess({ data }));
}
export function* getMissingProductOrdersRequest({ domainType, limit = 10, offset = 0, city }) {
  try {
    yield call(fetchMissingProductOrders, { domainType, offset, limit, city });
  }
  catch (error) {
    yield put(Creators.getMissingProductOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    while (true) {
      yield delay(10000);
      yield call(fetchMissingProductOrders, { domainType, limit, offset, city });
    }
  }
}
export function* getMarketOrderRequest({ domainType, id }) {
  try {
    const payload = yield call(getOrderDetail, { id, domainType });
    yield put(Creators.getMarketOrderSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getMarketOrderFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* orderPartialRefundRequest({
  orderId,
  products,
  refundBagFee,
  refundDeliveryFee,
  domainType,
  onSuccess,
}) {
  try {
    const data = yield call(partialRefundOrder, {
      orderId,
      products,
      refundBagFee,
      refundDeliveryFee,
      domainType,
    });
    yield put(Creators.orderPartialRefundSuccess({ data }));
    yield put(
      ToastCreators.success({
        message: translate(
          'success:PARTIAL_REFUND_SUCCESS',
        ),
      }),
    );
    if (onSuccess) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.orderPartialRefundFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* updateMissingProductStatusRequest({ status, orderId, domainType }) {
  try {
    const data = yield call(updateMissingProductStatus, { status, orderId, domainType });
    yield put(Creators.updateMissingProductStatusSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateMissingProductStatusFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* addMhProblemRequest({ adminUser, orderId, domainType }) {
  try {
    const data = yield call(addMhProblem, { adminUser, orderId, domainType });
    yield put(Creators.addMhProblemSuccess({ data }));
    yield put(Creators.updateMissingOrderStatus({ orderId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.addMhProblemFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* getOrderCancelReasonsRequest({ domainType }) {
  try {
    const data = yield call(getOrderCancelReasons, { domainType });
    yield put(Creators.getOrderCancelReasonsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderCancelReasonsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setSelectedDomainType() {
  while (true) {
    const { domainType } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    setSelectedDomainTypeToLocalStorage(domainType);
    yield put({ type: Types.SET_SELECTED_DOMAIN_TYPE, domainType });
  }
}

function* setSelectedCity() {
  while (true) {
    const { city } = yield take(Types.SET_SELECTED_CITY);
    yield put({ type: Types.SET_SELECTED_CITY, city });
  }
}

function* setSearchTerm() {
  while (true) {
    const { searchTerm } = yield take(Types.SET_SEARCH_TERM);
    yield put({ type: Types.SET_SEARCH_TERM, searchTerm });
  }
}

function* updateMissingOrderStatus({ orderId }) {
  while (true) {
    yield put({ type: Types.UPDATE_MISSING_ORDER_STATUS, orderId });
  }
}

export function* watchUpdateMissingOrderStatus() {
  yield take(Types.UPDATE_MISSING_ORDER_STATUS, updateMissingOrderStatus);
}
export function* watchGetMissingProductOrdersRequest() {
  yield takeLatest(Types.GET_MISSING_PRODUCT_ORDERS_REQUEST, getMissingProductOrdersRequest);
}
export function* watchAddMhProblemRequest() {
  yield takeLatest(Types.ADD_MH_PROBLEM_REQUEST, addMhProblemRequest);
}
export function* watchOrderPartialRefundRequest() {
  yield takeLatest(Types.ORDER_PARTIAL_REFUND_REQUEST, orderPartialRefundRequest);
}
export function* watchUpdateMissingProductStatusRequest() {
  yield takeLatest(Types.UPDATE_MISSING_PRODUCT_STATUS_REQUEST, updateMissingProductStatusRequest);
}
export function* watchGetOrderCancelReasonsRequest() {
  yield takeLatest(Types.GET_ORDER_CANCEL_REASONS_REQUEST, getOrderCancelReasonsRequest);
}

export function* watchGetMarketOrderRequest() {
  yield takeLatest(Types.GET_MARKET_ORDER_REQUEST, getMarketOrderRequest);
}

export default function* root() {
  const backgroundTasks = yield all([
    fork(watchGetMissingProductOrdersRequest),
    fork(setSelectedDomainType),
    fork(setSelectedCity),
    fork(setSearchTerm),
    fork(watchCreateMarketOrderFeedbackRequest),
    fork(watchPartialRefundOrderCustomerRequest),
    fork(watchCancelOrderRequest),
    fork(watchOrderPartialRefundRequest),
    fork(watchUpdateMissingProductStatusRequest),
    fork(watchAddMhProblemRequest),
    fork(watchGetOrderCancelReasonsRequest),
    fork(watchCreatePromoRequest),
    fork(watchUpdateMissingOrderStatus),
    fork(watchGetMarketOrderRequest),
    fork(watchCreateStockRefundOrderRequest),
  ]);
  yield take(Types.DESTROY_PAGE);
  yield cancel(backgroundTasks);
}
