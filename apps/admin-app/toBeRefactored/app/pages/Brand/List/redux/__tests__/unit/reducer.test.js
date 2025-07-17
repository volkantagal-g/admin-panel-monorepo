/* eslint-disable */
import reducer, { INITIAL_STATE } from '@app/pages/Brand/List/redux/reducer';
import { Types } from '@app/pages/Brand/List/redux/actions';
import { brandStatuses } from '@app/shared/constantValues';

describe('Brand/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_BRANDS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BRANDS_REQUEST });
      const expectedState = {
        brands: {
          isPending: true,
          data: [],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BRANDS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BRANDS_SUCCESS, data: [{ id: '123' }] });
      const expectedState = {
        brands: {
          isPending: false,
          data: [{ id: '123' }],
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BRANDS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BRANDS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        brands: {
          isPending: false,
          data: [],
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BRANDS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const selectedStatuses = Object.keys(brandStatuses);
      const receivedState = reducer({}, { type: Types.SET_FILTER_OPTIONS, selectedStatuses });
      const expectedState = { filters: { selectedStatuses } };
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
