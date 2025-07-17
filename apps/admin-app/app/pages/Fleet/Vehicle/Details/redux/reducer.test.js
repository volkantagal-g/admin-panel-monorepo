import reducer, { INITIAL_STATE } from '@app/pages/Fleet/Vehicle/Details/redux/reducer';
import { Types } from '@app/pages/Fleet/Vehicle/Details/redux/action';

describe('Fleet/Vehicle/Details', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_VEHICLE_DETAILS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_DETAILS });
      const expectedState = { vehicleDetails: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_DETAILS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_VEHICLE_DETAILS_SUCCESS, data: { id: '123' } },
      );
      const expectedState = {
        vehicleDetails: {
          isPending: false,
          data: { id: '123' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_DETAILS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.GET_VEHICLE_DETAILS_FAILURE,
          error: new Error('404 Not Found'),
        },
      );
      const expectedState = {
        vehicleDetails: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_VEHICLE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_VEHICLE_REQUEST });
      const expectedState = { updateVehicle: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_VEHICLE_REQUEST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.UPDATE_VEHICLE_REQUEST_SUCCESS, data: { id: '123' } },
      );
      const expectedState = {
        updateVehicle: {
          isPending: false,
          data: { id: '123' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_VEHICLE_REQUEST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.UPDATE_VEHICLE_REQUEST_FAILURE,
          error: new Error('404 Not Found'),
        },
      );
      const expectedState = {
        updateVehicle: {
          isPending: true,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_TYPE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_VEHICLE_TYPE },
      );
      const expectedState = { vehicleType: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_TYPE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const response = { id: '123123', name: 'test constraint' };
      const receivedState = reducer(
        {},
        { type: Types.GET_VEHICLE_TYPE_SUCCESS, data: response },
      );
      const expectedState = { vehicleType: { data: response, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_TYPE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const error = new Error('fake error');
      const receivedState = reducer(
        {},
        { type: Types.GET_VEHICLE_TYPE_FAILURE, error },
      );
      const expectedState = { vehicleType: { error, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_LOGS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_LOGS_REQUEST, body: null });
      const expectedState = { vehicleLogs: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_LOGS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_LOGS_SUCCESS, data: { id: '123' } });
      const expectedState = {
        vehicleLogs: {
          isPending: false,
          data: { id: '123' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_VEHICLE_LOGS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_VEHICLE_LOGS_FAILURE, error: new Error('404 Not Found') });
      const expectedState = {
        vehicleLogs: {
          isPending: false,
          error: new Error('404 Not Found'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
