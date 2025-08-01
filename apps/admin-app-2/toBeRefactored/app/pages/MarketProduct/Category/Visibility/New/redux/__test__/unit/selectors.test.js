/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import { createMarketProductCategoryAvailableTimeSelector } from '@app/pages/MarketProduct/Category/Visibility/New/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.NEW;

describe('MarketProduct/Category/Visibility/Detail', () => {
  describe('selector #createMarketProductCategoryAvailableTimeSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategoryAvailableTime: { isPending: true } } };
      const receivedResult = createMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is false)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategoryAvailableTime: { isPending: false } } };
      const receivedResult = createMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategoryAvailableTime: { isPending: null } } };
      const receivedResult = createMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { createMarketProductCategoryAvailableTime: { isPending: undefined } } };
      const receivedResult = createMarketProductCategoryAvailableTimeSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
