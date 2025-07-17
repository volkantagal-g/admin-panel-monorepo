import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getGetirWaterSlotData, updateSlotCapacity } from '@shared/api/water';
import { Creators, Types } from '@app/pages/GetirWater/SlotConfig/redux/actions';
import {
  getWarehouseSlotDataRequest,
  updateSlotCapacityRequest,
  watchGetWarehouseSlotDataRequest,
  watchUpdateSlotCapacityRequest,
} from '@app/pages/GetirWater/SlotConfig/redux/saga';

import { mockedSlotConfigData } from '@shared/api/water/index.mock.data';

describe('GetirWater/SlotConfig', () => {
  const error = new Error('404');

  describe('saga #getWarehouseSlotDataRequest', () => {
    it('should call getWarehouseSlotDataRequest (success)', () => {
      const id = 'test_w4';
      const date = '2024-01-01';
      const data = mockedSlotConfigData;
      testSaga(getWarehouseSlotDataRequest, { id, date })
        .next()
        .call(getGetirWaterSlotData, { id, date })
        .next(data)
        .put(Creators.getWarehouseSlotDataSuccess({ data: mockedSlotConfigData }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateSlotCapacityRequest', () => {
    it('should call updateSlotCapacityRequest (failure)', () => {
      const body = {};
      testSaga(updateSlotCapacityRequest, { body })
        .next()
        .call(updateSlotCapacity, { body })
        .next()
        .throw(error)
        .put(Creators.updateSlotCapacityFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetWarehouseSlotDataRequest', () => {
    it('should call updateSlotCapacityRequest', () => {
      testSaga(watchGetWarehouseSlotDataRequest)
        .next()
        .takeLatest(Types.GET_WAREHOUSE_SLOT_DATA_REQUEST, getWarehouseSlotDataRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateSlotCapacityRequest', () => {
    it('should call updateSlotCapacityRequest', () => {
      testSaga(watchUpdateSlotCapacityRequest)
        .next()
        .takeLatest(Types.UPDATE_SLOT_CAPACITY_REQUEST, updateSlotCapacityRequest)
        .next()
        .isDone();
    });
  });
});
