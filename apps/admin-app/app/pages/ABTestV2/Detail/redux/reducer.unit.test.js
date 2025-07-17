import reducer, { INITIAL_STATE } from '@app/pages/ABTestV2/Detail/redux/reducer';
import { Types } from '@app/pages/ABTestV2/Detail/redux/actions';

describe('AB Test V2 Detail Redux Reducer Testing', () => {
  it('should equal to initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #getTestRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_TEST_REQUEST });
      const expectedState = { getTest: { isPending: true } };
      expect(receivedState.getTest.isPending).toEqual(
        expectedState.getTest.isPending,
      );
    });
  });

  describe('reducer #getTestSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_TEST_SUCCESS });
      const expectedState = {
        getTest: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.getTest).toEqual(expectedState.getTest);
    });
  });

  describe('reducer #getTestFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_TEST_FAILURE });
      const expectedState = { getTest: { error: undefined } };
      expect(receivedState.getTest.error).toEqual(expectedState.getTest.error);
    });
  });

  describe('reducer #getClientListTemplatesRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_LIST_TEMPLATES_REQUEST },
      );
      const expectedState = { getClientListTemplates: { isPending: true } };
      expect(receivedState.getClientListTemplates.isPending).toEqual(
        expectedState.getClientListTemplates.isPending,
      );
    });
  });

  describe('reducer #getClientListTemplatesSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS },
      );
      const expectedState = {
        getClientListTemplates: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.getClientListTemplates).toEqual(
        expectedState.getClientListTemplates,
      );
    });
  });

  describe('reducer #getClientListTemplatesFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_LIST_TEMPLATES_FAILURE },
      );
      const expectedState = { getClientListTemplates: { error: undefined } };
      expect(receivedState.getClientListTemplates.error).toEqual(
        expectedState.getClientListTemplates.error,
      );
    });
  });

  describe('reducer #updateABTestRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_AB_TEST_REQUEST });
      const expectedState = { updateABTest: { isPending: true } };
      expect(receivedState.updateABTest.isPending).toEqual(
        expectedState.updateABTest.isPending,
      );
    });
  });

  describe('reducer #updateABTestSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_AB_TEST_SUCCESS });
      const expectedState = {
        updateABTest: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.updateABTest).toEqual(expectedState.updateABTest);
    });
  });

  describe('reducer #updateABTestFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_AB_TEST_FAILURE });
      const expectedState = { updateABTest: { error: undefined } };
      expect(receivedState.updateABTest.error).toEqual(expectedState.updateABTest.error);
    });
  });

  describe('reducer #startABTestRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.START_AB_TEST_REQUEST });
      const expectedState = { startTest: { isPending: true } };
      expect(receivedState.startTest.isPending).toEqual(
        expectedState.startTest.isPending,
      );
    });
  });

  describe('reducer #startABTestSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.START_AB_TEST_SUCCESS });
      const expectedState = {
        startTest: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.startTest).toEqual(expectedState.startTest);
    });
  });

  describe('reducer #startABTestFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.START_AB_TEST_FAILURE });
      const expectedState = { startTest: { error: undefined } };
      expect(receivedState.startTest.error).toEqual(expectedState.startTest.error);
    });
  });

  describe('reducer #stopABTestRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.STOP_AB_TEST_REQUEST });
      const expectedState = { stopTest: { isPending: true } };
      expect(receivedState.stopTest.isPending).toEqual(
        expectedState.stopTest.isPending,
      );
    });
  });

  describe('reducer #stopABTestSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.STOP_AB_TEST_SUCCESS });
      const expectedState = {
        stopTest: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.stopTest).toEqual(expectedState.stopTest);
    });
  });

  describe('reducer #stopABTestFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.STOP_AB_TEST_FAILURE });
      const expectedState = { stopTest: { error: undefined } };
      expect(receivedState.stopTest.error).toEqual(expectedState.stopTest.error);
    });
  });

  describe('reducer #completeABTestRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.COMPLETE_AB_TEST_REQUEST });
      const expectedState = { completeTest: { isPending: true } };
      expect(receivedState.completeTest.isPending).toEqual(
        expectedState.completeTest.isPending,
      );
    });
  });

  describe('reducer #completeABTestSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.COMPLETE_AB_TEST_SUCCESS });
      const expectedState = {
        completeTest: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.completeTest).toEqual(expectedState.completeTest);
    });
  });

  describe('reducer #completeABTestFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.COMPLETE_AB_TEST_FAILURE });
      const expectedState = { completeTest: { error: undefined } };
      expect(receivedState.completeTest.error).toEqual(expectedState.completeTest.error);
    });
  });
});
