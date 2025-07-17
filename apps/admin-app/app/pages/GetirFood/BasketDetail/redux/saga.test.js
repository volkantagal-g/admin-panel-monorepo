/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';

import { getUserById } from '@shared/api/user';
import { getBasketOrderDetail } from '@shared/api/foodBasket';
import {
  refreshGetOrderDetail,
  getOrderDetailRequest,
  watchGetOrderDetailRequest,
  getUserByIdRequest,
  watchGetUserByIdRequest,
} from './saga';
import { Creators, Types } from './actions';

describe('BasketDetail - saga', () => {
  describe('saga #getOrderDetailRequest', () => {
    const fakeRequestData = { basketOrderId: '123' };
    const fakeResponseData = { _id: '123', status: 100 };

    it('should call the getOrderDetailRequest (success)', () => {
      testSaga(refreshGetOrderDetail, fakeRequestData)
        .next()
        .call(getBasketOrderDetail, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getOrderDetailSuccess({ data: fakeResponseData }))
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

  describe('saga #getUserByIdRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', name: 'Test User' };

    it('should call the getUserByIdRequest (success)', () => {
      testSaga(getUserByIdRequest, fakeRequestData)
        .next()
        .call(getUserById, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getUserByIdSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetUserByIdRequest', () => {
    it('should call the watchGetUserByIdRequest', () => {
      testSaga(watchGetUserByIdRequest)
        .next()
        .takeLatest(Types.GET_USER_BY_ID_REQUEST, getUserByIdRequest)
        .next()
        .isDone();
    });
  });
});
