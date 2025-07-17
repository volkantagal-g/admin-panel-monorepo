import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouseAnnouncementsListByWarehouse: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getWarehouseAnnouncementsListByWarehouseRequest = state => {
  return {
    ...state,
    warehouseAnnouncementsListByWarehouse: {
      ...state.warehouseAnnouncementsListByWarehouse,
      isPending: true,
    },
  };
};

export const getWarehouseAnnouncementsListByWarehouseSuccess = (state, { announcements = [], count }) => {
  return {
    ...state,
    warehouseAnnouncementsListByWarehouse: {
      ...state.warehouseAnnouncementsListByWarehouse,
      data: announcements,
      total: count,
      isPending: false,
    },
  };
};

export const getWarehouseAnnouncementsListByWarehouseFailure = (state, { error }) => {
  return {
    ...state,
    warehouseAnnouncementsListByWarehouse: {
      ...state.warehouseAnnouncementsListByWarehouse,
      isPending: false,
      error,
    },
  };
};
export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_ANNOUNCEMENTS_LIST_BY_WAREHOUSE_REQUEST]: getWarehouseAnnouncementsListByWarehouseRequest,
  [Types.GET_WAREHOUSE_ANNOUNCEMENTS_LIST_BY_WAREHOUSE_SUCCESS]: getWarehouseAnnouncementsListByWarehouseSuccess,
  [Types.GET_WAREHOUSE_ANNOUNCEMENTS_LIST_BY_WAREHOUSE_FAILURE]: getWarehouseAnnouncementsListByWarehouseFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
