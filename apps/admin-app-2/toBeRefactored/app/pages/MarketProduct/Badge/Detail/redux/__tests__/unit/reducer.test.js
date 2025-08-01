/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/MarketProduct/Badge/Detail/redux/reducer';
import { Types } from '@app/pages/MarketProduct/Badge/Detail/redux/actions';

describe('MarketProduct/Badge/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_BADGE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BADGE_REQUEST });
      const expectedState = {
        getBadge: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BADGE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BADGE_SUCCESS, data: { id: '123' } });
      const expectedState = {
        getBadge: {
          isPending: false,
          data: { id: '123' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BADGE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BADGE_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getBadge: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BADGE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BADGE_REQUEST });
      const expectedState = {
        updateBadge: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BADGE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BADGE_SUCCESS });
      const expectedState = {
        updateBadge: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BADGE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BADGE_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        updateBadge: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BADGE_IMAGE_URL_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BADGE_IMAGE_URL_REQUEST });
      const expectedState = {
        updateBadgeImageUrl: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BADGE_IMAGE_URL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BADGE_IMAGE_URL_SUCCESS });
      const expectedState = {
        updateBadgeImageUrl: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BADGE_IMAGE_URL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BADGE_IMAGE_URL_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        updateBadgeImageUrl: {
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
