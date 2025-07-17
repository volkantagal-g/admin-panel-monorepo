import { sampleEmailRequest } from '@app/pages/Email/index.mock.data';

import { Creators, Types } from '@app/pages/Email/New/redux/actions';

describe('Email/New', () => {
  describe('action-creator #emailSave ', () => {
    describe('#emailSaveRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.emailSaveRequest();
        const expectedAction = { type: Types.EMAIL_SAVE_REQUEST, body: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.emailSaveRequest({ body: sampleEmailRequest });
        const expectedAction = { type: Types.EMAIL_SAVE_REQUEST, body: sampleEmailRequest };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.emailSaveRequest({ body: sampleEmailRequest, wrongArg: '1' });
        const expectedAction = { type: Types.EMAIL_SAVE_REQUEST, body: sampleEmailRequest };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#emailSaveSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.emailSaveSuccess();
        const expectedAction = { type: Types.EMAIL_SAVE_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.emailSaveSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.EMAIL_SAVE_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#emailSaveFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.emailSaveFailure();
        const expectedAction = { type: Types.EMAIL_SAVE_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.emailSaveFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.EMAIL_SAVE_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.emailSaveFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.EMAIL_SAVE_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
});
