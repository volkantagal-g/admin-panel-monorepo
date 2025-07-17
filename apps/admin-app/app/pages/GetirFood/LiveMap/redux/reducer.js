import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  overallStats: {
    data: {},
    isPending: false,
    error: null,
  },
  courierPlanAndCounts: {
    data: [],
    isPending: false,
    error: null,
  },
  activeOrderStats: {
    data: [],
    isPending: false,
    error: null,
  },
  activeOrderCouriersAndWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getOverallStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    overallStats: {
      ...state.overallStats,
      isPending: true,
    },
  };
};

export const getOverallStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    overallStats: {
      ...state.overallStats,
      data,
      isPending: false,
    },
  };
};

export const getOverallStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    overallStats: {
      ...state.overallStats,
      isPending: false,
      error,
    },
  };
};

export const getCourierPlanAndCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierPlanAndCounts: {
      ...state.courierPlanAndCounts,
      isPending: true,
    },
  };
};

export const getCourierPlanAndCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierPlanAndCounts: {
      ...state.courierPlanAndCounts,
      data,
      isPending: false,
    },
  };
};

export const getCourierPlanAndCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierPlanAndCounts: {
      ...state.courierPlanAndCounts,
      isPending: false,
      error,
    },
  };
};

export const getActiveOrderStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeOrderStats: {
      ...state.activeOrderStats,
      isPending: true,
    },
  };
};

export const getActiveOrderStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activeOrderStats: {
      ...state.activeOrderStats,
      data,
      isPending: false,
    },
  };
};

export const getActiveOrderStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activeOrderStats: {
      ...state.activeOrderStats,
      isPending: false,
      error,
    },
  };
};

export const getActiveOrderCouriersAndWarehousesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeOrderCouriersAndWarehouses: {
      ...state.activeOrderCouriersAndWarehouses,
      isPending: true,
    },
  };
};

export const getActiveOrderCouriersAndWarehousesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    activeOrderCouriersAndWarehouses: {
      ...state.activeOrderCouriersAndWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getActiveOrderCouriersAndWarehousesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activeOrderCouriersAndWarehouses: {
      ...state.activeOrderCouriersAndWarehouses,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_OVERALL_STATS_REQUEST]: getOverallStatsRequest,
  [Types.GET_OVERALL_STATS_SUCCESS]: getOverallStatsSuccess,
  [Types.GET_OVERALL_STATS_FAILURE]: getOverallStatsFailure,

  [Types.GET_COURIER_PLAN_AND_COUNTS_REQUEST]: getCourierPlanAndCountsRequest,
  [Types.GET_COURIER_PLAN_AND_COUNTS_SUCCESS]: getCourierPlanAndCountsSuccess,
  [Types.GET_COURIER_PLAN_AND_COUNTS_FAILURE]: getCourierPlanAndCountsFailure,

  [Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_REQUEST]: getCourierPlanAndCountsRequest,
  [Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_SUCCESS]: getCourierPlanAndCountsSuccess,
  [Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_FAILURE]: getCourierPlanAndCountsFailure,

  [Types.GET_ACTIVE_ORDER_STATS_REQUEST]: getActiveOrderStatsRequest,
  [Types.GET_ACTIVE_ORDER_STATS_SUCCESS]: getActiveOrderStatsSuccess,
  [Types.GET_ACTIVE_ORDER_STATS_FAILURE]: getActiveOrderStatsFailure,

  [Types.GET_ACTIVE_ORDER_COURIERS_AND_WAREHOUSES_REQUEST]: getActiveOrderCouriersAndWarehousesRequest,
  [Types.GET_ACTIVE_ORDER_COURIERS_AND_WAREHOUSES_SUCCESS]: getActiveOrderCouriersAndWarehousesSuccess,
  [Types.GET_ACTIVE_ORDER_COURIERS_AND_WAREHOUSES_FAILURE]: getActiveOrderCouriersAndWarehousesFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
