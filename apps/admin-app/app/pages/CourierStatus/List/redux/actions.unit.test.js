// import { Creators, Types } from '@app/pages/CourierFeedback/List/redux/actions';
import { Creators, Types } from '@app/pages/CourierStatus/List/redux/actions';

describe('CourierStatusAndBusy/List', () => {
  describe('action-creator #filterCourierRequest', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.filterCourierRequest({});
      const expectedAction = {
        type: Types.FILTER_COURIER_REQUEST,
        domains: [],
        status: null,
        warehouse: null,
        reason: null,
        timeSpent: null,
        currentPage: 1,
        rowsPerPage: 10,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterCourierSuccess', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.filterCourierSuccess({});
      const expectedAction = { type: Types.FILTER_COURIER_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #filterCourierFailure', () => {
    it('receivedAction should equal to expectedAction (withoutArgs)', () => {
      const receivedAction = Creators.filterCourierFailure({});
      const expectedAction = { type: Types.FILTER_COURIER_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
