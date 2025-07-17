import reducer, { INITIAL_STATE } from '@app/pages/Fleet/VehicleConstraint/New/redux/reducer';
import { Types } from '@app/pages/Fleet/VehicleConstraint/New/redux/actions';

describe('Fleet/VehicleConstraint/New', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });
  describe('reducer CREATE_VEHICLE_CONSTRAINT_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_VEHICLE_CONSTRAINT_REQUEST });
      const expectedState = { createVehicleConstraint: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_VEHICLE_CONSTRAINT_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_VEHICLE_CONSTRAINT_SUCCESS });
      const expectedState = { createVehicleConstraint: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_VEHICLE_CONSTRAINT_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_VEHICLE_CONSTRAINT_FAILURE });
      const expectedState = { createVehicleConstraint: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINTS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINTS_REQUEST });
      const expectedState = { getVehicleConstraints: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINTS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const response = [{ id: 'fakeId', name: 'fakeName' }];
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINTS_SUCCESS, data: response });
      const expectedState = { getVehicleConstraints: { isPending: false, data: response } };
      expect(receivedState).toEqual(expectedState);
    });

    it('receivedState should equal to expectedStat without response', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINTS_SUCCESS });
      const expectedState = { getVehicleConstraints: { isPending: false, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINTS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINTS_FAILURE });
      const expectedState = { getVehicleConstraints: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer destroy', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
