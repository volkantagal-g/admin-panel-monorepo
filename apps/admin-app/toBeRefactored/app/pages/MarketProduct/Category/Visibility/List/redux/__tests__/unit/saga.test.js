/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import {
  getMarketProductCategoryAvailableTimesRequest,
  watchGetMarketProductCategoryAvailableTimesRequest,
} from '@app/pages/MarketProduct/Category/Visibility/List/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Category/Visibility/List/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import {
  getMarketProductCategoryAvailableTimes,
} from '@app/api/marketProductCategoryAvailableTime';

describe('MarketProduct/Category/Visibility/List', () => {
  describe('saga #getMarketProductCategoryAvailableTimesRequest', () => {
    const fakeRequestData = {};
    const fakeResponseData = [{ _id: '123', name: 'Name' }];

    it('should call the getMarketProductCategoryAvailableTimesRequest (success)', () => {
      testSaga(getMarketProductCategoryAvailableTimesRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategoryAvailableTimes, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductCategoryAvailableTimesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductCategoryAvailableTimesRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductCategoryAvailableTimesRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategoryAvailableTimes, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductCategoryAvailableTimesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductCategoryAvailableTimesRequest', () => {
    it('should call the watchGetMarketProductCategoryAvailableTimesRequest', () => {
      testSaga(watchGetMarketProductCategoryAvailableTimesRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST, getMarketProductCategoryAvailableTimesRequest)
        .next()
        .isDone();
    });
  });
});
