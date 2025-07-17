import { samplePopupRequest } from '@app/pages/Popup/index.mock.data';

import { Creators, Types } from '@app/pages/Popup/New/redux/actions';

describe('Popup/New', () => {
  describe('action-creator #createPopup ', () => {
    describe('#createPopupRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.createPopupRequest();
        const expectedAction = { type: Types.CREATE_POPUP_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.createPopupRequest({ data: samplePopupRequest });
        const expectedAction = { type: Types.CREATE_POPUP_REQUEST, data: samplePopupRequest };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.createPopupRequest({ data: samplePopupRequest, wrongArg: '1' });
        const expectedAction = { type: Types.CREATE_POPUP_REQUEST, data: samplePopupRequest };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#createPopupSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.createPopupSuccess();
        const expectedAction = { type: Types.CREATE_POPUP_SUCCESS, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.createPopupSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.CREATE_POPUP_SUCCESS, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#createPopupFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.createPopupFailure();
        const expectedAction = { type: Types.CREATE_POPUP_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.createPopupFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.CREATE_POPUP_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.createPopupFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.CREATE_POPUP_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
});
