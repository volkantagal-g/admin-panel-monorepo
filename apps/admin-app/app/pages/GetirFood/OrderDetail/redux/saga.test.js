import { testSaga } from 'redux-saga-test-plan';

import { getFoodOrderDetail, getFoodOrderCancelOptions, getAgreementData } from '@shared/api/foodOrderDetail';

import {
  refreshGetOrderDetail,
  getOrderDetailRequest,
  watchGetOrderDetailRequest,
  getOrderCancelOptionRequest,
  watchGetOrderCancelOptionRequest,
  printAgreement,
  getAgreementDataRequest,
} from './saga';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('OrderDetail - saga', () => {
  describe('saga #getOrderDetailRequest', () => {
    const fakeRequestData = { orderDetailId: '123' };
    const fakeRequestDataForOrderDetail = { foodOrderId: '123' };
    const fakeResponseData = { _id: '123', status: 400 };

    it('should call the getOrderDetailRequest (success)', () => {
      testSaga(refreshGetOrderDetail, fakeRequestData)
        .next()
        .call(getFoodOrderDetail, fakeRequestDataForOrderDetail)
        .next(fakeResponseData)
        .put(Creators.getOrderDetailSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getOrderDetailRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(refreshGetOrderDetail, fakeRequestData)
        .next()
        .call(getFoodOrderDetail, fakeRequestDataForOrderDetail)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(ToastCreators.error({ error: fakeError, message: fakeError?.response?.data?.message }))
        .next()
        .put(Creators.getOrderDetailFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetOrderDetailRequest', () => {
    it('should call the watchGetOrderDetailRequest', () => {
      testSaga(watchGetOrderDetailRequest)
        .next()
        .takeLatest(Types.GET_ORDER_DETAIL_REQUEST, getOrderDetailRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #getOrderCancelOptionRequest', () => {
    const fakeRequestData = { orderDetailId: '123' };
    const fakeRequestDataForOrderDetail = { foodOrderId: '123' };
    const fakeResponseData = [{ _id: '5c5b495768f6a45d427f0a8d' }];

    it('should call the getOrderCancelOptionRequest (success)', () => {
      testSaga(getOrderCancelOptionRequest, fakeRequestData)
        .next()
        .call(getFoodOrderCancelOptions, fakeRequestDataForOrderDetail)
        .next(fakeResponseData)
        .put(Creators.getOrderCancelOptionSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getOrderCancelOptionRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getOrderCancelOptionRequest, fakeRequestData)
        .next()
        .call(getFoodOrderCancelOptions, fakeRequestDataForOrderDetail)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getOrderCancelOptionFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetOrderCancelOptionRequest', () => {
    it('should call the watchGetOrderCancelOptionRequest', () => {
      testSaga(watchGetOrderCancelOptionRequest)
        .next()
        .takeLatest(Types.GET_ORDER_CANCEL_OPTION_REQUEST, getOrderCancelOptionRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #getAgreementDataRequest', () => {
    const fakeRequestData = { foodOrderId: '123', clientId: '123' };
    const fakeResponseData = { foodOrder: { client: { name: 'ATP-I Testing' } } };

    it('should call the getAgreementDataRequest (success)', () => {
      testSaga(getAgreementDataRequest, fakeRequestData)
        .next()
        .call(getAgreementData, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAgreementDataSuccess({ data: fakeResponseData }))
        .next()
        .fork(printAgreement, fakeResponseData)
        .next()
        .isDone();
    });
  });
});
