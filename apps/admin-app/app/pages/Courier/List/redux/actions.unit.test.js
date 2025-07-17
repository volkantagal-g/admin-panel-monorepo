import { Types, Creators } from '@app/pages/Courier/List/redux/actions';

describe('Courier/List', () => {
  describe('action-creator #getCourierListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierListRequest({});
      const expectedAction = {
        type: Types.GET_COURIER_LIST_REQUEST,
        filters: {
          name: undefined,
          isActive: undefined,
          status: undefined,
          isLoggedIn: undefined,
        },
        pagination: { currentPage: 1, rowsPerPage: 10 },
      };

      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierListSuccess({});
      const expectedAction = {
        type: Types.GET_COURIER_LIST_SUCCESS,
        data: [],
        totalCount: 0,
      };

      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierListFailure({});
      const expectedAction = {
        type: Types.GET_COURIER_LIST_FAILURE,
        error: null,
      };

      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
