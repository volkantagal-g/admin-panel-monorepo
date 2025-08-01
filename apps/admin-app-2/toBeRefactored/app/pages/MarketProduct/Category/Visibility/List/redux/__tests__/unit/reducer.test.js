/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Category/Visibility/List/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Category/Visibility/List/redux/actions';

describe('MarketProduct/Category/Visibility/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST });
      const expectedState = {
        getMarketProductCategoryAvailableTimes: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        getMarketProductCategoryAvailableTimes: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, {
        type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        getMarketProductCategoryAvailableTimes: {
          isPending: false,
          data: [],
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST });
      const expectedState = {
        deactivateMarketProductCategoryAvailableTime: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS });
      const expectedState = {
        deactivateMarketProductCategoryAvailableTime: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, {
        type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE,
        error: new Error('404 Not Found'),
      });
      const expectedState = {
        deactivateMarketProductCategoryAvailableTime: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_FILTERS', () => {
    it('receivedState should equal to expectedState', () => {
      const filters = {
        city: '123',
        warehouse: '123',
        domainType: 1,
      };
      const receivedState = reducer({}, { type: Types.SET_FILTERS, data: filters });
      const expectedState = { setFilters: { data: filters } };
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
