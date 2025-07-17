import { Creators, Types } from '@app/pages/Fleet/Vehicle/List/redux/action';

describe('Fleet/Vehicle/List', () => {
  describe('action-creator #getVehicleList', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getVehicleList({});
      const expectedAction = {
        type: Types.GET_VEHICLE_LIST,
        warehouseIds: [],
        cities: [],
        franchiseIds: [],
        statuses: null,
        plate: '',
        vehicleConstraintId: '',
        currentPage: 1,
        rowsPerPage: 10,
        tag: '',
        withTotalCount: undefined,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getVehicleListSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getVehicleListFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleTypeList', () => {
    it('receivedAction should equal to expected action (without args)', () => {
      const receivedAction = Creators.getVehicleTypeList({});
      const expectedAction = { type: Types.GET_VEHICLE_TYPE_LIST, statuses: undefined, types: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleTypeListSuccess', () => {
    it('receivedAction should equal to expected action (without args)', () => {
      const receivedAction = Creators.getVehicleTypeListSuccess({});
      const expectedAction = { type: Types.GET_VEHICLE_TYPE_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleTypeListFailure', () => {
    it('receivedAction should equal to expected action (without args)', () => {
      const receivedAction = Creators.getVehicleTypeListFailure({});
      const expectedAction = { type: Types.GET_VEHICLE_TYPE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
