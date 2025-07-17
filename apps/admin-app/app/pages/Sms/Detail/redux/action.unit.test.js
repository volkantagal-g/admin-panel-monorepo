import { sampleGenericSmsRequest, SAMPLE_SMS_ID } from '@app/pages/Sms/index.mock.data';

import { Creators, Types } from '@app/pages/Sms/Detail/redux/actions';

describe('Sms/Detail', () => {
  describe('action-creator #getSmsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSmsRequest();
      const expectedAction = { type: Types.GET_SMS_REQUEST, smsId: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getSmsRequest({ smsId: SAMPLE_SMS_ID });
      const expectedAction = { type: Types.GET_SMS_REQUEST, smsId: SAMPLE_SMS_ID };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getSmsRequest({ smsId: SAMPLE_SMS_ID, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_SMS_REQUEST, smsId: SAMPLE_SMS_ID };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getSmsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSmsSuccess();
      const expectedAction = { type: Types.GET_SMS_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getSmsSuccess({ data: sampleGenericSmsRequest });
      const expectedAction = { type: Types.GET_SMS_SUCCESS, data: sampleGenericSmsRequest };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getSmsSuccess({ data: sampleGenericSmsRequest, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_SMS_SUCCESS, data: sampleGenericSmsRequest };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getSmsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSmsFailure();
      const expectedAction = { type: Types.GET_SMS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getSmsFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_SMS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getSmsFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_SMS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateSmsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateSmsRequest();
      const expectedAction = { type: Types.UPDATE_SMS_REQUEST, id: null, body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateSmsRequest({ id: SAMPLE_SMS_ID, body: sampleGenericSmsRequest });
      const expectedAction = { type: Types.UPDATE_SMS_REQUEST, id: SAMPLE_SMS_ID, body: sampleGenericSmsRequest };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateSmsRequest({
        id: SAMPLE_SMS_ID,
        data: sampleGenericSmsRequest,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_SMS_REQUEST, id: SAMPLE_SMS_ID, body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateSmsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateSmsSuccess();
      const expectedAction = { type: Types.UPDATE_SMS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateSmsSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_SMS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateSmsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateSmsFailure();
      const expectedAction = { type: Types.UPDATE_SMS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateSmsFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_SMS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateSmsFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_SMS_FAILURE, error: new Error('404 Not Found') };
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
