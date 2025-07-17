import { sampleSmsRequest } from '@app/pages/Sms/index.mock.data';

import { Creators, Types } from '@app/pages/Sms/New/redux/actions';

describe('Sms/New', () => {
  describe('action-creator #smsSave ', () => {
    describe('#smsSaveRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.smsSaveRequest();
        const expectedAction = { type: Types.SMS_SAVE_REQUEST, body: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.smsSaveRequest({ body: sampleSmsRequest });
        const expectedAction = { type: Types.SMS_SAVE_REQUEST, body: sampleSmsRequest };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.smsSaveRequest({ body: sampleSmsRequest, wrongArg: '1' });
        const expectedAction = { type: Types.SMS_SAVE_REQUEST, body: sampleSmsRequest };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#smsSaveSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.smsSaveSuccess();
        const expectedAction = { type: Types.SMS_SAVE_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.smsSaveSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.SMS_SAVE_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#smsSaveFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.smsSaveFailure();
        const expectedAction = { type: Types.SMS_SAVE_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.smsSaveFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.SMS_SAVE_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.smsSaveFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.SMS_SAVE_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
});
