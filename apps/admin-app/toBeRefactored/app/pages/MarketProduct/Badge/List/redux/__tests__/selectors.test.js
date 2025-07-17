/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getBadgesSelector,
  getMarketProductBadgesSelector,
  selectedBadgeSelector,
  updateMarketProductBadgesBulkSelector,
} from '@app/pages/MarketProduct/Badge/List/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.BADGE.LIST;

describe('MarketProduct/Badge/List', () => {
  describe('selector #getBadgesSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getBadges: { data: [{ id: '123', name: 'BadgeName' }] } } };
      const receivedResult = getBadgesSelector.getData(fakeStoreState);
      const expectedResult = [{ id: '123', name: 'BadgeName' }];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is empty)', () => {
      const fakeStoreState = { [reducerKey]: { getBadges: { data: [] } } };
      const receivedResult = getBadgesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getBadges: { data: undefined } } };
      const receivedResult = getBadgesSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getBadgesSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getBadges: { isPending: true } } };
      const receivedResult = getBadgesSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getBadges: { isPending: null } } };
      const receivedResult = getBadgesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getBadges: { isPending: undefined } } };
      const receivedResult = getBadgesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductBadgesSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductBadges: { isPending: true } } };
      const receivedResult = getMarketProductBadgesSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductBadges: { isPending: null } } };
      const receivedResult = getMarketProductBadgesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductBadges: { isPending: undefined } } };
      const receivedResult = getMarketProductBadgesSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #selectedBadgeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { selectedBadge: { data: { name: 'Badge Name' } } } };
      const receivedResult = selectedBadgeSelector.getData(fakeStoreState);
      const expectedResult = { name: 'Badge Name' };
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateMarketProductBadgesBulkSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductBadgesBulk: { isPending: true } } };
      const receivedResult = updateMarketProductBadgesBulkSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
  describe('selector #updateMarketProductBadgesBulkSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductBadgesBulk: { isPending: null } } };
      const receivedResult = updateMarketProductBadgesBulkSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
  describe('selector #updateMarketProductBadgesBulkSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductBadgesBulk: { isPending: undefined } } };
      const receivedResult = updateMarketProductBadgesBulkSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
