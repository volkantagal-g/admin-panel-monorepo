import reducer, { INITIAL_STATE } from '@app/pages/Fleet/TmsDriver/Detail/redux/reducer';
import { Types } from '@app/pages/Fleet/TmsDriver/Detail/redux/actions';

describe('Fleet/TmsDriver/Detail', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_TMS_DRIVER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_TMS_DRIVER_REQUEST });
      const expectedState = { tmsDriver: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_TMS_DRIVER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockDriver = {
        _id: '63973e4887aeabcf2e9351fa',
        name: 'Sedat Maraz',
        isActivated: true,
        isLoggedIn: true,
        gsm: '5555555555',
        status: 700,
      };
      const receivedState = reducer({}, { type: Types.GET_TMS_DRIVER_SUCCESS, data: mockDriver });
      const expectedState = { tmsDriver: { isPending: false, data: mockDriver } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_TMS_DRIVER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const fakeError = new Error('fake error');
      const receivedState = reducer({}, { type: Types.GET_TMS_DRIVER_FAILURE, error: fakeError });
      const expectedState = { tmsDriver: { isPending: false, error: fakeError } };
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
