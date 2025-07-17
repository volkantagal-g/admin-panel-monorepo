import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseConfigDetail: {
    data: {},
    configTypeData: [],
    isPending: false,
    error: null,
  },
};

export const getFranchiseDynamicConfigDetailRequest = state => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      isPending: true,
    },
  };
};

export const getFranchiseDynamicConfigDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseConfigDetail: {
      data,
      isPending: false,
    },
  };
};

export const getFranchiseDynamicConfigDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      isPending: false,
      error,
    },
  };
};

export const updateFranchiseDynamicConfigRequest = state => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      isPending: true,
    },
  };
};

export const updateFranchiseDynamicConfigSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      data,
      isPending: false,
    },
  };
};

export const updateFranchiseDynamicConfigFailure = (state, { error }) => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      isPending: false,
      error,
    },
  };
};

export const getFranchiseConfigTypeDetailRequest = state => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      isPending: true,
    },
  };
};

export const getFranchiseConfigTypeDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      configTypeData: data,
      isPending: false,
    },
  };
};

export const getFranchiseConfigTypeDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseConfigDetail: {
      ...state.franchiseConfigDetail,
      isPending: false,
      fetchingError: error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_DETAIL_REQUEST]: getFranchiseDynamicConfigDetailRequest,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_DETAIL_SUCCESS]: getFranchiseDynamicConfigDetailSuccess,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_DETAIL_FAILURE]: getFranchiseDynamicConfigDetailFailure,
  [Types.UPDATE_FRANCHISE_DYNAMIC_CONFIG_REQUEST]: updateFranchiseDynamicConfigRequest,
  [Types.UPDATE_FRANCHISE_DYNAMIC_CONFIG_SUCCESS]: updateFranchiseDynamicConfigSuccess,
  [Types.UPDATE_FRANCHISE_DYNAMIC_CONFIG_FAILURE]: updateFranchiseDynamicConfigFailure,
  [Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_REQUEST]: getFranchiseConfigTypeDetailRequest,
  [Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_SUCCESS]: getFranchiseConfigTypeDetailSuccess,
  [Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_FAILURE]: getFranchiseConfigTypeDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
