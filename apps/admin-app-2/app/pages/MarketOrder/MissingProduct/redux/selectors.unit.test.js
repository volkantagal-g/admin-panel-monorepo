import { mockedMarketOrderDetail, mockedMissingProductOrders } from '@shared/api/marketOrder/index.mock.data';
import { REDUX_KEY } from '@shared/shared/constants';
import { formatMissingProductOrders } from '../utils';
import { defaultCurrentPage, defaultRowsPerPage } from './actions';
import { filtersSelector, getMarketOrderSelector, getMissingProductOrdersSelector, getOrderCancelReasonsSelector } from './selectors';

const reducerKey = REDUX_KEY.MARKET_ORDER.MISSING_PRODUCTS;

describe('Missing Products selector', () => {
  describe('#getMissingProductOrdersSelector', () => {
    describe('#getMissingProductOrdersSelector.getData', () => {
      it('receivedResult should equal to received', () => {
        const fakeStoreState = { [reducerKey]: { getMissingProductOrders: { data: mockedMissingProductOrders } } };
        const receivedResult = getMissingProductOrdersSelector.getData(fakeStoreState);
        const expectedResult = formatMissingProductOrders(mockedMissingProductOrders);
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty array (when data is empty)', () => {
        const fakeStoreState = { [reducerKey]: { getMissingProductOrders: { data: [] } } };
        const receivedResult = getMissingProductOrdersSelector.getData(fakeStoreState);
        const expectedResult = [];
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty array (when data is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { getMissingProductOrders: { data: undefined } } };
        const receivedResult = getMissingProductOrdersSelector.getData(fakeStoreState);
        const expectedResult = [];
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#getMissingProductOrdersSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { getMissingProductOrders: { isPending: true } } };
        const receivedResult = getMissingProductOrdersSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is false)', () => {
        const fakeStoreState = { [reducerKey]: { getMissingProductOrders: { isPending: false } } };
        const receivedResult = getMissingProductOrdersSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
    describe('#getOrderCancelReasonsSelector.getData', () => {
      it('receivedResult should equal to received', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { data: { cancelReasons: [{ name: 'cancel reason', id: 1 }] } } } };
        const receivedResult = getOrderCancelReasonsSelector.getData(fakeStoreState);
        const expectedResult = { cancelReasons: [{ name: 'cancel reason', id: 1 }] };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to [] (when data is empty)', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { data: [] } } };
        const receivedResult = getOrderCancelReasonsSelector.getData(fakeStoreState);
        const expectedResult = [];
        expect(receivedResult).toEqual(expectedResult);
      });
    });
    describe('#getOrderCancelReasonsSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { isPending: true } } };
        const receivedResult = getOrderCancelReasonsSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is false)', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { isPending: false } } };
        const receivedResult = getOrderCancelReasonsSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });
  describe('getOrderCancelReasonsSelector', () => {
    describe('#getOrderCancelReasonsSelector.getData', () => {
      it('receivedResult should equal to received', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { data: { cancelReasons: [{ name: 'cancel reason', id: 1 }] } } } };
        const receivedResult = getOrderCancelReasonsSelector.getData(fakeStoreState);
        const expectedResult = { cancelReasons: [{ name: 'cancel reason', id: 1 }] };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to [] (when data is empty)', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { data: [] } } };
        const receivedResult = getOrderCancelReasonsSelector.getData(fakeStoreState);
        const expectedResult = [];
        expect(receivedResult).toEqual(expectedResult);
      });
    });
    describe('#getOrderCancelReasonsSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { isPending: true } } };
        const receivedResult = getOrderCancelReasonsSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is false)', () => {
        const fakeStoreState = { [reducerKey]: { getOrderCancelReasons: { isPending: false } } };
        const receivedResult = getOrderCancelReasonsSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });

  describe('#filtersSelector', () => {
    it('should retrieve correct domainType', () => {
      const fakeStoreState = { [reducerKey]: { filters: { domainType: 1 } } };
      const receivedResult = filtersSelector.getSelectedDomainType(fakeStoreState);
      const expectedResult = 1;
      expect(receivedResult).toEqual(expectedResult);
    });
    it('should retrieve correct pagination', () => {
      const fakeStoreState = { [reducerKey]: { filters: { pagination: { currentPage: defaultCurrentPage, rowsPerPage: defaultRowsPerPage } } } };
      const receivedResult = filtersSelector.getPagination(fakeStoreState);
      const expectedResult = { currentPage: defaultCurrentPage, rowsPerPage: defaultRowsPerPage };
      expect(receivedResult).toEqual(expectedResult);
    });
    it('should retrieve correct searchTerm', () => {
      const fakeStoreState = { [reducerKey]: { filters: { searchTerm: 'missing product' } } };
      const receivedResult = filtersSelector.getSearchTerm(fakeStoreState);
      const expectedResult = 'missing product';
      expect(receivedResult).toEqual(expectedResult);
    });
    it('should retrieve correct getSelectedCity', () => {
      const fakeStoreState = { [reducerKey]: { filters: { city: 'Istanbul' } } };
      const receivedResult = filtersSelector.getSelectedCity(fakeStoreState);
      const expectedResult = 'Istanbul';
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('getMarketOrderSelector', () => {
    describe('#getMarketOrderSelector.getData', () => {
      it('receivedResult should equal to received', () => {
        const fakeStoreState = { [reducerKey]: { getMarketOrder: { data: mockedMarketOrderDetail } } };
        const receivedResult = getMarketOrderSelector.getData(fakeStoreState);
        const expectedResult = formatMissingProductOrders(mockedMarketOrderDetail);
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is empty)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketOrder: { data: {} } } };
        const receivedResult = getMarketOrderSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });
    });
    describe('#getMarketOrderSelector.getIsPending', () => {
      it('receivedResult should equal received (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketOrder: { isPending: true } } };
        const receivedResult = getMarketOrderSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal received (when isPending is false)', () => {
        const fakeStoreState = { [reducerKey]: { getMarketOrder: { isPending: false } } };
        const receivedResult = getMarketOrderSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });
});
