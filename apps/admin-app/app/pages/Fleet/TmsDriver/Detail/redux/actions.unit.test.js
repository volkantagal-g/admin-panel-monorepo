import { Creators, Types } from '@app/pages/Fleet/TmsDriver/Detail/redux/actions';

describe('Fleet/TmsDriver/Detail', () => {
  describe('action-creator #getTmsDriverRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTmsDriverRequest({});
      const expectedAction = { type: Types.GET_TMS_DRIVER_REQUEST, id: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTmsDriverSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTmsDriverSuccess({});
      const expectedAction = { type: Types.GET_TMS_DRIVER_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTmsDriverFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTmsDriverFailure({});
      const expectedAction = { type: Types.GET_TMS_DRIVER_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
