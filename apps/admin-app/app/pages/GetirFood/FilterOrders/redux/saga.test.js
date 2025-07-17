import { testSaga } from 'redux-saga-test-plan';

import { getPaymentMethods } from '@shared/api/foodOrderActive';

import { getPaymentMethodsRequest, watchPaymentMethodsRequest } from './saga';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('OrderFilter - saga', () => {
  describe('saga #getPaymentMethodsRequest', () => {
    const fakeRequestData = { includeOnline: true };
    const fakeResponseData = [
      {
        id: '5e007cf202784c176a703e67',
        name: {
          tr: 'Masterpass',
          en: 'Masterpass',
        },
        icon: 'https://cdn.getiryemek.com/ondelivery/icon-masterpass.png',
        paymentGroup: 1,
        deliveryTypes: [
          1,
          2,
        ],
        type: 1,
      },
    ];

    it('should call the getPaymentMethodsRequest (success)', () => {
      testSaga(getPaymentMethodsRequest, fakeRequestData)
        .next()
        .call(getPaymentMethods, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getPaymentMethodsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getPaymentMethodsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getPaymentMethodsRequest, fakeRequestData)
        .next()
        .call(getPaymentMethods, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getPaymentMethodsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchPaymentMethodsRequest', () => {
    it('should call the watchPaymentMethodsRequest', () => {
      testSaga(watchPaymentMethodsRequest)
        .next()
        .takeLatest(Types.GET_PAYMENT_METHODS_REQUEST, getPaymentMethodsRequest)
        .next()
        .isDone();
    });
  });
});
