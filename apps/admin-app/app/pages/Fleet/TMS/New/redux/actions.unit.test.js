import { Creators, Types } from '@app/pages/Fleet/TMS/New/redux/actions';

describe('Fleet/TMS/New', () => {
  describe('action-creator #createTmsVehicleRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createTmsVehicleRequest({});
      const expectedAction = {
        type: Types.CREATE_TMS_VEHICLE_REQUEST,
        formValues: {
          plate: '',
          vehicleClass: '',
          type: '',
          brand: '',
          modelYear: '',
          active: true,
          volumeCapacity: 0,
          palletCapacity: 0,
          dincerId: '',
          vehicleDocuments: [],
        },
      };

      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createTmsVehicleSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createTmsVehicleSuccess({});
      const expectedAction = { type: Types.CREATE_TMS_VEHICLE_SUCCESS, data: {} };

      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createTmsVehicleFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createTmsVehicleFailure({});
      const expectedAction = { type: Types.CREATE_TMS_VEHICLE_FAILURE, error: null };

      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
