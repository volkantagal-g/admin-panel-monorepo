/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getMarketProductCategoryAvailableTimesSelector,
  deactivateMarketProductCategoryAvailableTimeSelector,
  setFiltersSelector,
} from '@app/pages/MarketProduct/Category/Visibility/List/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.LIST;

describe('MarketProduct/Category/Visibility/List', () => {
  describe('selector #getMarketProductCategoryAvailableTimesSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTimes: { data: [{ id: '123', name: 'Name' }] } } };
      const receivedResult = getMarketProductCategoryAvailableTimesSelector.getData(fakeStoreState);
      const expectedResult = [{ id: '123', name: 'Name' }];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is empty)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTimes: { data: [] } } };
      const receivedResult = getMarketProductCategoryAvailableTimesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTimes: { data: undefined } } };
      const receivedResult = getMarketProductCategoryAvailableTimesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductCategoryAvailableTimesSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTimes: { isPending: true } } };
      const receivedResult = getMarketProductCategoryAvailableTimesSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTimes: { isPending: null } } };
      const receivedResult = getMarketProductCategoryAvailableTimesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryAvailableTimes: { isPending: undefined } } };
      const receivedResult = getMarketProductCategoryAvailableTimesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #deactivateMarketProductCategoryAvailableTimeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateMarketProductCategoryAvailableTime: { isPending: true } } };
      const receivedResult = deactivateMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
  describe('selector #deactivateMarketProductCategoryAvailableTimeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateMarketProductCategoryAvailableTime: { isPending: null } } };
      const receivedResult = deactivateMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
  describe('selector #deactivateMarketProductCategoryAvailableTimeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending undefined)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateMarketProductCategoryAvailableTime: { isPending: undefined } } };
      const receivedResult = deactivateMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #setFiltersSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { setFilters: { data: { city: '123' } } } };
      const receivedResult = setFiltersSelector.getData(fakeStoreState);
      const expectedResult = { city: '123' };
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
