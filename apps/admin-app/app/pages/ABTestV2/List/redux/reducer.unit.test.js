import reducer, { INITIAL_STATE } from '@app/pages/ABTestV2/List/redux/reducer';
import { Types } from '@app/pages/ABTestV2/List/redux/actions';

describe('AB Test V2 List Redux Reducer Testing', () => {
  it('should equal to initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #getABTestsRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_AB_TESTS_REQUEST });
      const expectedState = { getABTests: { isPending: true } };
      expect(receivedState.getABTests.isPending).toEqual(
        expectedState.getABTests.isPending,
      );
    });
  });

  describe('reducer #getABTestsSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_AB_TESTS_SUCCESS });
      const expectedState = {
        getABTests: {
          data: undefined,
          count: undefined,
          error: null,
          isPending: false,
        },
      };
      expect(receivedState.getABTests).toEqual(expectedState.getABTests);
    });
  });

  describe('reducer #getABTestsFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_AB_TESTS_FAILURE });
      const expectedState = { getABTests: { error: undefined } };
      expect(receivedState.getABTests.error).toEqual(expectedState.getABTests.error);
    });
  });

  describe('reducer #setFilters', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.SET_FILTERS },
      );
      const expectedState = { filters: {} };
      expect(receivedState.filters).toEqual(
        expectedState.filters,
      );
    });
  });
});
