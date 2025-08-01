import reducer, { INITIAL_STATE } from './reducer';
import {
  defaultCurrentPage,
  defaultDomainType,
  defaultRowsPerPage,
  Types,
} from './actions';
import {
  mockedMarketOrderDetail,
  mockedMissingProductOrders,
} from '@shared/api/marketOrder/index.mock.data';

describe('Missing products Order', () => {
  const missingProductsInitialState = { getMissingProductOrders: { ...INITIAL_STATE.getMissingProductOrders } };
  const marketOrderInitialState = { getMarketOrder: { ...INITIAL_STATE.getMarketOrder } };
  const orderCancelReasonsInitialState = { getOrderCancelReasons: { ...INITIAL_STATE.getOrderCancelReasons } };
  const mhProblemInitialState = { addMhProblem: { ...INITIAL_STATE.addMhProblem } };
  const partialRefundInitialState = { orderPartialRefund: { ...INITIAL_STATE.orderPartialRefund } };
  const filtersInitialState = { filters: { ...INITIAL_STATE.filters } };
  const missingProductStatusInitialState = { updateMissingProductStatus: { ...INITIAL_STATE.updateMissingProductStatus } };
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_MISSING_PRODUCT_ORDERS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductsInitialState, { type: Types.GET_MISSING_PRODUCT_ORDERS_REQUEST });
      const expectedState = {
        getMissingProductOrders: {
          data: [],
          isPending: true,
          error: null,
          count: 0,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MISSING_PRODUCT_ORDERS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductsInitialState, {
        type: Types.GET_MISSING_PRODUCT_ORDERS_SUCCESS,
        data: { orders: mockedMissingProductOrders, totalCount: 1 },
      });
      const expectedState = {
        getMissingProductOrders: {
          data: mockedMissingProductOrders,
          isPending: false,
          error: null,
          count: 1,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MISSING_PRODUCT_ORDERS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductsInitialState, {
        type: Types.GET_MISSING_PRODUCT_ORDERS_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        getMissingProductOrders: {
          data: [],
          isPending: false,
          error: new Error('404 Not Found'),
          count: 0,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_MARKET_ORDER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(marketOrderInitialState, { type: Types.GET_MARKET_ORDER_REQUEST });
      const expectedState = {
        getMarketOrder: {
          data: {},
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_ORDER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(marketOrderInitialState, {
        type: Types.GET_MARKET_ORDER_SUCCESS,
        data: mockedMarketOrderDetail,
      });
      const expectedState = {
        getMarketOrder: {
          data: mockedMarketOrderDetail,
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_ORDER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(marketOrderInitialState, {
        type: Types.GET_MARKET_ORDER_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        getMarketOrder: {
          data: {},
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_ORDER_CANCEL_REASONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(orderCancelReasonsInitialState, { type: Types.GET_ORDER_CANCEL_REASONS_REQUEST });
      const expectedState = {
        getOrderCancelReasons: {
          data: [],
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_CANCEL_REASONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(orderCancelReasonsInitialState, {
        type: Types.GET_ORDER_CANCEL_REASONS_SUCCESS,
        data: { cancelReasons: [{ tr: 'reason', en: 'reason' }] },
      });
      const expectedState = {
        getOrderCancelReasons: {
          data: [{ tr: 'reason', en: 'reason' }],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_CANCEL_REASONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(orderCancelReasonsInitialState, {
        type: Types.GET_ORDER_CANCEL_REASONS_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        getOrderCancelReasons: {
          data: [],
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductStatusInitialState, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MISSING_PRODUCT_STATUS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductStatusInitialState, { type: Types.UPDATE_MISSING_PRODUCT_STATUS_REQUEST });
      const expectedState = {
        updateMissingProductStatus: {
          data: {},
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MISSING_PRODUCT_STATUS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductStatusInitialState, {
        type: Types.UPDATE_MISSING_PRODUCT_STATUS_SUCCESS,
        data: { status: 1 },
      });
      const expectedState = {
        updateMissingProductStatus: {
          data: { status: 1 },
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MISSING_PRODUCT_STATUS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(missingProductStatusInitialState, {
        type: Types.UPDATE_MISSING_PRODUCT_STATUS_FAILURE,
        error: new Error('cannot update'),
      });
      const expectedState = {
        updateMissingProductStatus: {
          data: {},
          isPending: false,
          error: new Error('cannot update'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer ADD_MH_PROBLEM_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(mhProblemInitialState, { type: Types.ADD_MH_PROBLEM_REQUEST });
      const expectedState = {
        addMhProblem: {
          data: {},
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ADD_MH_PROBLEM_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(mhProblemInitialState, {
        type: Types.ADD_MH_PROBLEM_SUCCESS,
        data: { adminUser: 1, orderId: '123' },
      });
      const expectedState = {
        addMhProblem: {
          data: { adminUser: 1, orderId: '123' },
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ADD_MH_PROBLEM_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(mhProblemInitialState, {
        type: Types.ADD_MH_PROBLEM_FAILURE,
        error: new Error('mh error'),
      });
      const expectedState = {
        addMhProblem: {
          data: {},
          isPending: false,
          error: new Error('mh error'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer ORDER_PARTIAL_REFUND_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(partialRefundInitialState, { type: Types.ORDER_PARTIAL_REFUND_REQUEST });
      const expectedState = {
        orderPartialRefund: {
          data: {},
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ORDER_PARTIAL_REFUND_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(partialRefundInitialState, {
        type: Types.ORDER_PARTIAL_REFUND_SUCCESS,
        data: {
          orderId: '123',
          partialRefundProducts: ['123'],
          callerId: null,
          refundBagFee: false,
          refundDeliveryFee: false,
        },
      });
      const expectedState = {
        orderPartialRefund: {
          data: {
            orderId: '123',
            partialRefundProducts: ['123'],
            callerId: null,
            refundBagFee: false,
            refundDeliveryFee: false,
          },
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ORDER_PARTIAL_REFUND_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(partialRefundInitialState, {
        type: Types.ORDER_PARTIAL_REFUND_FAILURE,
        error: new Error('partial refund error'),
      });
      const expectedState = {
        orderPartialRefund: {
          data: {},
          isPending: false,
          error: new Error('partial refund error'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_SELECTED_DOMAIN_TYPE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(filtersInitialState, {
        type: Types.SET_SELECTED_DOMAIN_TYPE,
        domainType: 4,
      });
      const expectedState = {
        filters: {
          domainType: 4,
          city: null,
          pagination: {
            currentPage: defaultCurrentPage,
            rowsPerPage: defaultRowsPerPage,
          },
          searchTerm: '',
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_PAGINATION', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(filtersInitialState, {
        type: Types.SET_PAGINATION,
        currentPage: 1,
        rowsPerPage: 10,
      });
      const expectedState = {
        filters: {
          domainType: defaultDomainType,
          city: null,
          pagination: { currentPage: 1, rowsPerPage: 10 },
          searchTerm: '',
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer SET_SEARCH_TERM', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(filtersInitialState, {
        type: Types.SET_SEARCH_TERM,
        searchTerm: 'test',
      });
      const expectedState = {
        filters: {
          domainType: defaultDomainType,
          city: null,
          searchTerm: 'test',
          pagination: {
            currentPage: defaultCurrentPage,
            rowsPerPage: defaultRowsPerPage,
          },
        },
      };
      expect(receivedState).toMatchObject(expectedState);
    });
  });
  describe('reducer SET_SELECTED_CITY', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(filtersInitialState, {
        type: Types.SET_SELECTED_CITY,
        city: 'Istanbul',
      });
      const expectedState = {
        filters: {
          domainType: defaultDomainType,
          searchTerm: '',
          city: 'Istanbul',
          pagination: {
            currentPage: defaultCurrentPage,
            rowsPerPage: defaultRowsPerPage,
          },
        },
      };
      expect(receivedState).toMatchObject(expectedState);
    });
  });
});
