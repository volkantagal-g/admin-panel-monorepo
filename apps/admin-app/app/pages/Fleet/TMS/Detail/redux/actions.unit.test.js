import { Creators, Types } from '@app/pages/Fleet/TMS/Detail/redux/actions';

describe('Fleet/TMS/Detail', () => {
  describe('action-creator #getTmsVehicleRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTmsVehicleRequest({});
      const expectedAction = { type: Types.GET_TMS_VEHICLE_REQUEST, vehicleId: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTmsVehicleSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTmsVehicleSuccess({});
      const expectedAction = { type: Types.GET_TMS_VEHICLE_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTmsVehicleFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTmsVehicleFailure({});
      const expectedAction = { type: Types.GET_TMS_VEHICLE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateTmsVehicleRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateTmsVehicleRequest({});
      const expectedAction = { type: Types.UPDATE_TMS_VEHICLE_REQUEST, vehicleId: '', formValues: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateTmsVehicleSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateTmsVehicleSuccess({});
      const expectedAction = { type: Types.UPDATE_TMS_VEHICLE_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateTmsVehicleFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateTmsVehicleFailure({});
      const expectedAction = { type: Types.UPDATE_TMS_VEHICLE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
