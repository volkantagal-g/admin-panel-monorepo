import { createReducer } from 'reduxsauce';

import { Types } from '../actions/planogram';

export const INITIAL_STATE = {
  sizeList: {
    data: [],
    isPending: false,
    error: null,
  },
  demographyList: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getPlanogramSizeListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    sizeList: {
      ...INITIAL_STATE.sizeList,
      isPending: true,
    },
  };
};

export const getPlanogramSizeListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    sizeList: {
      ...INITIAL_STATE.sizeList,
      data: data?.sizes,
      isPending: false,
    },
  };
};

export const getPlanogramSizeListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    sizeList: {
      ...INITIAL_STATE.sizeList,
      isPending: false,
      error,
    },
  };
};
export const getPlanogramDemographyListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    demographyList: {
      ...INITIAL_STATE.sizeList,
      isPending: true,
    },
  };
};

export const getPlanogramDemographyListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    demographyList: {
      ...INITIAL_STATE.sizeList,
      data: data?.demographies,
      isPending: false,
    },
  };
};

export const getPlanogramDemographyListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    demographyList: {
      ...INITIAL_STATE.sizeList,
      isPending: false,
      error,
    },
  };
};

export const HANDLERS = {
  [Types.GET_PLANOGRAM_SIZE_LIST_REQUEST]: getPlanogramSizeListRequest,
  [Types.GET_PLANOGRAM_SIZE_LIST_SUCCESS]: getPlanogramSizeListSuccess,
  [Types.GET_PLANOGRAM_SIZE_LIST_FAILURE]: getPlanogramSizeListFailure,
  [Types.GET_PLANOGRAM_DEMOGRAPHY_LIST_REQUEST]: getPlanogramDemographyListRequest,
  [Types.GET_PLANOGRAM_DEMOGRAPHY_LIST_SUCCESS]: getPlanogramDemographyListSuccess,
  [Types.GET_PLANOGRAM_DEMOGRAPHY_LIST_FAILURE]: getPlanogramDemographyListFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
