import reducer, { INITIAL_STATE } from '@app/pages/Stock/Transfer/Auto/redux/reducers';
import { Types } from '@app/pages/Stock/Transfer/Auto/redux/actions';

describe('Stock/Transfer/Auto', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });
  describe('reducer GET_STOCK_TRANSFER_AUTO_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_STOCK_TRANSFER_AUTO_REQUEST });
      const expectedState = { stockTransferAuto: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_STOCK_TRANSFER_AUTO_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_STOCK_TRANSFER_AUTO_SUCCESS, data: { id: '123' } });
      const expectedState = {
        stockTransferAuto: {
          isPending: false,
          data: { id: '123' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_STOCK_TRANSFER_AUTO_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_STOCK_TRANSFER_AUTO_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        stockTransferAuto: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_CATEGORY_PARAMS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_CATEGORY_PARAMS, data: '123' });
      const expectedState = { categoryParams: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_FORM_WAREHOUSES', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_FORM_WAREHOUSES, data: '123' });
      const expectedState = { formWarehouses: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_REGULAR_WAREHOUSES', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_REGULAR_WAREHOUSES, data: '123' });
      const expectedState = { regularWarehouses: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_FORM_WAREHOUSES', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_FORM_WAREHOUSES, data: '123' });
      const expectedState = { formWarehouses: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_PRODUCT_PARAMS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_PRODUCT_PARAMS, data: '123' });
      const expectedState = { productParams: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_SUPPLIER_ID', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_SUPPLIER_ID, data: '123' });
      const expectedState = { supplierId: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_SERVICE_TYPE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_SERVICE_TYPE, data: '123' });
      const expectedState = { serviceType: { data: '123' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST });
      const expectedState = { getMarketProductMasterCategoriesOld: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_SUCCESS, data: '123' });
      const expectedState = {
        getMarketProductMasterCategoriesOld: {
          isPending: false,
          data: '123',
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProductMasterCategoriesOld: {
          isPending: false,
          error: new Error('404 Not Found'),
          data: [],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
