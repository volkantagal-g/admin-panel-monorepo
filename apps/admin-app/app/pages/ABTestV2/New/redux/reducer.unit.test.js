import reducer, { INITIAL_STATE } from '@app/pages/ABTestV2/New/redux/reducer';
import { Types } from '@app/pages/ABTestV2/New/redux/actions';

describe('AB Test V2 New Redux Reducer Testing', () => {
  it('should equal to initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #createABTestRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_AB_TEST_REQUEST });
      const expectedState = { createABTest: { isPending: true } };
      expect(receivedState.createABTest.isPending).toEqual(
        expectedState.createABTest.isPending,
      );
    });
  });

  describe('reducer #createABTestSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_AB_TEST_SUCCESS });
      const expectedState = {
        createABTest: {
          data: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.createABTest).toEqual(expectedState.createABTest);
    });
  });

  describe('reducer #createABTestFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_AB_TEST_FAILURE });
      const expectedState = { createABTest: { error: undefined, isPending: false } };
      expect(receivedState.createABTest.error).toEqual(expectedState.createABTest.error);
      expect(receivedState.createABTest.isPending).toEqual(expectedState.createABTest.isPending);
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
});
