/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  brandsSelector,
  filtersSelector,
} from '@app/pages/Brand/List/redux/selectors';
import { brandStatuses } from '@app/shared/constantValues';

const reducerKey = REDUX_KEY.BRAND.LIST;

describe('Brand/List', () => {
  describe('selector #brandsSelector.getData', () => {
    it('receivedResult should equal to expected array (when data is array)', () => {
      const fakeStoreState = { [reducerKey]: { brands: { data: [{ id: '123', name: 'Name' }] } } };
      const receivedResult = brandsSelector.getData(fakeStoreState);
      const expectedResult = [{ id: '123', name: 'Name' }];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty array (when data is empty array)', () => {
      const fakeStoreState = { [reducerKey]: { brands: { data: [] } } };
      const receivedResult = brandsSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty array (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { brands: { data: undefined } } };
      const receivedResult = brandsSelector.getData(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #brandsSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { brands: { isPending: true } } };
      const receivedResult = brandsSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { brands: { isPending: null } } };
      const receivedResult = brandsSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { brands: { isPending: undefined } } };
      const receivedResult = brandsSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #filtersSelector.getSelectedFilterOptions', () => {
    it('receivedResult should equal to expected array (when data is array)', () => {
      const selectedStatuses = Object.keys(brandStatuses);
      const fakeStoreState = { [reducerKey]: { filters: { selectedStatuses } } };
      const receivedResult = filtersSelector.getSelectedFilterOptions(fakeStoreState);
      const expectedResult = selectedStatuses;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty array (when data is empty array)', () => {
      const fakeStoreState = { [reducerKey]: { filters: { selectedStatuses: [] } } };
      const receivedResult = filtersSelector.getSelectedFilterOptions(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty array (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { filters: { selectedStatuses: undefined } } };
      const receivedResult = filtersSelector.getSelectedFilterOptions(fakeStoreState);
      const expectedResult = [];
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
