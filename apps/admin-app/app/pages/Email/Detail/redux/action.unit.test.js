import { sampleGenericEmailRequest, SAMPLE_EMAIL_ID } from '@app/pages/Email/index.mock.data';

import { Creators, Types } from '@app/pages/Email/Detail/redux/actions';

describe('Email/Detail', () => {
  describe('action-creator #getEmailRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getEmailRequest();
      const expectedAction = { type: Types.GET_EMAIL_REQUEST, emailId: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getEmailRequest({ emailId: SAMPLE_EMAIL_ID });
      const expectedAction = { type: Types.GET_EMAIL_REQUEST, emailId: SAMPLE_EMAIL_ID };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getEmailRequest({ emailId: SAMPLE_EMAIL_ID, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_EMAIL_REQUEST, emailId: SAMPLE_EMAIL_ID };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getEmailSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getEmailSuccess();
      const expectedAction = { type: Types.GET_EMAIL_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getEmailSuccess({ data: sampleGenericEmailRequest });
      const expectedAction = { type: Types.GET_EMAIL_SUCCESS, data: sampleGenericEmailRequest };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getEmailSuccess({ data: sampleGenericEmailRequest, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_EMAIL_SUCCESS, data: sampleGenericEmailRequest };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getEmailFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getEmailFailure();
      const expectedAction = { type: Types.GET_EMAIL_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getEmailFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_EMAIL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getEmailFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_EMAIL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateEmailRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateEmailRequest();
      const expectedAction = { type: Types.UPDATE_EMAIL_REQUEST, id: null, body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateEmailRequest({ id: SAMPLE_EMAIL_ID, body: sampleGenericEmailRequest });
      const expectedAction = { type: Types.UPDATE_EMAIL_REQUEST, id: SAMPLE_EMAIL_ID, body: sampleGenericEmailRequest };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateEmailRequest({
        id: SAMPLE_EMAIL_ID,
        data: sampleGenericEmailRequest,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_EMAIL_REQUEST, id: SAMPLE_EMAIL_ID, body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateEmailSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateEmailSuccess();
      const expectedAction = { type: Types.UPDATE_EMAIL_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateEmailSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_EMAIL_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateEmailFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateEmailFailure();
      const expectedAction = { type: Types.UPDATE_EMAIL_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateEmailFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_EMAIL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateEmailFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_EMAIL_FAILURE, error: new Error('404 Not Found') };
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
