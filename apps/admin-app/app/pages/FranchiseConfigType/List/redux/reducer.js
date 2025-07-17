import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  configTypeList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const getFranchiseConfigTypeListRequest = state => {
  return {
    ...state,
    configTypeList: {
      ...state.configTypeList,
      isPending: true,
    },
  };
};

export const getFranchiseConfigTypeListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    configTypeList: {
      ...state.configTypeList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getFranchiseConfigTypeListFailure = state => {
  return {
    ...state,
    configTypeList: {
      ...state.configTypeList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const deleteFranchiseConfigTypeRequest = state => {
  return {
    ...state,
    configTypeList: {
      ...state.configTypeList,
      isPending: true,
    },
  };
};

export const deleteFranchiseConfigTypeSuccess = (state, { id = undefined }) => {
  return {
    ...state,
    configTypeList: {
      ...state.configTypeList,
      data: [...state.configTypeList.data.filter(configType => configType._id !== id)],
      total: state.configTypeList.total - 1,
      isPending: false,
    },
  };
};

export const deleteFranchiseConfigTypeFailure = state => {
  return {
    ...state,
    configTypeList: {
      ...state.configTypeList,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_CONFIG_TYPE_LIST_REQUEST]: getFranchiseConfigTypeListRequest,
  [Types.GET_FRANCHISE_CONFIG_TYPE_LIST_SUCCESS]: getFranchiseConfigTypeListSuccess,
  [Types.GET_FRANCHISE_CONFIG_TYPE_LIST_FAILURE]: getFranchiseConfigTypeListFailure,
  [Types.DELETE_FRANCHISE_CONFIG_TYPE_REQUEST]: deleteFranchiseConfigTypeRequest,
  [Types.DELETE_FRANCHISE_CONFIG_TYPE_SUCCESS]: deleteFranchiseConfigTypeSuccess,
  [Types.DELETE_FRANCHISE_CONFIG_TYPE_FAILURE]: deleteFranchiseConfigTypeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
