import reducer, { INITIAL_STATE } from '@app/pages/CourierStatus/List/redux/reducer';
import { Types } from '@app/pages/CourierStatus/List/redux/actions';
import { courierStatusAndBusyData } from '@shared/api/courier/index.mock.data';

describe('CourierStatusAndBusy/List', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer FILTER_COURIER__REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.FILTER_COURIER_REQUEST },
      );
      const expectedState = { filterCourier: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_COURIER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeData = courierStatusAndBusyData;
      const receivedState = reducer(
        {},
        { type: Types.FILTER_COURIER_SUCCESS, data: fakeData },
      );
      const expectedState = { filterCourier: { isPending: false, data: fakeData } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer FILTER_COURIER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeError = new Error('fake error');
      const receivedState = reducer(
        {},
        { type: Types.FILTER_COURIER_FAILURE, error: fakeError },
      );
      const expectedState = { filterCourier: { isPending: false, error: fakeError } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
