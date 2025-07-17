import reducer, { INITIAL_STATE } from '@app/pages/Fleet/Vehicle/New/redux/reducer';
import { Types } from '@app/pages/Fleet/Vehicle/New/redux/actions';

describe('Fleet/Vehicle/New', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer CREATE_VEHICLE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.CREATE_VEHICLE_REQUEST });
      const expectedState = { createVehicle: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_VEHICLE_REQUEST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const createdVehicle = { name: 'new vehicle', id: '1213123' };
      const receivedState = reducer({}, { type: Types.CREATE_VEHICLE_REQUEST_SUCCESS, data: createdVehicle });
      const expectedState = {
        createVehicle: {
          isPending: false,
          data: createdVehicle,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer CREATE_VEHICLE_REQUEST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const error = new Error('fake error');
      const receivedState = reducer({}, { type: Types.CREATE_VEHICLE_REQUEST_FAILURE, error });
      const expectedState = {
        createVehicle: {
          isPending: false,
          error,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_TYPE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_TYPE });
      const expectedState = { vehicleType: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_TYPE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const vehicleConstraints = [{ id: '123123', name: 'test-test' }];
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_TYPE_SUCCESS, data: vehicleConstraints });
      const expectedState = { vehicleType: { isPending: false, data: vehicleConstraints } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_TYPE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const error = new Error('fake error');
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_TYPE_FAILURE, error });
      const expectedState = { vehicleType: { isPending: false, error } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
