import { sampleGenericPopupResponse } from '@app/pages/Popup/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Popup/New/redux/reducer';
import { Types } from '@app/pages/Popup/New/redux/actions';

describe('Popup/New', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer CREATE_POPUP', () => {
    describe('#CREATE_POPUP_REQUEST', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.CREATE_POPUP_REQUEST });
        const expectedState = {
          popup: {
            isPending: true,
            error: null,
            data: {},
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#CREATE_POPUP_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.CREATE_POPUP_SUCCESS, data: sampleGenericPopupResponse });
        const expectedState = {
          popup: {
            isPending: false,
            data: sampleGenericPopupResponse,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#CREATE_POPUP_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.CREATE_POPUP_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          popup: {
            data: {},
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });
});
