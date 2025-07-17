import { Creators, Types } from '@app/pages/Fleet/TmsDriver/List/redux/actions';

describe('Fleet/TmsDriver/List', () => {
  describe('action-creator #filterTmsDriversRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.filterTmsDriversRequest({});
      const expectedAction = { type: Types.FILTER_TMS_DRIVERS_REQUEST, currentPage: 1, rowsPerPage: 10, filters: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterTmsDriversSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.filterTmsDriversSuccess({});
      const expectedAction = { type: Types.FILTER_TMS_DRIVERS_SUCCESS, data: [], totalCount: 0 };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterTmsDriversFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.filterTmsDriversFailure({});
      const expectedAction = { type: Types.FILTER_TMS_DRIVERS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
