/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import {
  getMarketProductCategoriesRequest,
  createMarketProductCategoryRequest,
  watchGetMarketProductCategoriesRequest,
  watchCreateMarketProductCategoryRequest,
} from '@app/pages/MarketProduct/Category/New/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Category/New/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { getMarketProductCategories, createMarketProductCategory } from '@app/api/marketProductCategory';

describe('MarketProduct/Category/New', () => {
  describe('saga #getMarketProductCategoriesRequest', () => {
    const fakeRequestData = { isSubCategory: false, limit: null, offset: null };
    const fakeResponseData = [{ _id: '123', name: 'BadgeName' }];

    it('should call the getMarketProductCategoriesRequest (success)', () => {
      testSaga(getMarketProductCategoriesRequest, fakeResponseData)
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

  describe('saga #watchGetMarketProductCategoriesRequest', () => {
    it('should call the watchGetMarketProductCategoriesRequest', () => {
      testSaga(watchGetMarketProductCategoriesRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #createMarketProductCategoryRequest', () => {
    const fakeRequestData = { _id: '123', name: 'BadgeName' };
    const fakeResponseData = [{ _id: '123', name: 'BadgeName' }];

    it('should call the createMarketProductCategoryRequest (success)', () => {
      testSaga(createMarketProductCategoryRequest, { body: fakeRequestData })
        .next()
        .call(createMarketProductCategory, { body: fakeRequestData })
        .next(fakeResponseData)
        .put(ToastCreators.success())
        .next()
        .put(Creators.createMarketProductCategorySuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the createMarketProductCategoryRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(createMarketProductCategoryRequest, { body: fakeRequestData })
        .next()
        .call(createMarketProductCategory, { body: fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.createMarketProductCategoryFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductCategoriesRequest', () => {
    it('should call the watchGetMarketProductCategoriesRequest', () => {
      testSaga(watchGetMarketProductCategoriesRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchCreateMarketProductCategoryRequest', () => {
    it('should call the watchCreateMarketProductCategoryRequest', () => {
      testSaga(watchCreateMarketProductCategoryRequest)
        .next()
        .takeLatest(Types.CREATE_MARKET_PRODUCT_CATEGORY_REQUEST, createMarketProductCategoryRequest)
        .next()
        .isDone();
    });
  });
});
