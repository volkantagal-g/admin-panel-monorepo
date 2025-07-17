import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getFeeDetails: {
    isPending: true,
    data: {
      warehouse: {},
      fees: {},
    },
    error: null,
  },
  getDynamicLevels: {
    isPending: true,
    data: {
      dynamicDeliveryFeeLevel: {},
      dynamicServiceFeeLevel: {},
    },
    error: null,
  },
};

const getFeeDetailsRequest = (state = INITIAL_STATE) => ({
  ...state,
  getFeeDetails: {
    ...state.getFeeDetails,
    isPending: true,
    error: null,
  },
});

const getFeeDetailsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  getFeeDetails: {
    ...state.getFeeDetails,
    isPending: false,
    data: {
      fee: data?.fee ?? {},
      warehouse: data?.warehouse ?? {},
    },
    error: null,
  },
});

const getFeeDetailsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  getFeeDetails: {
    ...state.getFeeDetails,
    isPending: false,
    error,
  },
});
const getDynamicLevelsRequest = (state = INITIAL_STATE) => ({
  ...state,
  getDynamicLevels: {
    ...state.getDynamicLevels,
    isPending: true,
    error: null,
  },
});

const getDynamicLevelsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  getDynamicLevels: {
    ...state.getDynamicLevels,
    isPending: false,
    data,
    error: null,
  },
});

const getDynamicLevelsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  getDynamicLevels: {
    ...state.getDynamicLevels,
    isPending: false,
    error,
  },
});

const updateDynamicDeliveryLevel = (state = INITIAL_STATE, { dynamicDeliveryFeeLevel }) => ({
  ...state,
  getDynamicLevels: {
    ...state.getDynamicLevels,
    data: {
      ...state.getDynamicLevels.data,
      dynamicDeliveryFeeLevel,
    },
  },
});
const updateDynamicServiceLevel = (state = INITIAL_STATE, { dynamicServiceFeeLevel }) => ({
  ...state,
  getDynamicLevels: {
    ...state.getDynamicLevels,
    data: {
      ...state.getDynamicLevels.data,
      dynamicServiceFeeLevel,
    },
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_FEE_DETAILS_REQUEST]: getFeeDetailsRequest,
  [Types.GET_FEE_DETAILS_SUCCESS]: getFeeDetailsSuccess,
  [Types.GET_FEE_DETAILS_FAILURE]: getFeeDetailsFailure,
  [Types.GET_DYNAMIC_LEVELS_REQUEST]: getDynamicLevelsRequest,
  [Types.GET_DYNAMIC_LEVELS_SUCCESS]: getDynamicLevelsSuccess,
  [Types.GET_DYNAMIC_LEVELS_FAILURE]: getDynamicLevelsFailure,
  [Types.UPDATE_DYNAMIC_DELIVERY_LEVEL]: updateDynamicDeliveryLevel,
  [Types.UPDATE_DYNAMIC_SERVICE_LEVEL]: updateDynamicServiceLevel,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
