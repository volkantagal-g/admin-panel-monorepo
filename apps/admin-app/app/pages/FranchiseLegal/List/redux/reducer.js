import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseLegalList: {
    data: [],
    total: 0,
    isPending: false,
    isChangeStatusPending: false,
    error: null,
  },
};

export const getFranchiseLegalListRequest = state => {
  return {
    ...state,
    franchiseLegalList: {
      ...state.franchiseLegalList,
      isPending: true,
    },
  };
};

export const getFranchiseLegalListSuccess = (state, { data, total }) => {
  return {
    ...state,
    franchiseLegalList: {
      ...state.franchiseLegalList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getFranchiseLegalListFailure = (state, { error }) => {
  return {
    ...state,
    franchiseLegalList: {
      ...state.franchiseLegalList,
      isPending: false,
      error,
    },
  };
};

export const changeFranchiseLegalStatusRequest = state => {
  return {
    ...state,
    franchiseLegalList: {
      ...state.franchiseLegalList,
      isChangeStatusPending: true,
    },
  };
};

export const changeFranchiseLegalStatusSuccess = state => {
  return {
    ...state,
    franchiseLegalList: {
      ...state.franchiseLegalList,
      isChangeStatusPending: false,
    },
  };
};

export const changeFranchiseLegalStatusFailure = (state, { error }) => {
  return {
    ...state,
    franchiseLegalList: {
      ...state.franchiseLegalList,
      isChangeStatusPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_LEGAL_LIST_REQUEST]: getFranchiseLegalListRequest,
  [Types.GET_FRANCHISE_LEGAL_LIST_SUCCESS]: getFranchiseLegalListSuccess,
  [Types.GET_FRANCHISE_LEGAL_LIST_FAILURE]: getFranchiseLegalListFailure,
  [Types.CHANGE_FRANCHISE_LEGAL_STATUS_REQUEST]: changeFranchiseLegalStatusRequest,
  [Types.CHANGE_FRANCHISE_LEGAL_STATUS_SUCCESS]: changeFranchiseLegalStatusSuccess,
  [Types.CHANGE_FRANCHISE_LEGAL_STATUS_FAILURE]: changeFranchiseLegalStatusFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
