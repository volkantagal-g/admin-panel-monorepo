import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.GETIR_WATER.SLOT_CONFIG}_`;

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getWarehouseSlotDataRequest: { id: null, date: null },
  getWarehouseSlotDataSuccess: { data: [] },
  getWarehouseSlotDataFailure: { error: null },
  updateSlotCapacityRequest: { body: {} },
  updateSlotCapacitySuccess: { data: [] },
  updateSlotCapacityFailure: { error: null },
  setWarehouse: { warehouse: '' },
  setDate: { date: '' },
  getBulkSlotDataRequest: null,
  getBulkSlotDataSuccess: { data: [] },
  getBulkSlotDataFailure: { error: null },
  updateBulkSlotCapacitiesRequest: { body: {} },
  updateBulkSlotCapacitiesSuccess: { data: [] },
  updateBulkSlotCapacitiesFailure: { error: null },
  setWarehouses: { warehouses: '' },
  setDates: { dateRange: [] },
  triggerInputClear: null,
}, { prefix });
