/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/actions';

describe('MarketProduct/Category/Visibility/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST });
      const expectedState = {
        getMarketProductCategoryAvailableTime: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: { id: '123' } });
      const expectedState = {
        getMarketProductCategoryAvailableTime: {
          isPending: false,
          data: { id: '123' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, {
        type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        getMarketProductCategoryAvailableTime: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST });
      const expectedState = {
        updateMarketProductCategoryAvailableTime: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS });
      const expectedState = {
        updateMarketProductCategoryAvailableTime: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        updateMarketProductCategoryAvailableTime: {
          isPending: false,
          error: new Error('404 Not Found'),
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
