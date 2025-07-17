import reducer, { INITIAL_STATE } from '@app/pages/GetirWater/SlotConfig/redux/reducer';
import { Types } from '@app/pages/GetirWater/SlotConfig/redux/actions';
import { mockedSlotConfigData } from '@shared/api/water/index.mock.data';

describe('GetirWater/SlotConfig', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_WAREHOUSE_SLOT_DATA_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WAREHOUSE_SLOT_DATA_REQUEST });
      const expectedState = { waterSlotData: { isPending: true, data: [], error: null } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_WAREHOUSE_SLOT_DATA_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_WAREHOUSE_SLOT_DATA_SUCCESS, data: mockedSlotConfigData },
      );
      const expectedState = { waterSlotData: { isPending: false, data: mockedSlotConfigData, error: null } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_WAREHOUSE_SLOT_DATA_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WAREHOUSE_SLOT_DATA_FAILURE, error: 'error', data: [] });
      const expectedState = { waterSlotData: { isPending: false, error: 'error', data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_SLOT_CAPACITY_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_SLOT_CAPACITY_REQUEST, data: [], error: null });
      const expectedState = { updateSlotData: { isPending: true, data: [], error: null } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer UPDATE_SLOT_CAPACITY_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.UPDATE_SLOT_CAPACITY_SUCCESS, data: null, error: null },
      );
      const expectedState = { updateSlotData: { isPending: false, data: null, error: null } };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer UPDATE_SLOT_CAPACITY_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_SLOT_CAPACITY_FAILURE, error: 'error', data: [] });
      const expectedState = { updateSlotData: { isPending: false, error: 'error', data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
