import { Creators, Types } from '@app/pages/ABTestV2/List/redux/actions';

describe('AB Test V2 List Redux Action Testing', () => {
  describe('action-creator #getABTestsRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getABTestsRequest();
      const expectedAction = { type: Types.GET_AB_TESTS_REQUEST, requestData: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getABTestsSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getABTestsSuccess();
      const expectedAction = {
        type: Types.GET_AB_TESTS_SUCCESS,
        data: null,
        count: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getABTestsFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getABTestsFailure();
      const expectedAction = { type: Types.GET_AB_TESTS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setFilters', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.setFilters();
      const expectedAction = {
        type: Types.SET_FILTERS,
        requestData: {},
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
