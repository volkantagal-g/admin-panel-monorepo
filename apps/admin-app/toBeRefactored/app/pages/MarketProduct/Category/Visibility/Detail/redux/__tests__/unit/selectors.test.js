/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getMarketProductCategoryAvailableTimeSelector,
  updateMarketProductCategoryAvailableTimeSelector,
} from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.DETAIL;

describe('MarketProduct/Category/Visibility', () => {
  describe('selector #getMarketProductCategoryAvailableTimeSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTime: { data: { id: '123', name: 'Name' } } } };
      const receivedResult = getMarketProductCategoryAvailableTimeSelector.getData(fakeStoreState);
      const expectedResult = { id: '123', name: 'Name' };
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTime: { data: null } } };
      const receivedResult = getMarketProductCategoryAvailableTimeSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTime: { data: undefined } } };
      const receivedResult = getMarketProductCategoryAvailableTimeSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductCategoryAvailableTimeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTime: { isPending: true } } };
      const receivedResult = getMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTime: { isPending: null } } };
      const receivedResult = getMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTime: { isPending: undefined } } };
      const receivedResult = getMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateMarketProductCategoryAvailableTimeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryAvailableTime: { isPending: true } } };
      const receivedResult = updateMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryAvailableTime: { isPending: null } } };
      const receivedResult = updateMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryAvailableTime: { isPending: undefined } } };
      const receivedResult = updateMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
