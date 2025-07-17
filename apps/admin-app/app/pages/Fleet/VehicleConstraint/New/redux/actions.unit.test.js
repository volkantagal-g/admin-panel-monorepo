import { Creators, Types } from '@app/pages/Fleet/VehicleConstraint/New/redux/actions';

describe('Fleet/VehicleConstraint/New', () => {
  describe('action-creator #createVehicleConstraintRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.createVehicleConstraintRequest({});
      const expectedAction = {
        type: Types.CREATE_VEHICLE_CONSTRAINT_REQUEST,
        name: undefined,
        vehicleType: undefined,
        constraints: undefined,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createVehicleConstraintSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.createVehicleConstraintSuccess({});
      const expectedAction = { type: Types.CREATE_VEHICLE_CONSTRAINT_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createVehicleConstraintFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.createVehicleConstraintFailure({});
      const expectedAction = { type: Types.CREATE_VEHICLE_CONSTRAINT_FAILURE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintsRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintsRequest({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINTS_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintsSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintsSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINTS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintsFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintsFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINTS_FAILURE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
