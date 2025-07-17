import { sampleGenericPopupRequest } from '@app/pages/Popup/index.mock.data';

import reducer, { INITIAL_STATE } from '@app/pages/Popup/Detail/redux/reducer';
import { Types } from '@app/pages/Popup/Detail/redux/actions';

describe('Popup/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_POPUP_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_POPUP_REQUEST });
      const expectedState = {
        popupDetail: {
          isPending: true,
          data: {},
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_POPUP_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_POPUP_SUCCESS, data: sampleGenericPopupRequest });
      const expectedState = {
        popupDetail: {
          isPending: false,
          data: sampleGenericPopupRequest,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_POPUP_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_POPUP_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        popupDetail: {
          isPending: false,
          data: {},
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_POPUP_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_POPUP_REQUEST });
      const expectedState = { popupDetail: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_POPUP_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_POPUP_SUCCESS, popupDetail: sampleGenericPopupRequest });
      const expectedState = {
        popupDetail: {
          isPending: false,
          data: sampleGenericPopupRequest,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_POPUP_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_POPUP_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        popupDetail: {
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
