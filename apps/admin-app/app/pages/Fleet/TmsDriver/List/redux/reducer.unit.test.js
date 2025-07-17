import reducer, { INITIAL_STATE } from '@app/pages/Fleet/TmsDriver/List/redux/reducer';
import { Types } from '@app/pages/Fleet/TmsDriver/List/redux/actions';

describe('Fleet/TmsDriver/List', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer FILTER_TMS_DRIVERS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.FILTER_TMS_DRIVERS_REQUEST });
      const expectedState = { tmsDrivers: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_TMS_DRIVERS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockDriverList = [
        {
          _id: '63973e4887aeabcf2e9351fa',
          name: 'Sedat Maraz',
          isActivated: true,
          isLoggedIn: true,
          gsm: '5555555555',
          status: 700,
        },
        {
          _id: '63a590b53ac613813d2d91a1',
          name: 'Safak TMS',
          isActivated: true,
          isLoggedIn: true,
          gsm: '5555555542',
          status: 200,
        },
      ];
      const mockTotalCount = 20;
      const receivedState = reducer(
        {},
        {
          type: Types.FILTER_TMS_DRIVERS_SUCCESS,
          data: mockDriverList,
          totalCount: mockTotalCount,
        },
      );
      const expectedState = {
        tmsDrivers: {
          isPending: false,
          data: mockDriverList,
          totalCount: mockTotalCount,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_TMS_DRIVERS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeError = new Error('fake error');
      const receivedState = reducer({}, { type: Types.FILTER_TMS_DRIVERS_FAILURE, error: fakeError });
      const expectedState = { tmsDrivers: { isPending: false, error: fakeError } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer destroyPage', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      expect(receivedState).toEqual(INITIAL_STATE);
    });
  });
});
