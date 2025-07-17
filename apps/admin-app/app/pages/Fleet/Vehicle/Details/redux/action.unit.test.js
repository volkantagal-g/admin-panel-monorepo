import { Creators, Types } from '@app/pages/Fleet/Vehicle/Details/redux/action';

describe('Fleet/Vehicle/Details', () => {
  describe('action-creator #getVehicleDetails', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleDetails({});
      const expectedAction = { type: Types.GET_VEHICLE_DETAILS, vehicleId: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleDetailsSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleDetailsSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_DETAILS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleDetailsFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleDetailsFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_DETAILS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleType', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleType({});
      const expectedAction = { type: Types.GET_VEHICLE_TYPE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleTypeSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleTypeSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_TYPE_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleTypeFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleTypeFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_TYPE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateVehicleRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateVehicleRequest({});
      const expectedAction = {
        type: Types.UPDATE_VEHICLE_REQUEST,
        plate: '',
        constraintId: '',
        warehouse: '',
        franchise: '',
        city: '',
        licenceOwner: '',
        licenceImage: '',
        licenceSerial: '',
        firstRegistrationDate: '',
        registrationDate: '',
        tradeName: '',
        brand: '',
        chasis: '',
        kind: '',
        color: '',
        engineNumber: '',
        identityNumber: '',
        inspectionValidityDate: '',
        tags: [],
        ownershipType: null,
        licenceNumber: '',
        modelYear: '',
        id: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateVehicleRequestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateVehicleRequestSuccess({});
      const expectedAction = { type: Types.UPDATE_VEHICLE_REQUEST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateVehicleRequestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateVehicleRequestFailure({});
      const expectedAction = { type: Types.UPDATE_VEHICLE_REQUEST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleLogsRequest', () => {
    it('receivedAction should equal to expected action (without args)', () => {
      const receivedAction = Creators.getVehicleLogsRequest({});
      const expectedAction = { type: Types.GET_VEHICLE_LOGS_REQUEST, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleLogsSuccess', () => {
    it('receivedAction should equal to expected action (without args)', () => {
      const receivedAction = Creators.getVehicleLogsSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_LOGS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleLogsFailure', () => {
    it('receivedAction should equal to expected action (without args)', () => {
      const receivedAction = Creators.getVehicleLogsFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_LOGS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
