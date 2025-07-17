/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getBrandSelector,
  updateBrandSelector,
  activateBrandSelector,
  deactivateBrandSelector,
} from '@app/pages/Brand/Detail/redux/selectors';

const reducerKey = REDUX_KEY.BRAND.DETAIL;

describe('Brand/Detail', () => {
  describe('selector #getBrandSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getBrand: { data: { id: '123', name: 'Name' } } } };
      const receivedResult = getBrandSelector.getData(fakeStoreState);
      const expectedResult = { id: '123', name: 'Name' };
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is null)', () => {
      const fakeStoreState = { [reducerKey]: { getBrand: { data: null } } };
      const receivedResult = getBrandSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getBrand: { data: undefined } } };
      const receivedResult = getBrandSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getBrandSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getBrand: { isPending: true } } };
      const receivedResult = getBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getBrand: { isPending: null } } };
      const receivedResult = getBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getBrand: { isPending: undefined } } };
      const receivedResult = getBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateBrandSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateBrand: { isPending: true } } };
      const receivedResult = updateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateBrand: { isPending: null } } };
      const receivedResult = updateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateBrand: { isPending: undefined } } };
      const receivedResult = updateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #activateBrandSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { activateBrand: { isPending: true } } };
      const receivedResult = activateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { activateBrand: { isPending: null } } };
      const receivedResult = activateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { activateBrand: { isPending: undefined } } };
      const receivedResult = activateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #deactivateBrandSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateBrand: { isPending: true } } };
      const receivedResult = deactivateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateBrand: { isPending: null } } };
      const receivedResult = deactivateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateBrand: { isPending: undefined } } };
      const receivedResult = deactivateBrandSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
