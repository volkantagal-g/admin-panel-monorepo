import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsScoreMapping: {
    data: {
      GETIR10: [],
      MARKET: [],
      WATER: [],
      STORE_CONVERSION: [],
      MAIN_WAREHOUSE: [],
      questionType: '',
    },
    isPending: false,
  },
};

export const kdsScoreMappingRequest = state => {
  return {
    ...state,
    kdsScoreMapping: {
      ...state.kdsScoreMapping,
      isPending: true,
    },
  };
};

export const kdsScoreMappingSuccess = (state, { data = {} }) => {
  return {
    ...state,
    kdsScoreMapping: {
      ...state.kdsScoreMapping,
      data,
      isPending: false,
    },
  };
};

export const kdsScoreMappingFailure = (state, { error }) => {
  return {
    ...state,
    kdsScoreMapping: {
      ...state.kdsScoreMapping,
      data: {},
      isPending: false,
      error,
    },
  };
};

export const updateKdsScoreMappingRequest = state => {
  return {
    ...state,
    kdsScoreMapping: {
      ...state.kdsScoreMapping,
      isPending: true,
    },
  };
};

export const updateKdsScoreMappingFailure = (state, { error }) => {
  return {
    ...state,
    kdsScoreMapping: {
      ...state.kdsScoreMapping,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_KDS_SCORE_MAPPING_REQUEST]: kdsScoreMappingRequest,
  [Types.GET_KDS_SCORE_MAPPING_SUCCESS]: kdsScoreMappingSuccess,
  [Types.GET_KDS_SCORE_MAPPING_FAILURE]: kdsScoreMappingFailure,
  [Types.UPDATE_KDS_SCORE_MAPPING_REQUEST]: updateKdsScoreMappingRequest,
  [Types.UPDATE_KDS_SCORE_MAPPING_FAILURE]: updateKdsScoreMappingFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
