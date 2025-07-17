import { sampleGenericPopupRequest, SAMPLE_POPUP_ID } from '@app/pages/Popup/index.mock.data';

import { Creators, Types } from '@app/pages/Popup/Detail/redux/actions';

describe('Popup/Detail', () => {
  describe('action-creator #getBrandRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPopupRequest();
      const expectedAction = { type: Types.GET_POPUP_REQUEST, popupId: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getPopupRequest({ popupId: SAMPLE_POPUP_ID });
      const expectedAction = { type: Types.GET_POPUP_REQUEST, popupId: SAMPLE_POPUP_ID };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getPopupRequest({ popupId: SAMPLE_POPUP_ID, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_POPUP_REQUEST, popupId: SAMPLE_POPUP_ID };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPopupSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPopupSuccess();
      const expectedAction = { type: Types.GET_POPUP_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getPopupSuccess({ data: sampleGenericPopupRequest });
      const expectedAction = { type: Types.GET_POPUP_SUCCESS, data: sampleGenericPopupRequest };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getPopupSuccess({ data: sampleGenericPopupRequest, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_POPUP_SUCCESS, data: sampleGenericPopupRequest };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPopupFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPopupFailure();
      const expectedAction = { type: Types.GET_POPUP_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getPopupFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_POPUP_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getPopupFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_POPUP_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePopupRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePopupRequest();
      const expectedAction = { type: Types.UPDATE_POPUP_REQUEST, popupId: null, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updatePopupRequest({ popupId: SAMPLE_POPUP_ID, data: sampleGenericPopupRequest });
      const expectedAction = { type: Types.UPDATE_POPUP_REQUEST, popupId: SAMPLE_POPUP_ID, data: sampleGenericPopupRequest };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updatePopupRequest({
        popupId: SAMPLE_POPUP_ID,
        data: sampleGenericPopupRequest,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_POPUP_REQUEST, popupId: SAMPLE_POPUP_ID, data: sampleGenericPopupRequest };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePopupSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePopupSuccess();
      const expectedAction = { type: Types.UPDATE_POPUP_SUCCESS, popupDetail: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updatePopupSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_POPUP_SUCCESS, popupDetail: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBrandFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePopupFailure();
      const expectedAction = { type: Types.UPDATE_POPUP_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updatePopupFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_POPUP_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updatePopupFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_POPUP_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.initPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.destroyPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
