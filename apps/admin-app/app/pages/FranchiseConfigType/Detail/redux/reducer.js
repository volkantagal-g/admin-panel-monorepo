import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseConfigTypeDetail: {
    data: {},
    initialData: {},
    isPending: false,
    isFetching: false,
    error: null,
  },
};

export const getFranchiseConfigTypeDetailRequest = state => {
  return {
    ...state,
    franchiseConfigTypeDetail: {
      ...state.franchiseConfigTypeDetail,
      isFetching: true,
    },
  };
};

export const getFranchiseConfigTypeDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseConfigTypeDetail: {
      data,
      isFetching: false,
    },
  };
};

export const getFranchiseConfigTypeDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseConfigTypeDetail: {
      ...state.franchiseConfigTypeDetail,
      isFetching: false,
      fetchingError: error,
    },
  };
};

export const updateFranchiseConfigTypeDetailRequest = state => {
  return {
    ...state,
    franchiseConfigTypeDetail: {
      ...state.franchiseConfigTypeDetail,
      isPending: true,
      isFetching: false,
    },
  };
};

export const updateFranchiseConfigTypeDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseConfigTypeDetail: {
      ...state.franchiseConfigTypeDetail,
      data,
      isPending: false,
      isFetching: false,
    },
  };
};

export const updateFranchiseConfigTypeDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseConfigTypeDetail: {
      ...state.franchiseConfigTypeDetail,
      isPending: false,
      isFetching: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_REQUEST]: getFranchiseConfigTypeDetailRequest,
  [Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_SUCCESS]: getFranchiseConfigTypeDetailSuccess,
  [Types.GET_FRANCHISE_CONFIG_TYPE_DETAIL_FAILURE]: getFranchiseConfigTypeDetailFailure,
  [Types.UPDATE_FRANCHISE_CONFIG_TYPE_DETAIL_REQUEST]: updateFranchiseConfigTypeDetailRequest,
  [Types.UPDATE_FRANCHISE_CONFIG_TYPE_DETAIL_SUCCESS]: updateFranchiseConfigTypeDetailSuccess,
  [Types.UPDATE_FRANCHISE_CONFIG_TYPE_DETAIL_FAILURE]: updateFranchiseConfigTypeDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
