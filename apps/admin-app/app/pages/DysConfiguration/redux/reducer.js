import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dysConfigs: {
    data: {
      market: {},
      sc: {},
      water: {},
    },
    isPending: false,
    error: null,
  },
};

export const getDysConfigsRequest = state => {
  return {
    ...state,
    dysConfigs: {
      ...state.dysConfigs,
      isPending: true,
    },
  };
};

export const getDysConfigsSuccess = (state, { data }) => {
  return {
    ...state,
    dysConfigs: {
      ...state.dysConfigs,
      data,
      isPending: false,
    },
  };
};

export const getDysConfigFailure = (state, { error }) => {
  return {
    ...state,
    dysConfigs: {
      ...state.dysConfigs,
      isPending: false,
      error,
    },
  };
};

export const updateDysConfigsRequest = state => {
  return {
    ...state,
    dysConfigs: {
      ...state.dysConfigs,
      isPending: true,
    },
  };
};

export const updateDysConfigsFailure = (state, { error }) => {
  return {
    ...state,
    dysConfigs: {
      ...state.dysConfigs,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DYS_CONFIGS_REQUEST]: getDysConfigsRequest,
  [Types.GET_DYS_CONFIGS_SUCCESS]: getDysConfigsSuccess,
  [Types.GET_DYS_CONFIGS_FAILURE]: getDysConfigFailure,
  [Types.UPDATE_DYS_CONFIGS_REQUEST]: updateDysConfigsRequest,
  [Types.UPDATE_DYS_CONFIGS_FAILURE]: updateDysConfigsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
