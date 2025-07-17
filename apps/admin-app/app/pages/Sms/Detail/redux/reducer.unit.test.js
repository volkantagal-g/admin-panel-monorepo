import { sampleGenericSmsRequest } from '@app/pages/Sms/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Sms/Detail/redux/reducer';
import { Types } from '@app/pages/Sms/Detail/redux/actions';

describe('Sms/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_SMS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_SMS_REQUEST });
      const expectedState = {
        smsDetail: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_SMS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_SMS_SUCCESS, data: sampleGenericSmsRequest });
      const expectedState = {
        smsDetail: {
          isPending: false,
          data: sampleGenericSmsRequest,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_SMS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_SMS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        smsDetail: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_SMS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_SMS_REQUEST });
      const expectedState = { smsDetail: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_SMS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_SMS_SUCCESS, data: sampleGenericSmsRequest });
      const expectedState = {
        smsDetail: {
          isPending: false,
          data: sampleGenericSmsRequest,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_SMS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_SMS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        smsDetail: {
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
