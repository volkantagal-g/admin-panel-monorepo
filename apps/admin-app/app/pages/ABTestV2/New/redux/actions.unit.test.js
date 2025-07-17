import {
  Creators,
  Types,
} from '@app/pages/ABTestV2/New/redux/actions';

describe('AB Test V2 New Redux Action Testing', () => {
  describe('action-creator #createABTestRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createABTestRequest();
      const expectedAction = { type: Types.CREATE_AB_TEST_REQUEST, requestData: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #createABTestSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createABTestSuccess();
      const expectedAction = {
        type: Types.CREATE_AB_TEST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createABTestFailure', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createABTestFailure();
      const expectedAction = { type: Types.CREATE_AB_TEST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTestTypeListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTestTypeListRequest();
      const expectedAction = { type: Types.GET_TEST_TYPE_LIST_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getTestTypeListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTestTypeListSuccess();
      const expectedAction = {
        type: Types.GET_TEST_TYPE_LIST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTestTypeListFailure', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getTestTypeListFailure();
      const expectedAction = { type: Types.GET_TEST_TYPE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getClientListTemplatesRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getClientListTemplatesRequest();
      const expectedAction = {
        type: Types.GET_CLIENT_LIST_TEMPLATES_REQUEST,
        name: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getClientListTemplatesSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getClientListTemplatesSuccess();
      const expectedAction = {
        type: Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getClientListTemplatesFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getClientListTemplatesFailure();
      const expectedAction = {
        type: Types.GET_CLIENT_LIST_TEMPLATES_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
