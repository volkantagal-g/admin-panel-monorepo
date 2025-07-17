import { createReducer } from 'reduxsauce';
import { isEmpty } from 'lodash';

import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import { Types } from './actions';

const INITIAL_STATE_SKELETON = {
  data: null,
  isPending: false,
  error: null,
};

export const INITIAL_STATE = {
  rawData: {
    current: { ...INITIAL_STATE_SKELETON },
    previous: { ...INITIAL_STATE_SKELETON },
  },
  orderCounts: { ...INITIAL_STATE_SKELETON },
  missedOrderCounts: { ...INITIAL_STATE_SKELETON },
  netRevenues: { ...INITIAL_STATE_SKELETON },
  orderCountsOfDeliveryType: {
    [GETIR_FOOD_DOMAIN_TYPE]: { ...INITIAL_STATE_SKELETON },
    [GETIR_LOCALS_DOMAIN_TYPE]: { ...INITIAL_STATE_SKELETON },
  },
  missedOrderCountsOfDeliveryType: {
    [GETIR_FOOD_DOMAIN_TYPE]: { ...INITIAL_STATE_SKELETON },
    [GETIR_LOCALS_DOMAIN_TYPE]: { ...INITIAL_STATE_SKELETON },
  },
  netRevenueOfDeliveryType: {
    [GETIR_FOOD_DOMAIN_TYPE]: { ...INITIAL_STATE_SKELETON },
    [GETIR_LOCALS_DOMAIN_TYPE]: { ...INITIAL_STATE_SKELETON },
  },
  configs: { ...INITIAL_STATE_SKELETON },
};

export const getRawDataByDateAndTypeRequest = (state = INITIAL_STATE, { requestType }) => {
  return {
    ...state,
    rawData: {
      ...state.rawData,
      [requestType]: {
        ...state.rawData[requestType],
        isPending: true,
      },
    },
  };
};

export const getRawDataByDateAndTypeSuccess = (state = INITIAL_STATE, { data, requestType }) => {
  return {
    ...state,
    rawData: {
      ...state.rawData,
      [requestType]: {
        ...state.rawData[requestType],
        data,
        isPending: false,
      },
    },
  };
};

export const getRawDataByDateAndTypeFailure = (state = INITIAL_STATE, { error, requestType }) => {
  return {
    ...state,
    rawData: {
      ...state.rawData,
      [requestType]: {
        ...state.rawData[requestType],
        isPending: false,
        error,
      },
    },
  };
};

export const getOrderCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCounts: {
      ...state.orderCounts,
      isPending: true,
    },
  };
};

export const getOrderCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderCounts: {
      ...state.orderCounts,
      data,
      isPending: false,
    },
  };
};

export const getOrderCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCounts: {
      ...state.orderCounts,
      isPending: false,
      error,
    },
  };
};

export const getMissedOrderCountsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    missedOrderCounts: {
      ...state.missedOrderCounts,
      isPending: true,
    },
  };
};

export const getMissedOrderCountsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    missedOrderCounts: {
      ...state.missedOrderCounts,
      data,
      isPending: false,
    },
  };
};

export const getMissedOrderCountsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    missedOrderCounts: {
      ...state.missedOrderCounts,
      isPending: false,
      error,
    },
  };
};

export const getNetRevenuesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    netRevenues: {
      ...state.netRevenues,
      isPending: true,
    },
  };
};

export const getNetRevenuesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    netRevenues: {
      ...state.netRevenues,
      data,
      isPending: false,
    },
  };
};

export const getNetRevenuesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    netRevenues: {
      ...state.netRevenues,
      isPending: false,
      error,
    },
  };
};

export const getOrderCountsOfDeliveryTypesRequest = (state = INITIAL_STATE, { requestDomain }) => {
  const domainState = isEmpty(state.orderCountsOfDeliveryType[requestDomain])
    ? { ...INITIAL_STATE_SKELETON }
    : state.orderCountsOfDeliveryType[requestDomain];

  return {
    ...state,
    orderCountsOfDeliveryType: {
      ...state.orderCountsOfDeliveryType,
      [requestDomain]: {
        ...domainState,
        isPending: true,
      },
    },
  };
};

export const getOrderCountsOfDeliveryTypesSuccess = (state = INITIAL_STATE, { data, requestDomain }) => {
  return {
    ...state,
    orderCountsOfDeliveryType: {
      ...state.orderCountsOfDeliveryType,
      [requestDomain]: {
        ...state.orderCountsOfDeliveryType[requestDomain],
        data,
        isPending: false,
      },
    },
  };
};

export const getOrderCountsOfDeliveryTypesFailure = (state = INITIAL_STATE, { error, requestDomain }) => {
  return {
    ...state,
    orderCountsOfDeliveryType: {
      ...state.orderCountsOfDeliveryType,
      [requestDomain]: {
        ...state.orderCountsOfDeliveryType[requestDomain],
        isPending: false,
        error,
      },
    },
  };
};

export const getMissedOrderCountsOfDeliveryTypesRequest = (state = INITIAL_STATE, { requestDomain }) => {
  const domainState = isEmpty(state.missedOrderCountsOfDeliveryType[requestDomain])
    ? { ...INITIAL_STATE_SKELETON }
    : state.missedOrderCountsOfDeliveryType[requestDomain];

  return {
    ...state,
    missedOrderCountsOfDeliveryType: {
      ...state.missedOrderCountsOfDeliveryType,
      [requestDomain]: {
        ...domainState,
        isPending: true,
      },
    },
  };
};

