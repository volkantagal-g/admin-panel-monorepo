/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import {
  getMarketProductCategoriesRequest,
  getMarketProductSubCategoriesRequest,
  watchMarketProductCategoriesRequest,
  watchMarketProductSubCategoriesRequest,
} from '@app/pages/MarketProduct/Category/List/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Category/List/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { getMarketProductCategories } from '@app/api/marketProductCategory';

describe('MarketProduct/Category/List', () => {
  describe('saga #getMarketProductCategoriesRequest', () => {
    const fakeRequestData = { isSubCategory: false, limit: 1, offset: 0, queryText: '', status: undefined };
    const fakeResponseData = [{ _id: '123', name: 'CategoryName' }];

    it('should call the getMarketProductCategoriesRequest (success)', () => {
      testSaga(getMarketProductCategoriesRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategories, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductCategoriesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductCategoriesRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductCategoriesRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategories, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductCategoriesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getMarketProductSubCategoriesRequest', () => {
    const fakeRequestData = { isSubCategory: true, limit: 1, offset: 0, queryText: '', status: undefined };
    const fakeResponseData = [{ _id: '123', name: 'CategoryName' }];

    it('should call the getMarketProductSubCategoriesRequest (success)', () => {
      testSaga(getMarketProductSubCategoriesRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategories, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductSubCategoriesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductSubCategoriesFailure (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductSubCategoriesRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategories, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductSubCategoriesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchMarketProductCategoriesRequest', () => {
    it('should call the watchMarketProductCategoriesRequest', () => {
      testSaga(watchMarketProductCategoriesRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchMarketProductSubCategoriesRequest', () => {
    it('should call the watchMarketProductSubCategoriesRequest', () => {
      testSaga(watchMarketProductSubCategoriesRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST, getMarketProductSubCategoriesRequest)
        .next()
        .isDone();
    });
  });
});
