import reducer, { INITIAL_STATE } from '@app/pages/Stock/Order/Auto/redux/reducers';
import { Types } from '@app/pages/Stock/Order/Auto/redux/actions';

describe('Stock/Order/eAuto', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_AUTO_STOCK_ORDER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_AUTO_STOCK_ORDER_REQUEST });
      const expectedState = { autoStockOrder: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_AUTO_STOCK_ORDER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_AUTO_STOCK_ORDER_SUCCESS, data: { id: '123' } });
      const expectedState = {
        autoStockOrder: {
          isPending: false,
          data: { id: '123' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_AUTO_STOCK_ORDER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_AUTO_STOCK_ORDER_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        autoStockOrder: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_ITEM_PARAMS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_ITEM_PARAMS, data: '123' });
      const expectedState = { itemParams: { data: '123' } };
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

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
