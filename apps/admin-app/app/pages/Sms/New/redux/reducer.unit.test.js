import { sampleGenericSmsResponse } from '@app/pages/Sms/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Sms/New/redux/reducer';
import { Types } from '@app/pages/Sms/New/redux/actions';

describe('Sms/New', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer SMS_SAVE', () => {
    describe('#SMS_SAVE_REQUEST', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.SMS_SAVE_REQUEST });
        const expectedState = { sms: { isPending: true } };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#SMS_SAVE_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.SMS_SAVE_SUCCESS, data: sampleGenericSmsResponse });
        const expectedState = {
          sms: {
            isPending: false,
            data: sampleGenericSmsResponse,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#SMS_SAVE_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.SMS_SAVE_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          sms: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });
});
