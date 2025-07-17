import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  overallStats: {
    data: [],
    isPending: false,
    error: null,
  },
  courierPlanAndCounts: {
    data: [],
    isPending: false,
    error: null,
  },
  foodCourierPlanAndCounts: {
    data: [],
    isPending: false,
    error: null,
  },
  activeOrderStats: {
    data: [],
    isPending: false,
    error: null,
  },
  couriers: {
    data: [],
    isPending: false,
    error: null,
  },
  redBasketData: [],
  artisanActiveOrders: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouseSearchTerm: '',
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

export const getFoodCourierPlanAndCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    foodCourierPlanAndCounts: {
      ...state.foodCourierPlanAndCounts,
      isPending: true,
    },
  };
};

export const getFoodCourierPlanAndCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    foodCourierPlanAndCounts: {
      ...state.foodCourierPlanAndCounts,
      data,
      isPending: false,
    },
  };
};

export const getFoodCourierPlanAndCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    foodCourierPlanAndCounts: {
      ...state.foodCourierPlanAndCounts,
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

export const getArtisanActiveOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    artisanActiveOrders: {
      ...state.artisanActiveOrders,
      isPending: true,
    },
  };
};

export const getArtisanActiveOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    artisanActiveOrders: {
      ...state.artisanActiveOrders,
      data,
      isPending: false,
    },
  };
};

export const getArtisanActiveOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    artisanActiveOrders: {
      ...state.artisanActiveOrders,
      isPending: false,
      error,
    },
  };
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

export const getCouriersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    couriers: {
      ...state.couriers,
      data,
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

export const getRedBasketSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    redBasketData: [data, ...state.redBasketData],
  };
};

export const updateRedBasket = (state = INITIAL_STATE, { redBasketData }) => {
  return {
    ...state,
    redBasketData,
  };
};

export const setWarehouseSearchTerm = (state = INITIAL_STATE, { searchValue }) => {
  return {
    ...state,
    warehouseSearchTerm: searchValue,
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

  [Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_REQUEST]: getFoodCourierPlanAndCountsRequest,
  [Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_SUCCESS]: getFoodCourierPlanAndCountsSuccess,
  [Types.GET_FOOD_COURIER_PLAN_AND_COUNTS_FAILURE]: getFoodCourierPlanAndCountsFailure,

  [Types.GET_ACTIVE_ORDER_STATS_REQUEST]: getActiveOrderStatsRequest,
  [Types.GET_ACTIVE_ORDER_STATS_SUCCESS]: getActiveOrderStatsSuccess,
  [Types.GET_ACTIVE_ORDER_STATS_FAILURE]: getActiveOrderStatsFailure,

  [Types.GET_COURIERS_REQUEST]: getCouriersRequest,
  [Types.GET_COURIERS_SUCCESS]: getCouriersSuccess,
  [Types.GET_COURIERS_FAILURE]: getCouriersFailure,

  [Types.GET_ARTISAN_ACTIVE_ORDERS_REQUEST]: getArtisanActiveOrdersRequest,
  [Types.GET_ARTISAN_ACTIVE_ORDERS_SUCCESS]: getArtisanActiveOrdersSuccess,
  [Types.GET_ARTISAN_ACTIVE_ORDERS_FAILURE]: getArtisanActiveOrdersFailure,

  [Types.UPDATE_RED_BASKET]: updateRedBasket,
  [Types.GET_RED_BASKET_SUCCESS]: getRedBasketSuccess,

  [Types.SET_WAREHOUSE_SEARCH_TERM]: setWarehouseSearchTerm,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
