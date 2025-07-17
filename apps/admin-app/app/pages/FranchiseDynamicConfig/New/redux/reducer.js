import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseDynamicConfig: {
    isPending: false,
    error: null,
  },
};

export const createFranchiseDynamicConfigRequest = (state, { configType, values }) => {
  return {
    ...state,
    createFranchiseDynamicConfig: {
      ...state.createFranchiseDynamicConfig,
      configType,
      values,
      isPending: true,
    },
  };
};

export const createFranchiseDynamicConfigSuccess = state => {
  return {
    ...state,
    createFranchiseDynamicConfig: {
      ...state.createFranchiseDynamicConfig,
      isPending: false,
    },
  };
};

export const createFranchiseDynamicConfigFailure = (state, { error }) => {
  return {
    ...state,
    createFranchiseDynamicConfig: {
      ...state.createFranchiseDynamicConfig,
      isPending: false,
      error,
    },
  };
};

export const getFranchiseDynamicConfigTypeListRequest = state => {
  return {
    ...state,
    franchiseDynamicConfigTypeList: {
      ...state.franchiseDynamicConfigTypeList,
      isPending: true,
    },
  };
};

export const getFranchiseDynamicConfigTypeListSuccess = (state, { data = [] }) => {
  return {
    ...state,
    franchiseDynamicConfigTypeList: {
      ...state.franchiseDynamicConfigTypeList,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseDynamicConfigTypeListFailure = state => {
  return {
    ...state,
    franchiseDynamicConfigTypeList: {
      ...state.franchiseDynamicConfigTypeList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_FRANCHISE_DYNAMIC_CONFIG_REQUEST]: createFranchiseDynamicConfigRequest,
  [Types.CREATE_FRANCHISE_DYNAMIC_CONFIG_SUCCESS]: createFranchiseDynamicConfigSuccess,
  [Types.CREATE_FRANCHISE_DYNAMIC_CONFIG_FAILURE]: createFranchiseDynamicConfigFailure,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_REQUEST]: getFranchiseDynamicConfigTypeListRequest,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_SUCCESS]: getFranchiseDynamicConfigTypeListSuccess,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_FAILURE]: getFranchiseDynamicConfigTypeListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
