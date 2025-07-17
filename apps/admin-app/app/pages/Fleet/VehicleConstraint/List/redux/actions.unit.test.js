import { Creators, Types } from '@app/pages/Fleet/VehicleConstraint/List/redux/actions';

describe('Fleet/VehicleConstraint/List', () => {
  describe('action-creator #getVehicleConstraintListRequest', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintListRequest({});
      const expectedAction = {
        type: Types.GET_VEHICLE_CONSTRAINT_LIST_REQUEST,
        statuses: undefined,
        types: undefined,
        limit: 10,
        offset: 0,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintListSuccess', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintListSuccess({});
      const expectedAction = {
        type: Types.GET_VEHICLE_CONSTRAINT_LIST_SUCCESS,
        data: {
          vehicleConstraints: [],
          totalCount: 0,
        },
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleConstraintListFailure', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.getVehicleConstraintListFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_CONSTRAINT_LIST_FAILURE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
