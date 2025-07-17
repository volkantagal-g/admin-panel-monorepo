import { Creators, Types } from '@app/pages/Fleet/Vehicle/New/redux/actions';

describe('Fleet/Vehicle/New', () => {
  describe('action-creator #createVehicleRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.createVehicleRequest({});
      const expectedAction = {
        type: Types.CREATE_VEHICLE_REQUEST,
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
        isCreatingAnotherVehicle: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createVehicleRequestSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.createVehicleRequestSuccess({});
      const expectedAction = { type: Types.CREATE_VEHICLE_REQUEST_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createVehicleRequestFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.createVehicleRequestFailure({});
      const expectedAction = { type: Types.CREATE_VEHICLE_REQUEST_FAILURE, error: null };
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

  describe('action-creator #getFranchisesRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getFranchisesRequest({});
      const expectedAction = { type: Types.GET_FRANCHISES_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFranchisesSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getFranchisesSuccess({});
      const expectedAction = { type: Types.GET_FRANCHISES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFranchisesFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getFranchisesFailure({});
      const expectedAction = { type: Types.GET_FRANCHISES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
