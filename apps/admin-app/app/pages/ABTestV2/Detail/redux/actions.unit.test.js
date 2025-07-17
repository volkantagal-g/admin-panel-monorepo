import { Creators, Types } from '@app/pages/ABTestV2/Detail/redux/actions';

describe('AB Test V2 Detail Redux Action Testing', () => {
  describe('action-creator #getTestRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getTestRequest();
      const expectedAction = { type: Types.GET_TEST_REQUEST, testId: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getTestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getTestSuccess();
      const expectedAction = {
        type: Types.GET_TEST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getTestFailure();
      const expectedAction = { type: Types.GET_TEST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getClientListTemplatesRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getClientListTemplatesRequest();
      const expectedAction = {
        type: Types.GET_CLIENT_LIST_TEMPLATES_REQUEST,
        requestData: {},
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

  describe('action-creator #updateABTestRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateABTestRequest();
      const expectedAction = {
        type: Types.UPDATE_AB_TEST_REQUEST,
        requestData: {},
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateABTestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateABTestSuccess();
      const expectedAction = {
        type: Types.UPDATE_AB_TEST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateABTestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateABTestFailure();
      const expectedAction = {
        type: Types.UPDATE_AB_TEST_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #startABTestRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.startABTestRequest();
      const expectedAction = {
        type: Types.START_AB_TEST_REQUEST,
        testId: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #startABTestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.startABTestSuccess();
      const expectedAction = {
        type: Types.START_AB_TEST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #startABTestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.startABTestFailure();
      const expectedAction = {
        type: Types.START_AB_TEST_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #stopABTestRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.stopABTestRequest();
      const expectedAction = {
        type: Types.STOP_AB_TEST_REQUEST,
        testId: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #stopABTestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.stopABTestSuccess();
      const expectedAction = {
        type: Types.STOP_AB_TEST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #stopABTestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.stopABTestFailure();
      const expectedAction = {
        type: Types.STOP_AB_TEST_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #completeABTestRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.completeABTestRequest();
      const expectedAction = {
        type: Types.COMPLETE_AB_TEST_REQUEST,
        requestData: {},
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #completeABTestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.completeABTestSuccess();
      const expectedAction = {
        type: Types.COMPLETE_AB_TEST_SUCCESS,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #completeABTestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.completeABTestFailure();
      const expectedAction = {
        type: Types.COMPLETE_AB_TEST_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
