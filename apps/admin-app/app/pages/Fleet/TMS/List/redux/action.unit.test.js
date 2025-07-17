import { Creators, Types } from '@app/pages/Fleet/TMS/List/redux/action';

describe('Fleet/TMS/List', () => {
  describe('action-creator #getVehicleList', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getVehicleList({});
      const expectedAction = {
        type: Types.GET_VEHICLE_LIST,
        plate: '',
        currentPage: 1,
        rowsPerPage: 10,
        activeness: null,
        dincerId: '',
        palletCapacity: 0,
        vehicleType: '',
        vehicleClass: '',
        volumeCapacity: 0,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getVehicleListSuccess({});
      const expectedAction = {
        type: Types.GET_VEHICLE_LIST_SUCCESS,
        data: [],
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getVehicleListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getVehicleListFailure({});
      const expectedAction = {
        type: Types.GET_VEHICLE_LIST_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteVehicle', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteVehicle({});
      const expectedAction = {
        type: Types.DELETE_VEHICLE,
        id: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator deleteVehicleSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteVehicleSuccess({});
      const expectedAction = {
        type: Types.DELETE_VEHICLE_SUCCESS,
        data: [],
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteVehicleFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteVehicleFailure({});
      const expectedAction = {
        type: Types.DELETE_VEHICLE_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
