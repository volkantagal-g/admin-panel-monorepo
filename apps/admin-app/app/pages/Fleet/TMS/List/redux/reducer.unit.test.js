import reducer, { INITIAL_STATE } from '@app/pages/Fleet/TMS/List/redux/reducer';
import { Types } from '@app/pages/Fleet/TMS/List/redux/action';
import { mockTmsVehicleList as mockTmsData } from '@shared/api/fleet/index.mock.data';

describe('Fleet/TMS/List', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_VEHICLE_LIST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_LIST });
      const expectedState = { vehicleList: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_LIST_SUCCESS, data: mockTmsData.tmsVehicles });
      const expectedState = { vehicleList: { data: mockTmsData.tmsVehicles, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeError = new Error('fake error');
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_LIST_FAILURE, error: fakeError });
      const expectedState = { vehicleList: { isPending: false, error: fakeError } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DELETE_VEHICLE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DELETE_VEHICLE });
      const expectedState = { deleteVehicle: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DELETE_VEHICLE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockResponse = { success: true };
      const receivedState = reducer({}, { type: Types.DELETE_VEHICLE_SUCCESS, data: mockResponse });
      const expectedState = { deleteVehicle: { isPending: false, data: mockResponse } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DELETE_VEHICLE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const error = new Error('fake error');
      const receivedState = reducer({}, { type: Types.DELETE_VEHICLE_FAILURE, error });
      const expectedState = { deleteVehicle: { isPending: false, error } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
