/* eslint-disable */
import { REDUX_KEY } from '@app/shared/constants';
import {
  getMarketProductCategoryByIdSelector,
  updateMarketProductCategorySelector,
  updateMarketProductCategoryImageUrlSelector,
  getMarketProductCategorySlugsSelector,
  activateMarketProductCategorySelector,
  deactivateMarketProductCategorySelector,
  updateMarketProductCategoryAdditionalInfoSelector,
} from '@app/pages/MarketProduct/Category/Detail/redux/selectors';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.DETAIL;

describe('MarketProduct/Category/Detail', () => {
  describe('selector #getMarketProductCategoryByIdSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryById: { data: { id: '123', name: 'Category Name' } } } };
      const receivedResult = getMarketProductCategoryByIdSelector.getData(fakeStoreState);
      const expectedResult = { id: '123', name: 'Category Name' };
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryById: { data: null } } };
      const receivedResult = getMarketProductCategoryByIdSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryById: { data: undefined } } };
      const receivedResult = getMarketProductCategoryByIdSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductCategoryByIdSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryById: { isPending: true } } };
      const receivedResult = getMarketProductCategoryByIdSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryById: { isPending: null } } };
      const receivedResult = getMarketProductCategoryByIdSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategoryById: { isPending: undefined } } };
      const receivedResult = getMarketProductCategoryByIdSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateMarketProductCategorySelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategory: { isPending: true } } };
      const receivedResult = updateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategory: { isPending: null } } };
      const receivedResult = updateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategory: { isPending: undefined } } };
      const receivedResult = updateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateMarketProductCategoryAdditionalInfoSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryAdditionalInfo: { isPending: true } } };
      const receivedResult = updateMarketProductCategoryAdditionalInfoSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategory: { isPending: null } } };
      const receivedResult = updateMarketProductCategoryAdditionalInfoSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategory: { isPending: undefined } } };
      const receivedResult = updateMarketProductCategoryAdditionalInfoSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #updateMarketProductCategoryImageUrlSelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryImageUrl: { isPending: true } } };
      const receivedResult = updateMarketProductCategoryImageUrlSelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryImageUrl: { isPending: null } } };
      const receivedResult = updateMarketProductCategoryImageUrlSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { updateMarketProductCategoryImageUrl: { isPending: undefined } } };
      const receivedResult = updateMarketProductCategoryImageUrlSelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #activateMarketProductCategorySelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { activateMarketProductCategory: { isPending: true } } };
      const receivedResult = activateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { activateMarketProductCategory: { isPending: null } } };
      const receivedResult = activateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { activateMarketProductCategory: { isPending: undefined } } };
      const receivedResult = activateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #deactivateMarketProductCategorySelector.getIsPending', () => {
    it('receivedResult should equal to true (when isPending is true)', () => {
      const fakeStoreState = { [reducerKey]: { deactivateMarketProductCategory: { isPending: true } } };
      const receivedResult = deactivateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = true;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is null)', () => {
      const fakeStoreState = { [reducerKey]: { activateMarketProductCategory: { isPending: null } } };
      const receivedResult = deactivateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to false (when isPending is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { activateMarketProductCategory: { isPending: undefined } } };
      const receivedResult = deactivateMarketProductCategorySelector.getIsPending(fakeStoreState);
      const expectedResult = false;
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('selector #getMarketProductCategorySlugsSelector.getData', () => {
    it('receivedResult should equal to received object (when data is object)', () => {
      const fakeStoreState = {
        [reducerKey]: {
          getMarketProductCategorySlugs: {
            data: {
              categorySlugs: {
                id: '123',
                name: 'Category Name',
              },
            },
          },
        },
      };
      const receivedResult = getMarketProductCategorySlugsSelector.getData(fakeStoreState);
      const expectedResult = { id: '123', name: 'Category Name' };
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is null)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategorySlugs: { data: null } } };
      const receivedResult = getMarketProductCategorySlugsSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });

    it('receivedResult should equal to empty object (when data is undefined)', () => {
      const fakeStoreState = { [reducerKey]: { getMarketProductCategorySlugs: { data: undefined } } };
      const receivedResult = getMarketProductCategorySlugsSelector.getData(fakeStoreState);
      const expectedResult = {};
      expect(receivedResult).toEqual(expectedResult);
    });
  });
});
