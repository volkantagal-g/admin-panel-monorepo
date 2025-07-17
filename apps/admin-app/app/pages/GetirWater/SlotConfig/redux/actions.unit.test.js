import { Types, Creators } from '@app/pages/GetirWater/SlotConfig/redux/actions';

describe('GetirWater/SlotConfig', () => {
  describe('action-creator #getWarehouseSlotDataRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getWarehouseSlotDataRequest({});
      const expectedAction = { type: Types.GET_WAREHOUSE_SLOT_DATA_REQUEST, id: null, date: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getWarehouseSlotDataSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getWarehouseSlotDataSuccess({});
      const expectedAction = { type: Types.GET_WAREHOUSE_SLOT_DATA_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getWarehouseSlotDataFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getWarehouseSlotDataFailure({});
      const expectedAction = { type: Types.GET_WAREHOUSE_SLOT_DATA_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateSlotCapacityRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateSlotCapacityRequest({});
      const expectedAction = { type: Types.UPDATE_SLOT_CAPACITY_REQUEST, body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateSlotCapacitySuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateSlotCapacitySuccess({});
      const expectedAction = { type: Types.UPDATE_SLOT_CAPACITY_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateSlotCapacityFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateSlotCapacityFailure({});
      const expectedAction = { type: Types.UPDATE_SLOT_CAPACITY_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
