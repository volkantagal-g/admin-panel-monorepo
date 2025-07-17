import reducer, { INITIAL_STATE } from '@app/pages/Fleet/VehicleConstraint/Detail/redux/reducer';
import { Types } from '@app/pages/Fleet/VehicleConstraint/Detail/redux/actions';

describe('Fleet/VehicleConstraint/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_VEHICLE_CONSTRAINT_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_REQUEST });
      const expectedState = { getVehicleConstraint: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINT_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const response = { id: '123123123', name: 'constraint-name-test' };
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_SUCCESS, data: response });
      const expectedState = { getVehicleConstraint: { data: response, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });

    it('receivedState should equal to expectedState (without data)', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_SUCCESS });
      const expectedState = { getVehicleConstraint: { isPending: false, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINT_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_FAILURE });
      const expectedState = { getVehicleConstraint: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_VEHICLE_CONSTRAINT_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_VEHICLE_CONSTRAINT_REQUEST });
      const expectedState = { updateVehicleConstraint: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_VEHICLE_CONSTRAINT_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_VEHICLE_CONSTRAINT_SUCCESS });
      const expectedState = { updateVehicleConstraint: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_VEHICLE_CONSTRAINT_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_VEHICLE_CONSTRAINT_FAILURE });
      const expectedState = { updateVehicleConstraint: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_REQUEST });
      const expectedState = { changeVehicleConstraintActiveness: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_SUCCESS });
      const expectedState = { changeVehicleConstraintActiveness: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_FAILURE });
      const expectedState = { changeVehicleConstraintActiveness: { isPending: false } };
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
