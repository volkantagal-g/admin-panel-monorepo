import { sampleGenericEmailResponse } from '@app/pages/Email/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Email/New/redux/reducer';
import { Types } from '@app/pages/Email/New/redux/actions';

describe('Email/New', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer EMAIL_SAVE', () => {
    describe('#EMAIL_SAVE_REQUEST', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.EMAIL_SAVE_REQUEST });
        const expectedState = { email: { isPending: true } };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#EMAIL_SAVE_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EMAIL_SAVE_SUCCESS, data: sampleGenericEmailResponse });
        const expectedState = {
          email: {
            isPending: false,
            data: sampleGenericEmailResponse,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#EMAIL_SAVE_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EMAIL_SAVE_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          email: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });
});
