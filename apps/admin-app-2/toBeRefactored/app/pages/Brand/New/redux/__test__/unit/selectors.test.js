/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import { createBrandSelector } from '@app/pages/Brand/New/redux/selectors';

const reducerKey = REDUX_KEY.BRAND.NEW;

describe('Brand/New', () => {
  describe('selector #createBrandSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { createBrand: { isPending: true } } };
      const receivedResult = createBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is false)', () => {
      const fakeStoreState = { [reducerKey]: { createBrand: { isPending: false } } };
      const receivedResult = createBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { createBrand: { isPending: null } } };
      const receivedResult = createBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { createBrand: { isPending: undefined } } };
      const receivedResult = createBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
