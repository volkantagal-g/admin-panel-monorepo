import reducer, { INITIAL_STATE } from '@app/pages/Fleet/VehicleConstraint/List/redux/reducer';
import { Types } from '@app/pages/Fleet/VehicleConstraint/List/redux/actions';

describe('Fleet/VehicleConstraint/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_VEHICLE_CONSTRAINT_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_LIST_REQUEST });
      const expectedState = { vehicleConstraintList: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINT_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const response = { vehicleConstraints: [{ id: 'fakeId', name: 'fakeName' }], totalCount: 1 };
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_LIST_SUCCESS, data: response });
      const expectedState = { vehicleConstraintList: { isPending: false, data: response } };
      expect(receivedState).toEqual(expectedState);
    });

    it('receivedState should equal to expectedState (without data)', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_LIST_SUCCESS });
      const expectedState = {
        vehicleConstraintList: {
          isPending: false,
          data: {
            vehicleConstraints: [],
            totalCount: 0,
          },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_CONSTRAINT_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_CONSTRAINT_LIST_FAILURE });
      const expectedState = { vehicleConstraintList: { isPending: false } };
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
