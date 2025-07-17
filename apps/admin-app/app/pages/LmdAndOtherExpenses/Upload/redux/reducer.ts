import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  fileUpload: {
    isPending: false,
    errors: [],
  },
};

const uploadLastMileDeliveryCostRequest = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: true,
      errors: [],
    },
  };
};

const uploadLastMileDeliveryCostSuccess = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: false,
      errors: [],
    },
  };
};

const uploadLastMileDeliveryCostFailed = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: false,
      errors: [],
    },
  };
};

const uploadLogisticCostRequest = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: true,
      errors: [],
    },
  };
};

const uploadLogisticCostSuccess = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: false,
      errors: [],
    },
  };
};

const uploadLogisticCostFailed = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: false,
      errors: [],
    },
  };
};

const uploadOtherCostRequest = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: true,
      errors: [],
    },
  };
};

const uploadOtherCostSuccess = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: false,
      errors: [],
    },
  };
};

const uploadOtherCostFailed = (state: any) => {
  return {
    ...state,
    fileUpload: {
      isPending: false,
      errors: [],
    },
  };
};

const setErrors = (state:any, { errors }: {errors: []}) => {
  return {
    fileUpload: {
      ...state.fileUpload,
      errors,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

const resetUpload = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.UPLOAD_LAST_MILE_DELIVERY_COST_REQUEST]: uploadLastMileDeliveryCostRequest,
  [Types.UPLOAD_LAST_MILE_DELIVERY_COST_SUCCESS]: uploadLastMileDeliveryCostSuccess,
  [Types.UPLOAD_LAST_MILE_DELIVERY_COST_FAILED]: uploadLogisticCostFailed,

  [Types.UPLOAD_LOGISTIC_COST_REQUEST]: uploadLogisticCostRequest,
  [Types.UPLOAD_LOGISTIC_COST_SUCCESS]: uploadLogisticCostSuccess,
  [Types.UPLOAD_LOGISTIC_COST_FAILED]: uploadLogisticCostFailed,

  [Types.UPLOAD_OTHER_COST_REQUEST]: uploadOtherCostRequest,
  [Types.UPLOAD_OTHER_COST_SUCCESS]: uploadOtherCostSuccess,
  [Types.UPLOAD_OTHER_COST_FAILED]: uploadOtherCostFailed,

  [Types.SET_ERRORS]: setErrors,
  [Types.RESET_UPLOAD]: resetUpload,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
