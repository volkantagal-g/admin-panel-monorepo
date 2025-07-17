import { findIndex } from 'lodash';
import { createReducer } from 'reduxsauce';

import { getUser } from '@shared/redux/selectors/auth';

import { defaultRowsPerPage, defaultDomainType, Types, defaultCurrentPage } from './actions';
import { GETIR_MARKET_ORDER } from '@shared/shared/constants';

export const INITIAL_STATE = {
  getMissingProductOrders: {
    data: [],
    isPending: false,
    error: null,
    count: 0,
  },
  updateMissingProductStatus: {
    data: {},
    isPending: false,
    error: null,
  },
  getOrderCancelReasons: {
    data: [],
    isPending: false,
    error: null,
  },
  addMhProblem: {
    data: {},
    isPending: false,
    error: null,
  },
  orderPartialRefund: {
    data: {},
    isPending: false,
    error: null,
  },
  filters: {
    domainType: defaultDomainType,
    city: null,
    pagination: { currentPage: defaultCurrentPage, rowsPerPage: defaultRowsPerPage },
    searchTerm: '',
  },
  getMarketOrder: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getMissingProductOrdersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMissingProductOrders: {
      ...state.getMissingProductOrders,
      isPending: true,
    },
  };
};

export const getMissingProductOrdersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMissingProductOrders: {
      ...state.getMissingProductOrders,
      isPending: false,
      data: data?.orders || [],
      count: data?.totalCount,
    },
  };
};

export const getMissingProductOrdersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMissingProductOrders: {
      ...state.getMissingProductOrders,
      isPending: false,
      error,
    },
  };
};
export const getMarketOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketOrder: {
      ...state.getMarketOrder,
      isPending: true,
    },
  };
};

export const getMarketOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketOrder: {
      ...state.getMarketOrder,
      isPending: false,
      data,
    },
  };
};

export const getMarketOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketOrder: {
      ...state.getMarketOrder,
      isPending: false,
      error,
    },
  };
};
const updateMissingProductStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMissingProductStatus: {
      ...state.updateMissingProductStatus,
      isPending: true,
    },
  };
};

const updateMissingProductStatusSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMissingProductStatus: {
      ...state.updateMissingProductStatus,
      isPending: false,
      data,
    },
  };
};

const updateMissingProductStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMissingProductStatus: {
      ...state.updateMissingProductStatus,
      isPending: false,
      error,
      data: {},
    },
  };
};
const addMhProblemRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addMhProblem: {
      ...state.addMhProblem,
      isPending: true,
    },
  };
};

const addMhProblemSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    addMhProblem: {
      ...state.addMhProblem,
      isPending: false,
      data,
    },
  };
};

const addMhProblemFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addMhProblem: {
      ...state.addMhProblem,
      isPending: false,
      error,
      data: {},
    },
  };
};
const orderPartialRefundRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderPartialRefund: {
      ...state.orderPartialRefund,
      isPending: true,
    },
  };
};

const orderPartialRefundSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderPartialRefund: {
      ...state.orderPartialRefund,
      isPending: false,
      data: data || [],
    },
  };
};

const orderPartialRefundFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderPartialRefund: {
      ...state.orderPartialRefund,
      isPending: false,
      error,
    },
  };
};
export const getOrderCancelReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getOrderCancelReasons: {
      ...state.getOrderCancelReasons,
      isPending: true,
    },
  };
};

export const getOrderCancelReasonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getOrderCancelReasons: {
      ...state.getOrderCancelReasons,
      isPending: false,
      data: data?.cancelReasons || [],
    },
  };
};

export const getOrderCancelReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getOrderCancelReasons: {
      ...state.getOrderCancelReasons,
      isPending: false,
      error,
      data: [],
    },
  };
};

const setSelectedDomainType = (state = INITIAL_STATE, { domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType,
    },
  };
};

const setSelectedCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
    },
  };
};

const setSearchTerm = (state = INITIAL_STATE, { searchTerm }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchTerm,
    },
  };
};
const updateMissingOrderStatus = (state = INITIAL_STATE, { orderId }) => {
  const { data } = state.getMissingProductOrders;
  const orderIndex = findIndex(data, order => order?._id === orderId);
  data[orderIndex] = { ...data[orderIndex], mhProblem: { adminUser: getUser() }, status: GETIR_MARKET_ORDER.MH.PROBLEMS.STATUS.ACTIVE };
  return {
    ...state,
    getMissingProductOrders: {
      ...state.getMissingProductOrders,
      data,
    },
  };
};

const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      pagination: { currentPage, rowsPerPage },
    },
  };
};

const initPage = (state = INITIAL_STATE, { initialDomainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType: initialDomainType,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MISSING_PRODUCT_ORDERS_REQUEST]: getMissingProductOrdersRequest,
  [Types.GET_MISSING_PRODUCT_ORDERS_SUCCESS]: getMissingProductOrdersSuccess,
  [Types.GET_MISSING_PRODUCT_ORDERS_FAILURE]: getMissingProductOrdersFailure,
  [Types.GET_MARKET_ORDER_REQUEST]: getMarketOrderRequest,
  [Types.GET_MARKET_ORDER_SUCCESS]: getMarketOrderSuccess,
  [Types.GET_MARKET_ORDER_FAILURE]: getMarketOrderFailure,
  [Types.ADD_MH_PROBLEM_FAILURE]: addMhProblemFailure,
  [Types.ADD_MH_PROBLEM_REQUEST]: addMhProblemRequest,
  [Types.ADD_MH_PROBLEM_SUCCESS]: addMhProblemSuccess,
  [Types.ORDER_PARTIAL_REFUND_FAILURE]: orderPartialRefundFailure,
  [Types.ORDER_PARTIAL_REFUND_REQUEST]: orderPartialRefundRequest,
  [Types.ORDER_PARTIAL_REFUND_SUCCESS]: orderPartialRefundSuccess,
  [Types.UPDATE_MISSING_PRODUCT_STATUS_FAILURE]: updateMissingProductStatusFailure,
  [Types.UPDATE_MISSING_PRODUCT_STATUS_REQUEST]: updateMissingProductStatusRequest,
  [Types.UPDATE_MISSING_PRODUCT_STATUS_SUCCESS]: updateMissingProductStatusSuccess,
  [Types.GET_ORDER_CANCEL_REASONS_FAILURE]: getOrderCancelReasonsFailure,
  [Types.GET_ORDER_CANCEL_REASONS_REQUEST]: getOrderCancelReasonsRequest,
  [Types.GET_ORDER_CANCEL_REASONS_SUCCESS]: getOrderCancelReasonsSuccess,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_SELECTED_CITY]: setSelectedCity,
  [Types.SET_SEARCH_TERM]: setSearchTerm,
  [Types.SET_PAGINATION]: setPagination,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
  [Types.UPDATE_MISSING_ORDER_STATUS]: updateMissingOrderStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
