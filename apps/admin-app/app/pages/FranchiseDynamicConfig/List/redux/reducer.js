import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseDynamicConfigList: {
    data: [],
    total: 0,
    isPending: false,
  },
  franchiseDynamicConfigTypeList: {
    data: [],
    isPending: false,
  },
};

export const getFranchiseDynamicConfigListRequest = state => {
  return {
    ...state,
    franchiseDynamicConfigList: {
      ...state.franchiseDynamicConfigList,
      data: [],
      isPending: true,
    },
  };
};

export const getFranchiseDynamicConfigListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    franchiseDynamicConfigList: {
      ...state.franchiseDynamicConfigList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getFranchiseDynamicConfigListFailure = state => {
  return {
    ...state,
    franchiseDynamicConfigList: {
      ...state.franchiseDynamicConfigList,
      data: [],
      total: 0,
      isPending: false,
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
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_LIST_REQUEST]: getFranchiseDynamicConfigListRequest,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_LIST_SUCCESS]: getFranchiseDynamicConfigListSuccess,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_LIST_FAILURE]: getFranchiseDynamicConfigListFailure,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_REQUEST]: getFranchiseDynamicConfigTypeListRequest,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_SUCCESS]: getFranchiseDynamicConfigTypeListSuccess,
  [Types.GET_FRANCHISE_DYNAMIC_CONFIG_TYPE_LIST_FAILURE]: getFranchiseDynamicConfigTypeListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
