/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getBadgeSelector,
  updateBadgeSelector,
  updateBadgeImageUrlSelector,
} from '@app/pages/MarketProduct/Badge/Detail/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.BADGE.DETAIL;

describe('MarketProduct/Badge/Detail', () => {
  describe('selector #getBadgeSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getBadge: { data: { id: '123', name: 'BadgeName' } } } };
      const receivedResult = getBadgeSelector.getData(fakeStoreState);
      const expectedResult = { id: '123', name: 'BadgeName' };
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is null)', () => {
      const fakeStoreState = { [reducerKey]: { getBadge: { data: null } } };
      const receivedResult = getBadgeSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getBadge: { data: undefined } } };
      const receivedResult = getBadgeSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getBadgeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getBadge: { isPending: true } } };
      const receivedResult = getBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getBadge: { isPending: null } } };
      const receivedResult = getBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getBadge: { isPending: undefined } } };
      const receivedResult = getBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateBadgeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateBadge: { isPending: true } } };
      const receivedResult = updateBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateBadge: { isPending: null } } };
      const receivedResult = updateBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateBadge: { isPending: undefined } } };
      const receivedResult = updateBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateBadgeImageUrlSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateBadgeImageUrl: { isPending: true } } };
      const receivedResult = updateBadgeImageUrlSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateBadgeImageUrl: { isPending: null } } };
      const receivedResult = updateBadgeImageUrlSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateBadgeImageUrl: { isPending: undefined } } };
      const receivedResult = updateBadgeImageUrlSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
