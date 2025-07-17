import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { filterCouriers } from '../utils/filterCourier';

export const INITIAL_STATE = {
  couriers: {
    data: [],
    isPending: false,
    totalCount: 0,
  },
  reasons: {
    data: [],
    isPending: false,
  },
  mappedWarehouses: null,
};

export const getCouriersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      isPending: true,
    },
  };
};

export const getCouriersSuccess = (state = INITIAL_STATE, { couriers = [], filter = [] }) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      data: filterCouriers(couriers, filter),
      isPending: false,
    },
  };
};

export const getCouriersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      isPending: false,
      error,
    },
  };
};

// get busy reasons

export const getBusyReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reasons: {
      ...state.reasons,
      isPending: true,
    },
  };
};

export const getBusyReasonsSuccess = (state = INITIAL_STATE, { reasons = [] }) => {
  return {
    ...state,
    reasons: {
      ...state.reasons,
      data: reasons,
      isPending: false,
    },
  };
};

export const getBusyReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reasons: {
      ...state.reasons,
      isPending: false,
      error,
    },
  };
};

const setMappedWarehousesSuccess = (state = INITIAL_STATE, { mappedWarehouses }) => {
  const updatedWarehouses = {};
  mappedWarehouses.forEach(({ _id, name }) => {
    updatedWarehouses[_id] = name;
  });

  return {
    ...state,
    mappedWarehouses: updatedWarehouses,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIERS_REQUEST]: getCouriersRequest,
  [Types.GET_COURIERS_SUCCESS]: getCouriersSuccess,
  [Types.GET_COURIERS_FAILURE]: getCouriersFailure,
  [Types.GET_BUSY_REASONS_REQUEST]: getBusyReasonsRequest,
  [Types.GET_BUSY_REASONS_SUCCESS]: getBusyReasonsSuccess,
  [Types.GET_BUSY_REASONS_FAILURE]: getBusyReasonsFailure,
  [Types.SET_MAPPED_WAREHOUSES_SUCCESS]: setMappedWarehousesSuccess,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
