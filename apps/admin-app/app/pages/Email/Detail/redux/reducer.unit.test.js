import { sampleGenericEmailRequest } from '@app/pages/Email/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Email/Detail/redux/reducer';
import { Types } from '@app/pages/Email/Detail/redux/actions';

describe('Email/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_EMAIL_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_EMAIL_REQUEST });
      const expectedState = {
        emailDetail: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_EMAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_EMAIL_SUCCESS, data: sampleGenericEmailRequest });
      const expectedState = {
        emailDetail: {
          isPending: false,
          data: sampleGenericEmailRequest,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_EMAIL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_EMAIL_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        emailDetail: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_EMAIL_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_EMAIL_REQUEST });
      const expectedState = { emailDetail: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_EMAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_EMAIL_SUCCESS, data: sampleGenericEmailRequest });
      const expectedState = {
        emailDetail: {
          isPending: false,
          data: sampleGenericEmailRequest,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_EMAIL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_EMAIL_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        emailDetail: {
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
