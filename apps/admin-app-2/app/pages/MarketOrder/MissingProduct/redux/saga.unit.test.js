import { testSaga } from 'redux-saga-test-plan';

import { t } from '@shared/i18n';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import { Creators, defaultDomainType, Types } from './actions';
import {
  addMhProblemRequest,
  fetchMissingProductOrders,
  getMarketOrderRequest,
  getMissingProductOrdersRequest,
  getOrderCancelReasonsRequest,
  orderPartialRefundRequest,
  updateMissingProductStatusRequest,
  watchGetMissingProductOrdersRequest,
} from './saga';
import {
  addMhProblem,
  getMissingProductOrders,
  getOrderCancelReasons,
  getOrderDetail,
  updateMissingProductStatus,
} from '@shared/api/marketOrder';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import { partialRefundOrder } from '@shared/api/customer';

describe('OrderFilter', () => {
  describe('saga #fetchMissingProductOrders', () => {
    const fakeRequestData = {
      city: null,
      domainType: defaultDomainType,
      limit: 10,
      offset: 0,
    };
    const fakeResponseData = [mockedMarketOrders];

    it('should call the getMissingProductOrdersRequest (success)', () => {
      testSaga(fetchMissingProductOrders, fakeRequestData)
        .next()
        .call(getMissingProductOrders, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(
          Creators.getMissingProductOrdersSuccess({ data: fakeResponseData }),
        )
        .next()
        .isDone();
    });

    it('should call the getMissingProductOrdersRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMissingProductOrdersRequest, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.getMissingProductOrdersFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next();
    });
  });

  describe('saga #watchGetMissingProductOrdersRequest', () => {
    it('should call the watchGetMissingProductOrdersRequest', () => {
      testSaga(watchGetMissingProductOrdersRequest)
        .next()
        .takeLatest(
          Types.GET_MISSING_PRODUCT_ORDERS_REQUEST,
          getMissingProductOrdersRequest,
        )
        .next()
        .isDone();
    });
  });
  describe('saga #getMarketOrderRequest', () => {
    const fakeRequestData = {
      id: '123',
      domainType: defaultDomainType,
    };
    const fakeResponseData = mockedMarketOrderDetail;

    it('should call the getMarketOrderRequest (success)', () => {
      testSaga(getMarketOrderRequest, fakeRequestData)
        .next()
        .call(getOrderDetail, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.getMarketOrderSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketOrderRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketOrderRequest, fakeRequestData)
        .next()
        .call(getOrderDetail, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketOrderFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #getOrderCancelReasonsRequest', () => {
    const fakeRequestData = { domainType: defaultDomainType };
    const fakeResponseData = {
      id: '123',
      name: { tr: 'cancel reason', en: 'cancel reason' },
    };

    it('should call the getOrderCancelReasonsRequest (success)', () => {
      testSaga(getOrderCancelReasonsRequest, fakeRequestData)
        .next()
        .call(getOrderCancelReasons, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.getOrderCancelReasonsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getOrderCancelReasonsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getOrderCancelReasonsRequest, fakeRequestData)
        .next()
        .call(getOrderCancelReasons, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getOrderCancelReasonsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #updateMissingProductStatusRequest', () => {
    const fakeRequestData = {
      orderId: '123',
      status: 100,
      domainType: defaultDomainType,
    };
    const fakeResponseData = { success: true };

    it('should call the updateMissingProductStatusRequest (success)', () => {
      testSaga(updateMissingProductStatusRequest, fakeRequestData)
        .next()
        .call(updateMissingProductStatus, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(
          Creators.updateMissingProductStatusSuccess({ data: fakeResponseData }),
        )
        .next()
        .isDone();
    });

    it('should call the updateMissingProductStatusRequest (failure)', () => {
      const fakeError = new Error('Error occurred');
      testSaga(updateMissingProductStatusRequest, fakeRequestData)
        .next()
        .call(updateMissingProductStatus, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.updateMissingProductStatusFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #addMhProblemRequest', () => {
    const fakeRequestData = {
      adminUser: '123',
      orderId: '100',
      domainType: defaultDomainType,
    };
    const fakeResponseData = { success: true };

    it('should call the addMhProblemRequest (success)', () => {
      testSaga(addMhProblemRequest, fakeRequestData)
        .next()
        .call(addMhProblem, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.addMhProblemSuccess({ data: fakeResponseData }))
        .next()
        .put(
          Creators.updateMissingOrderStatus({ orderId: fakeRequestData.orderId }),
        )
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the addMhProblemRequest (failure)', () => {
      const fakeError = new Error('Error occurred');
      testSaga(addMhProblemRequest, fakeRequestData)
        .next()
        .call(addMhProblem, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.addMhProblemFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #orderPartialRefundRequest', () => {
    const fakeRequestData = {
      orderId: '123',
      products: [{ count: 1, productId: '1234', isWillBeAddedToStock: false }],
      refundBagFee: false,
      refundDeliveryFee: false,
      domainType: defaultDomainType,
    };
    const fakeResponseData = { success: true };

    it('should call the orderPartialRefundRequest (success)', () => {
      jest.mock('react-i18next', () => ({ t: jest.fn() }));
      testSaga(orderPartialRefundRequest, fakeRequestData)
        .next()
        .call(partialRefundOrder, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.orderPartialRefundSuccess({ data: fakeResponseData }))
        .next()
        .put(ToastCreators.success({
          message: t(
            'success:PARTIAL_REFUND_SUCCESS',
          ),
        }))
        .next()
        .isDone();
    });

    it('should call the orderPartialRefundRequest (failure)', () => {
      const fakeError = new Error('Error occurred');
      testSaga(orderPartialRefundRequest, fakeRequestData)
        .next()
        .call(partialRefundOrder, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.orderPartialRefundFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
