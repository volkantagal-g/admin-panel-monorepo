/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getMarketProductCategoriesSelector,
  getMarketProductSubCategoriesSelector,
} from '@app/pages/MarketProduct/Category/List/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST;

describe('MarketProduct/Category/List', () => {
  describe('selector #getMarketProductCategoriesSelector.getData', () => {
    it('receivedResult should equal to received object (when data is provided)', () => {
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

  describe('selector #getMarketProductCategoriesSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategories: { isPending: true } } };
      const receivedResult = getMarketProductCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
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

  describe('selector #getMarketProductSubCategoriesSelector.getData', () => {
    it('receivedResult should equal to received object (when data is provided)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductSubCategories: { data: [{ id: '123', name: 'Sub Category Name' }] } } };
      const receivedResult = getMarketProductSubCategoriesSelector.getData(fakeStoreState);
      const expectedResult = [{ id: '123', name: 'Sub Category Name' }];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is empty)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductSubCategories: { data: [] } } };
      const receivedResult = getMarketProductSubCategoriesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductSubCategories: { data: undefined } } };
      const receivedResult = getMarketProductSubCategoriesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductSubCategoriesSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductSubCategories: { isPending: true } } };
      const receivedResult = getMarketProductSubCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductSubCategories: { isPending: null } } };
      const receivedResult = getMarketProductSubCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductSubCategories: { isPending: undefined } } };
      const receivedResult = getMarketProductSubCategoriesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
