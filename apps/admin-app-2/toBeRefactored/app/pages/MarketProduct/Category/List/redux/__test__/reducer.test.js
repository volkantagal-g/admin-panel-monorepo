/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Category/List/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Category/List/redux/actions';

describe('MarketProduct/Category/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORIES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST });
      const expectedState = {
        getMarketProductCategories: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORIES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        getMarketProductCategories: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_CATEGORIES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProductCategories: {
          isPending: false,
          data: [],
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST });
      const expectedState = {
        getMarketProductSubCategories: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        getMarketProductSubCategories: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProductSubCategories: {
          isPending: false,
          data: [],
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