export const getMissedOrderCountsOfDeliveryTypesSuccess = (state = INITIAL_STATE, { data, requestDomain }) => {
  return {
    ...state,
    missedOrderCountsOfDeliveryType: {
      ...state.missedOrderCountsOfDeliveryType,
      [requestDomain]: {
        ...state.missedOrderCountsOfDeliveryType[requestDomain],
        data,
        isPending: false,
      },
    },
  };
};

export const getMissedOrderCountsOfDeliveryTypesFailure = (state = INITIAL_STATE, { error, requestDomain }) => {
  return {
    ...state,
    missedOrderCountsOfDeliveryType: {
      ...state.missedOrderCountsOfDeliveryType,
      [requestDomain]: {
        ...state.missedOrderCountsOfDeliveryType[requestDomain],
        isPending: false,
        error,
      },
    },
  };
};

export const getNetRevenuesOfDeliveryTypesRequest = (state = INITIAL_STATE, { requestDomain }) => {
  const domainState = isEmpty(state.netRevenueOfDeliveryType[requestDomain])
    ? { ...INITIAL_STATE_SKELETON }
    : state.netRevenueOfDeliveryType[requestDomain];

  return {
    ...state,
    netRevenueOfDeliveryType: {
      ...state.netRevenueOfDeliveryType,
      [requestDomain]: {
        ...domainState,
        isPending: true,
      },
    },
  };
};

export const getNetRevenuesOfDeliveryTypesSuccess = (state = INITIAL_STATE, { data, requestDomain }) => {
  return {
    ...state,
    netRevenueOfDeliveryType: {
      ...state.netRevenueOfDeliveryType,
      [requestDomain]: {
        ...state.netRevenueOfDeliveryType[requestDomain],
        data,
        isPending: false,
      },
    },
  };
};

export const getNetRevenuesOfDeliveryTypesFailure = (state = INITIAL_STATE, { error, requestDomain }) => {
  return {
    ...state,
    netRevenueOfDeliveryType: {
      ...state.netRevenueOfDeliveryType,
      [requestDomain]: {
        ...state.netRevenueOfDeliveryType[requestDomain],
        isPending: false,
        error,
      },
    },
  };
};

export const getConfigWKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    configs: {
      ...state.configs,
      isPending: true,
    },
  };
};

export const getConfigWKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    configs: {
      ...state.configs,
      data,
      isPending: false,
    },
  };
};

export const getConfigWKeyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    configs: {
      ...state.configs,
      error,
      isPending: false,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RAW_DATA_BY_DATE_AND_TYPE_REQUEST]: getRawDataByDateAndTypeRequest,
  [Types.GET_RAW_DATA_BY_DATE_AND_TYPE_SUCCESS]: getRawDataByDateAndTypeSuccess,
  [Types.GET_RAW_DATA_BY_DATE_AND_TYPE_FAILURE]: getRawDataByDateAndTypeFailure,

  [Types.GET_ORDER_COUNTS_REQUEST]: getOrderCountsRequest,
  [Types.GET_ORDER_COUNTS_SUCCESS]: getOrderCountsSuccess,
  [Types.GET_ORDER_COUNTS_FAILURE]: getOrderCountsFailure,

  [Types.GET_MISSED_ORDER_COUNTS_REQUEST]: getMissedOrderCountsRequest,
  [Types.GET_MISSED_ORDER_COUNTS_SUCCESS]: getMissedOrderCountsSuccess,
  [Types.GET_MISSED_ORDER_COUNTS_FAILURE]: getMissedOrderCountsFailure,

  [Types.GET_NET_REVENUES_REQUEST]: getNetRevenuesRequest,
  [Types.GET_NET_REVENUES_SUCCESS]: getNetRevenuesSuccess,
  [Types.GET_NET_REVENUES_FAILURE]: getNetRevenuesFailure,

  [Types.GET_ORDER_COUNTS_OF_DELIVERY_TYPES_REQUEST]: getOrderCountsOfDeliveryTypesRequest,
  [Types.GET_ORDER_COUNTS_OF_DELIVERY_TYPES_SUCCESS]: getOrderCountsOfDeliveryTypesSuccess,
  [Types.GET_ORDER_COUNTS_OF_DELIVERY_TYPES_FAILURE]: getOrderCountsOfDeliveryTypesFailure,

  [Types.GET_MISSED_ORDER_COUNTS_OF_DELIVERY_TYPES_REQUEST]: getMissedOrderCountsOfDeliveryTypesRequest,
  [Types.GET_MISSED_ORDER_COUNTS_OF_DELIVERY_TYPES_SUCCESS]: getMissedOrderCountsOfDeliveryTypesSuccess,
  [Types.GET_MISSED_ORDER_COUNTS_OF_DELIVERY_TYPES_FAILURE]: getMissedOrderCountsOfDeliveryTypesFailure,

  [Types.GET_NET_REVENUES_OF_DELIVERY_TYPES_REQUEST]: getNetRevenuesOfDeliveryTypesRequest,
  [Types.GET_NET_REVENUES_OF_DELIVERY_TYPES_SUCCESS]: getNetRevenuesOfDeliveryTypesSuccess,
  [Types.GET_NET_REVENUES_OF_DELIVERY_TYPES_FAILURE]: getNetRevenuesOfDeliveryTypesFailure,

  [Types.GET_CONFIG_W_KEY_REQUEST]: getConfigWKeyRequest,
  [Types.GET_CONFIG_W_KEY_SUCCESS]: getConfigWKeySuccess,
  [Types.GET_CONFIG_W_KEY_FAILURE]: getConfigWKeyFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
