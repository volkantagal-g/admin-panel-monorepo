/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Category/Visibility/New/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Category/Visibility/New/redux/actions';

describe('MarketProduct/Category/Visibility/New', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST });
      const expectedState = {
        createMarketProductCategoryAvailableTime: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: { name: 'Name' } });
      const expectedState = {
        createMarketProductCategoryAvailableTime: {
          isPending: false,
          data: { name: 'Name' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, {
        type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE,
        error: new Error('Error Occurred'),
      });
      const expectedState = {
        createMarketProductCategoryAvailableTime: {
          isPending: false,
          data: {},
          error: new Error('Error Occurred'),
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
