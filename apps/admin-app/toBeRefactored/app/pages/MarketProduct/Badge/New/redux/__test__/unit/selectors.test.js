/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import { createBadgeSelector } from '@app/pages/MarketProduct/Badge/New/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.BADGE.NEW;

describe('MarketProduct/Badge/Detail', () => {
  describe('selector #createBadgeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { createBadge: { isPending: true } } };
      const receivedResult = createBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is false)', () => {
      const fakeStoreState = { [reducerKey]: { createBadge: { isPending: false } } };
      const receivedResult = createBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { createBadge: { isPending: null } } };
      const receivedResult = createBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { createBadge: { isPending: undefined } } };
      const receivedResult = createBadgeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
