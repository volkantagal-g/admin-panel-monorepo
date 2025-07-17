import { Creators, Types } from '@app/pages/Fleet/VehicleConstraint/Detail/redux/actions';

describe('Fleet/VehicleConstraint/Detail', () => {
  describe('action-creator #getVehicleConstraintRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintRequest({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINT_REQUEST, vehicleConstraintId: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINT_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINT_FAILURE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateVehicleConstraintRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateVehicleConstraintRequest({});
      const expectedAction = {
        type: Types.UPDATE_VEHICLE_CONSTRAINT_REQUEST,
        name: undefined,
        vehicleType: undefined,
        constraints: undefined,
        vehicleConstraintId: undefined,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateVehicleConstraintSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateVehicleConstraintSuccess({});
      const expectedAction = { type: Types.UPDATE_VEHICLE_CONSTRAINT_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateVehicleConstraintFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.updateVehicleConstraintFailure({});
      const expectedAction = { type: Types.UPDATE_VEHICLE_CONSTRAINT_FAILURE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #changeVehicleConstraintActivenessRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.changeVehicleConstraintActivenessRequest({});
      const expectedAction = {
        type: Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_REQUEST,
        id: null,
        newActivenessStatus: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #changeVehicleConstraintActivenessSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.changeVehicleConstraintActivenessSuccess({});
      const expectedAction = { type: Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #changeVehicleConstraintActivenessFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.changeVehicleConstraintActivenessFailure({});
      const expectedAction = { type: Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
