import { testSaga } from 'redux-saga-test-plan';

import { getFraudOrderDetailRequest, getOrderDetailRequest, getOrderNotesRequest } from '@app/pages/MarketOrder/OrderDetail/redux/sagas';
import { Creators } from '@app/pages/MarketOrder/OrderDetail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import { getFraudOrderDetail, getOrderDetail } from '@shared/api/marketOrder';
import { getNotes } from '@shared/api/note';

describe('OrderDetail saga', () => {
  describe('saga #getOrderDetailRequest', () => {
    const fakeRequestData = {
      id: mockedMarketOrderDetail.id,
      domainType: 1,
    };
    const fakeResponseData = { orderDetail: mockedMarketOrderDetail };

    it('should call the getOrderDetailRequest (success)', () => {
      testSaga(getOrderDetailRequest, fakeRequestData)
        .next()
        .call(getOrderDetail, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(
          Creators.getOrderDetailSuccess({ orderDetail: fakeResponseData }),
        )
        .next()
        .isDone();
    });

    it('should call the getOrderDetailRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getOrderDetailRequest, fakeRequestData)
        .next()
        .call(getOrderDetail, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getOrderDetailFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #getFraudOrderDetailRequest', () => {
    const fakeRequestData = {
      id: mockedMarketOrderDetail.id,
      domainType: 1,
    };
    const fakeResponseData = { orderDetail: mockedMarketOrderDetail };

    it('should call the getFraudOrderDetailRequest (success)', () => {
      testSaga(getFraudOrderDetailRequest, fakeRequestData)
        .next()
        .call(getFraudOrderDetail, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(
          Creators.getFraudOrderDetailSuccess({ fraudOrderDetail: fakeResponseData }),
        )
        .next()
        .isDone();
    });

    it('should call the getFraudOrderDetailRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getFraudOrderDetailRequest, fakeRequestData)
        .next()
        .call(getFraudOrderDetail, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getFraudOrderDetailFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #getOrderNotesRequest', () => {
    const fakeRequestData = { orderId: '123', toType: 'marketOrder' };
    const fakeResponseData = { notes: [{ id: '123', name: 'notes' }] };

    it('should call the getOrderNotesRequest (success)', () => {
      const { toType, orderId } = fakeRequestData;
      testSaga(getOrderNotesRequest, fakeRequestData)
        .next()
        .call(getNotes, { to: orderId, toType })
        .next(fakeResponseData)
        .put(
          Creators.getOrderNotesSuccess({ notes: fakeResponseData.notes }),
        )
        .next()
        .isDone();
    });

    it('should call the getOrderNotesRequest (failure)', () => {
      const { toType, orderId } = fakeRequestData;
      const fakeError = new Error('404 Not Found');
      testSaga(getOrderNotesRequest, fakeRequestData)
        .next()
        .call(getNotes, { to: orderId, toType })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getOrderNotesFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
