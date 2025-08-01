import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { createMerchant, createMerchantPaymentProvider, createMerchantWebhook } from '@shared/api/payment';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

function* createMerchantRequest({ customIdentifiers, key, settings, createMerchantWebhookPayloads }) {
  try {
    const data = yield call(createMerchant, { customIdentifiers, key, settings });
    const createdMerchantId = data?.data?.id;
    const promises = [];

    for (let i = 0; i < createMerchantWebhookPayloads.length; i++) {
      const { enabled, type, url } = createMerchantWebhookPayloads[i];
      promises.push(createMerchantWebhook({
        enabled,
        type,
        url,
        merchantId: createdMerchantId,
      }));
    }
    yield all(promises);
    yield put(ToastCreators.success());
    yield put(Creators.createMerchantSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.createMerchantFailure({ error }));
  }
}
function* watchCreateMerchantRequest() {
  yield takeLatest(Types.CREATE_MERCHANT_REQUEST, createMerchantRequest);
}

function* createMerchantPaymentProviderRequest({ createMerchantPaymentProviderRequestPayloads }) {
  try {
    const promises = [];
    for (let i = 0; i < createMerchantPaymentProviderRequestPayloads.length; i++) {
      const { id, key, name, paymentMethods, settings, configuration, merchantId } = createMerchantPaymentProviderRequestPayloads[i];
      promises.push(createMerchantPaymentProvider({ id, key, name, paymentMethods, settings, configuration, merchantId }));
    }
    yield all(promises);
    yield put(ToastCreators.success());
    const { path } = ROUTE.PAYMENT_MERCHANT_LIST;
    history.push(path);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.createMerchantPaymentProviderFailure({ error }));
  }
}
function* watchCreateMerchantPaymentProviderRequest() {
  yield takeLatest(Types.CREATE_MERCHANT_PAYMENT_PROVIDER_REQUEST, createMerchantPaymentProviderRequest);
}

export default function* newPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMerchantRequest),
      fork(watchCreateMerchantPaymentProviderRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
