/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import {
  getMarketProductCategoryAvailableTimeRequest,
  updateMarketProductCategoryAvailableTimeRequest,
  watchGetMarketProductCategoryAvailableTimeRequest,
  watchUpdateMarketProductCategoryAvailableTimeRequest,
} from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import {
  getMarketProductCategoryAvailableTime,
  updateMarketProductCategoryAvailableTime,
} from '@app/api/marketProductCategoryAvailableTime';

describe('MarketProduct/Category/Visibility/Detail', () => {
  describe('saga #getMarketProductCategoryAvailableTimeRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', name: 'Name' };

    it('should call the getMarketProductCategoryAvailableTimeRequest (success)', () => {
      testSaga(getMarketProductCategoryAvailableTimeRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategoryAvailableTime, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductCategoryAvailableTimeSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductCategoryAvailableTimeRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductCategoryAvailableTimeRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategoryAvailableTime, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductCategoryAvailableTimeFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateMarketProductCategoryAvailableTimeRequest', () => {
    const fakeRequestData = { id: '123', body: { name: 'Name' } };

    it('should call the updateMarketProductCategoryAvailableTimeRequest (success)', () => {
      testSaga(updateMarketProductCategoryAvailableTimeRequest, fakeRequestData)
        .next()
        .call(updateMarketProductCategoryAvailableTime, fakeRequestData)
        .next()
        .put(Creators.updateMarketProductCategoryAvailableTimeSuccess())
        .next()
        .put(Creators.getMarketProductCategoryAvailableTimeRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateMarketProductCategoryAvailableTimeRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateMarketProductCategoryAvailableTimeRequest, fakeRequestData)
        .next()
        .call(updateMarketProductCategoryAvailableTime, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.updateMarketProductCategoryAvailableTimeFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductCategoryAvailableTimeRequest', () => {
    it('should call the watchGetMarketProductCategoryAvailableTimeRequest', () => {
      testSaga(watchGetMarketProductCategoryAvailableTimeRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, getMarketProductCategoryAvailableTimeRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateMarketProductCategoryAvailableTimeRequest', () => {
    it('should call the watchUpdateMarketProductCategoryAvailableTimeRequest', () => {
      testSaga(watchUpdateMarketProductCategoryAvailableTimeRequest)
        .next()
        .takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, updateMarketProductCategoryAvailableTimeRequest)
        .next()
        .isDone();
    });
  });
});
