import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.SLOT_CONFIG;

export const filtersSelector = {
  getWarehouse: state => state?.[reducerKey]?.filters?.warehouse,
  getDate: state => state?.[reducerKey]?.filters?.date,
  getDateRange: state => state?.[reducerKey]?.filters?.dateRange,
  getWarehouses: state => state?.[reducerKey]?.filters?.warehouses,
};

export const warehouseSlotDataSelector = {
  getData: state => state?.[reducerKey]?.waterSlotData?.data,
  getIsPending: state => state?.[reducerKey]?.waterSlotData?.isPending,
};

export const updateSlotDataSelector = {
  getData: state => state?.[reducerKey]?.updateSlotData?.data,
  getIsPending: state => state?.[reducerKey]?.updateSlotData?.isPending,
};

export const getBulkSlotDataSelector = {
  getData: state => state?.[reducerKey]?.waterBulkSlotData?.data,
  getIsPending: state => state?.[reducerKey]?.waterBulkSlotData?.isPending,
};

export const updateBulkSlotDataSelector = {
  getData: state => state?.[reducerKey]?.updateBulkSlotData?.data,
  getIsPending: state => state?.[reducerKey]?.updateBulkSlotData?.isPending,
};

export const inputClearTriggerSelector = { getTrigger: state => state?.[reducerKey]?.inputClearTrigger };
