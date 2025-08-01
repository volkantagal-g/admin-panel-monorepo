/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketOrder/OrderDetail/redux/reducers';
import { Types } from '@app/pages/MarketOrder/OrderDetail/redux/actions';
import {
  mockedCancelError,
  mockedCancelOptions,
  mockedCancelSuccess,
  mockedWholeRefundError,
  mockedWholeRefundReasonsError,
  mockedWholeRefundReasonsSuccess,
  mockedWholeRefundSuccess,
} from '@shared/api/customer/index.mock.data';
import { warnDiscountAmountConfig } from '@shared/api/marketConfig/index.mock.data';

describe('MarketOrder/OrderDetail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_DISCOUNT_WARN_CONFIG_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_DISCOUNT_WARN_CONFIG_REQUEST });
      const expectedState = {
        discountWarnAmounts: {
          isPending: true,
          data: null,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_DISCOUNT_WARN_CONFIG_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_DISCOUNT_WARN_CONFIG_SUCCESS, data: warnDiscountAmountConfig });
      const expectedState = {
        discountWarnAmounts: {
          isPending: false,
          data: warnDiscountAmountConfig,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_CANCEL_OPTIONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ORDER_CANCEL_OPTIONS_REQUEST });
      const expectedState = {
        cancelOptions: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_CANCEL_OPTIONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ORDER_CANCEL_OPTIONS_SUCCESS, data: mockedCancelOptions });
      const expectedState = {
        cancelOptions: {
          isPending: false,
          data: mockedCancelOptions,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_CANCEL_OPTIONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ORDER_CANCEL_OPTIONS_FAILURE, error: mockedCancelError });
      const expectedState = {
        cancelOptions: {
          isPending: false,
          data: [],
          error: mockedCancelError,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CANCEL_ORDER_CUSTOMER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CANCEL_ORDER_CUSTOMER_REQUEST });
      const expectedState = {
        cancelOrderCustomer: {
          isPending: true,
          data: null,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CANCEL_ORDER_CUSTOMER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CANCEL_ORDER_CUSTOMER_SUCCESS, data: mockedCancelSuccess });
      const expectedState = {
        cancelOrderCustomer: {
          isPending: false,
          data: mockedCancelSuccess,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CANCEL_ORDER_CUSTOMER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CANCEL_ORDER_CUSTOMER_FAILURE, error: mockedCancelError });
      const expectedState = {
        cancelOrderCustomer: {
          isPending: false,
          data: null,
          error: mockedCancelError,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_WHOLE_REFUND_REASONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WHOLE_REFUND_REASONS_REQUEST });
      const expectedState = {
        wholeRefundReasons: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_WHOLE_REFUND_REASONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WHOLE_REFUND_REASONS_SUCCESS, data: mockedWholeRefundReasonsSuccess });
      const expectedState = {
        wholeRefundReasons: {
          isPending: false,
          data: mockedWholeRefundReasonsSuccess,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_WHOLE_REFUND_REASONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WHOLE_REFUND_REASONS_FAILURE, error: mockedWholeRefundReasonsError });
      const expectedState = {
        wholeRefundReasons: {
          isPending: false,
          data: [],
          error: mockedWholeRefundReasonsError,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer WHOLE_REFUND_ORDER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.WHOLE_REFUND_ORDER_REQUEST });
      const expectedState = {
        wholeRefundOrder: {
          isPending: true,
          data: null,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer WHOLE_REFUND_ORDER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.WHOLE_REFUND_ORDER_SUCCESS, data: mockedWholeRefundSuccess });
      const expectedState = {
        wholeRefundOrder: {
          isPending: false,
          data: mockedWholeRefundSuccess,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer WHOLE_REFUND_ORDER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.WHOLE_REFUND_ORDER_FAILURE, error: mockedWholeRefundReasonsError });
      const expectedState = {
        wholeRefundOrder: {
          isPending: false,
          data: null,
          error: mockedWholeRefundError,
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
