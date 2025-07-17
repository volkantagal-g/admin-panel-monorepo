import reducer, { INITIAL_STATE } from '@app/pages/Fleet/TMS/Detail/redux/reducer';
import { Types } from '@app/pages/Fleet/TMS/Detail/redux/actions';

describe('Fleet/TMS/Detail', () => {
  const mockTmsData = {
    _id: '63d13befabc7470b6a5fc18d',
    plate: '80HE795',
    vehicleClass: 'NPR10LONG',
    type: 'KAMYON',
    brand: 'ISUZI',
    modelYear: 2016,
    volumeCapacity: 110,
    palletCapacity: 10,
    active: true,
    vehicleDocuments: [
      {
        type: 'Doc2',
        number: 88899922,
        startDate: '2023-01-25T00:00:00.000Z',
        endDate: '2024-01-25T00:00:00.000Z',
      },
    ],
    dincerId: '000A3F3E4B1A4B4E',
  };
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_TMS_VEHICLE_REQUEST', () => {
    it('receviedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_TMS_VEHICLE_REQUEST },
      );
      const expectedState = { tmsVehicle: { isPending: true } };

      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_TMS_VEHICLE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.GET_TMS_VEHICLE_SUCCESS,
          data: mockTmsData,
        },
      );
      const expectedState = { tmsVehicle: { data: mockTmsData, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_TMS_VEHICLE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_TMS_VEHICLE_FAILURE, error: 'this is error' },
      );

      const expectedState = { tmsVehicle: { isPending: false, error: 'this is error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_TMS_VEHICLE_REQUEST', () => {
    it('receviedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.UPDATE_TMS_VEHICLE_REQUEST },
      );
      const expectedState = { tmsVehicle: { isPending: true } };

      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_TMS_VEHICLE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.UPDATE_TMS_VEHICLE_SUCCESS,
          data: mockTmsData,
        },
      );
      const expectedState = { tmsVehicle: { data: mockTmsData, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_TMS_VEHICLE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.UPDATE_TMS_VEHICLE_FAILURE, error: 'this is error' },
      );

      const expectedState = { tmsVehicle: { isPending: false, error: 'this is error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
