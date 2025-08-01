/* eslint-disable */
import reducer, { INITIAL_STATE } from '@app/pages/Brand/Detail/redux/reducer';
import { Types } from '@app/pages/Brand/Detail/redux/actions';

describe('Brand/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_BRAND_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BRAND_REQUEST });
      const expectedState = {
        getBrand: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BRAND_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BRAND_SUCCESS, data: { id: '123' } });
      const expectedState = {
        getBrand: {
          isPending: false,
          data: { id: '123' },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_BRAND_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_BRAND_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        getBrand: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BRAND_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BRAND_REQUEST });
      const expectedState = {
        updateBrand: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BRAND_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BRAND_SUCCESS });
      const expectedState = {
        updateBrand: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_BRAND_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_BRAND_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        updateBrand: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ACTIVATE_BRAND_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ACTIVATE_BRAND_REQUEST });
      const expectedState = {
        activateBrand: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ACTIVATE_BRAND_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ACTIVATE_BRAND_SUCCESS });
      const expectedState = {
        activateBrand: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ACTIVATE_BRAND_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ACTIVATE_BRAND_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        activateBrand: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_BRAND_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_BRAND_REQUEST });
      const expectedState = {
        deactivateBrand: {
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_BRAND_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_BRAND_SUCCESS });
      const expectedState = {
        deactivateBrand: {
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DEACTIVATE_BRAND_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DEACTIVATE_BRAND_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        deactivateBrand: {
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
