/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';

import {
  getMarketProductCategoriesSelector,
  createMarketProductCategorySelector,
} from '@app/pages/MarketProduct/Category/New/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.NEW;

describe('MarketProduct/Category/New', () => {
  describe('selector #getMarketProductCategories.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { isPending: true } } };
      const receivedResult = getMarketProductCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is false)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { isPending: false } } };
      const receivedResult = getMarketProductCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { isPending: null } } };
      const receivedResult = getMarketProductCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { isPending: undefined } } };
      const receivedResult = getMarketProductCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductCategoriesSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { data: [{ id: '123', name: 'Category Name' }] } } };
      const receivedResult = getMarketProductCategoriesSelector.getData(fakeStoreState);
      const expectedResult = [{ id: '123', name: 'Category Name' }];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is empty)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { data: [] } } };
      const receivedResult = getMarketProductCategoriesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { data: undefined } } };
      const receivedResult = getMarketProductCategoriesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #createMarketProductCategorySelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategory: { isPending: true } } };
      const receivedResult = createMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is false)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategory: { isPending: false } } };
      const receivedResult = createMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategory: { isPending: null } } };
      const receivedResult = createMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { isPending: undefined } } };
      const receivedResult = createMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
