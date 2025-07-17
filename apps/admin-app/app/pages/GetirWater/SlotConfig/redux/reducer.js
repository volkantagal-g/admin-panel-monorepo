import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { Types } from './actions';

export const INITIAL_STATE = {
  waterSlotData: {
    data: [],
    isPending: false,
    error: null,
  },
  updateSlotData: {
    data: [],
    isPending: false,
    error: null,
  },
  waterBulkSlotData: {
    data: [],
    isPending: false,
    error: null,
  },
  updateBulkSlotData: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    warehouse: '',
    date: moment().endOf('day'),
    warehouses: [],
    dateRange: [moment().startOf('day'), moment().endOf('day')],
  },
  inputClearTrigger: 0,
};

export const getWarehouseSlotDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    waterSlotData: {
      ...INITIAL_STATE.waterSlotData,
      isPending: true,
    },
  };
};

export const getWarehouseSlotDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    waterSlotData: {
      ...INITIAL_STATE.waterSlotData,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseSlotDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    waterSlotData: {
      ...INITIAL_STATE.waterSlotData,
      isPending: false,
      error,
    },
  };
};

export const updateSlotCapacityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateSlotData: {
      ...INITIAL_STATE.updateSlotData,
      isPending: true,
    },
  };
};

export const updateSlotCapacitySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateSlotData: {
      ...INITIAL_STATE.updateSlotData,
      data,
      isPending: false,
    },
  };
};

export const updateSlotCapacityFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateSlotData: {
      ...INITIAL_STATE.updateSlotData,
      isPending: false,
      error,
    },
  };
};

export const setWarehouse = (state = INITIAL_STATE, { warehouse }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouse,
    },
  };
};

export const setDate = (state = INITIAL_STATE, { date }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      date,
    },
  };
};

export const getBulkSlotDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    waterBulkSlotData: {
      ...INITIAL_STATE.waterBulkSlotData,
      isPending: true,
    },
  };
};

export const getBulkSlotDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    waterBulkSlotData: {
      ...INITIAL_STATE.waterBulkSlotData,
      data,
      isPending: false,
    },
  };
};

export const getBulkSlotDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    waterBulkSlotData: {
      ...INITIAL_STATE.waterBulkSlotData,
      isPending: false,
      error,
    },
  };
};

export const updateBulkSlotCapacitiesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBulkSlotData: {
      ...INITIAL_STATE.updateBulkSlotData,
      isPending: true,
    },
  };
};

export const updateBulkSlotCapacitiesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateBulkSlotData: {
      ...INITIAL_STATE.updateBulkSlotData,
      data,
      isPending: false,
    },
  };
};

export const updateBulkSlotCapacitiesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBulkSlotData: {
      ...INITIAL_STATE.updateBulkSlotData,
      isPending: false,
      error,
    },
  };
};

export const setWarehouses = (state = INITIAL_STATE, { warehouses }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouses,
    },
  };
};

export const setDates = (state = INITIAL_STATE, { dateRange }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      dateRange,
    },
  };
};

export const setCityId = (state = INITIAL_STATE, { cityId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      cityId,
    },
  };
};

export const triggerInputClear = (state = INITIAL_STATE) => {
  return {
    ...state,
    inputClearTrigger: state.inputClearTrigger + 1,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

const init = (state = INITIAL_STATE) => {
  return { ...state };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: init,
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_WAREHOUSE_SLOT_DATA_REQUEST]: getWarehouseSlotDataRequest,
  [Types.GET_WAREHOUSE_SLOT_DATA_SUCCESS]: getWarehouseSlotDataSuccess,
  [Types.GET_WAREHOUSE_SLOT_DATA_FAILURE]: getWarehouseSlotDataFailure,
  [Types.UPDATE_SLOT_CAPACITY_REQUEST]: updateSlotCapacityRequest,
  [Types.UPDATE_SLOT_CAPACITY_SUCCESS]: updateSlotCapacitySuccess,
  [Types.UPDATE_SLOT_CAPACITY_FAILURE]: updateSlotCapacityFailure,
  [Types.SET_WAREHOUSE]: setWarehouse,
  [Types.SET_DATE]: setDate,
  [Types.GET_BULK_SLOT_DATA_REQUEST]: getBulkSlotDataRequest,
  [Types.GET_BULK_SLOT_DATA_SUCCESS]: getBulkSlotDataSuccess,
  [Types.GET_BULK_SLOT_DATA_FAILURE]: getBulkSlotDataFailure,
  [Types.UPDATE_BULK_SLOT_CAPACITIES_REQUEST]: updateBulkSlotCapacitiesRequest,
  [Types.UPDATE_BULK_SLOT_CAPACITIES_SUCCESS]: updateBulkSlotCapacitiesSuccess,
  [Types.UPDATE_BULK_SLOT_CAPACITIES_FAILURE]: updateBulkSlotCapacitiesFailure,
  [Types.SET_WAREHOUSES]: setWarehouses,
  [Types.SET_DATES]: setDates,
  [Types.TRIGGER_INPUT_CLEAR]: triggerInputClear,
};

export default createReducer(INITIAL_STATE, HANDLERS);
