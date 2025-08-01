/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from '@app/pages/Brand/New/redux/reducer';
import { Types } from '@app/pages/Brand/New/redux/actions';

describe('Brand/New', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer CREATE_BRAND_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_BRAND_REQUEST });
      const expectedState = {
        createBrand: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_BRAND_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_BRAND_SUCCESS, data: { name: 'Brand Name' } });
      const expectedState = {
        createBrand: {
          isPending: false,
          data: { name: 'Brand Name' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_BRAND_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_BRAND_FAILURE, error: new Error('Error Occurred') });
      const expectedState = {
        createBrand: {
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
