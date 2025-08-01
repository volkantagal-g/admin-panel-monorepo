import { all, call, fork, cancel, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import {
  getMerchantDetail, updateMerchant, getMerchantWebhooks, updateMerchantWebhook,
  createMerchantWebhook, addPaymentMethod, createMerchantPaymentProvider,
} from '@shared/api/payment';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMerchantDetailRequest({ id }) {
  try {
    const data = yield call(getMerchantDetail, { id });
    yield put(Creators.getMerchantDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMerchantDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMerchantDetailRequest() {
  yield takeLatest(Types.GET_MERCHANT_DETAIL_REQUEST, getMerchantDetailRequest);
}

function* getMerchantWebhooksRequest({ id }) {
  try {
    const data = yield call(getMerchantWebhooks, { id });
    yield put(Creators.getMerchantWebhooksSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMerchantWebhooksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMerchantWebhooksRequest() {
  yield takeLatest(Types.GET_MERCHANT_WEBHOOKS_REQUEST, getMerchantWebhooksRequest);
}

function* updateMerchantRequest({ key, settings, customIdentifiers, id }) {
  try {
    const data = yield call(updateMerchant, { key, settings, customIdentifiers, id });
    yield put(Creators.updateMerchantSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMerchantFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateMerchantRequest() {
  yield takeLatest(Types.UPDATE_MERCHANT_REQUEST, updateMerchantRequest);
}

function* updateMerchantWebhooksRequest({ merchantId, webhookId, url, updatedType, enabled }) {
  try {
    yield call(updateMerchantWebhook, { merchantId, webhookId, enabled, type: updatedType, url });
    yield put(Creators.updateMerchantWebhooksSuccess({ data: null }));
    yield put(ToastCreators.success());
    yield call(getMerchantDetailRequest, { id: merchantId });
  }
  catch (error) {
    yield put(Creators.updateMerchantWebhooksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateMerchantWebhooksRequest() {
  yield takeLatest(Types.UPDATE_MERCHANT_WEBHOOKS_REQUEST, updateMerchantWebhooksRequest);
}

function* createMerchantWebhooksRequest({ merchantId, url, updatedType, enabled }) {
  try {
    const data = yield call(createMerchantWebhook, { merchantId, enabled, type: updatedType, url });
    yield put(Creators.createMerchantWebhooksSuccess({ data }));
    yield put(ToastCreators.success());
    yield call(getMerchantDetailRequest, { id: merchantId });
  }
  catch (error) {
    yield put(Creators.createMerchantWebhooksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateMerchantWebhooksRequest() {
  yield takeLatest(Types.CREATE_MERCHANT_WEBHOOKS_REQUEST, createMerchantWebhooksRequest);
}

function* addPaymentMethodToPaymentProviderRequest({ addMerchantPaymentMethodRequestPayloads }) {
  try {
    const promises = [];
    for (let i = 0; i < addMerchantPaymentMethodRequestPayloads.length; i++) {
      const { method, providerKey, merchantId } = addMerchantPaymentMethodRequestPayloads[i];
      const { name, key, settings } = method;
      promises.push(addPaymentMethod({ merchantId, providerKey, name, key, settings }));
    }
    yield all(promises);
    yield put(Creators.addPaymentMethodToPaymentProviderSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.addPaymentMethodToPaymentProviderFailure({ error }));
  }
}

function* watchAddPaymentMethodToPaymentProviderRequest() {
  yield takeLatest(Types.ADD_PAYMENT_METHOD_TO_PAYMENT_PROVIDER_REQUEST, addPaymentMethodToPaymentProviderRequest);
}

function* createMerchantPaymentProviderRequest({ createMerchantPaymentProviderRequestPayloads }) {
  try {
    const promises = [];
    for (let i = 0; i < createMerchantPaymentProviderRequestPayloads.length; i++) {
      const { id, key, name, paymentMethods, settings, configuration, merchantId } = createMerchantPaymentProviderRequestPayloads[i];
      promises.push(createMerchantPaymentProvider({ id, key, name, paymentMethods, settings, configuration, merchantId }));
    }
    yield all(promises);
    yield put(Creators.createMerchantPaymentProviderSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.createMerchantPaymentProviderFailure({ error }));
  }
}

function* watchCreateMerchantPaymentProviderRequest() {
  yield takeLatest(Types.CREATE_MERCHANT_PAYMENT_PROVIDER_REQUEST, createMerchantPaymentProviderRequest);
}

export default function* detailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMerchantDetailRequest),
      fork(watchUpdateMerchantRequest),
      fork(watchGetMerchantWebhooksRequest),
      fork(watchUpdateMerchantWebhooksRequest),
      fork(watchCreateMerchantWebhooksRequest),
      fork(watchAddPaymentMethodToPaymentProviderRequest),
      fork(watchCreateMerchantPaymentProviderRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
