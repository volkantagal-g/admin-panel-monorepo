/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Badge/List/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Badge/List/redux/actions';

describe('MarketProduct/Badge/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_BADGES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BADGES_REQUEST });
      const expectedState = {
        getBadges: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BADGES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BADGES_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        getBadges: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BADGES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BADGES_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getBadges: {
          isPending: false,
          data: [],
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_BADGES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_BADGES_REQUEST, badgeId: '123' });
      const expectedState = {
        getMarketProductBadges: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_BADGES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_BADGES_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        getMarketProductBadges: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_MARKET_PRODUCT_BADGES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_MARKET_PRODUCT_BADGES_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getMarketProductBadges: {
          isPending: false,
          data: [],
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST });
      const expectedState = {
        updateMarketProductBadgesBulk: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_BADGES_BULK_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_SUCCESS, data: { badgeId: '123' } });
      const expectedState = {
        updateMarketProductBadgesBulk: {
          isPending: false,
          error: null,
          data: { badgeId: '123' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_MARKET_PRODUCT_BADGES_BULK_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        updateMarketProductBadgesBulk: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_SELECTED_BADGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_SELECTED_BADGE, badge: { name: 'Badge Name' } });
      const expectedState = { selectedBadge: { data: { name: 'Badge Name' } } };
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
