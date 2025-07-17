import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseBillManagementList: {
    data: [],
    total: 0,
    isPending: false,
  },
  exportFranchiseBillManagementList: {
    isPending: false,
    error: null,
  },
};

export const getFranchiseBillManagementListRequest = state => {
  return {
    ...state,
    franchiseBillManagementList: {
      ...state.franchiseBillManagementList,
      isPending: true,
    },
  };
};

export const getFranchiseBillManagementListSuccess = (state, { data, total }) => {
  return {
    ...state,
    franchiseBillManagementList: {
      ...state.franchiseBillManagementList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getFranchiseBillManagementListFailure = state => {
  return {
    ...state,
    franchiseBillManagementList: {
      ...state.franchiseBillManagementList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const exportFranchiseBillListRequest = state => {
  return {
    ...state,
    exportFranchiseBillManagementList: {
      ...state.exportFranchiseBillManagementList,
      isPending: true,
    },
  };
};

export const exportFranchiseBillListSuccess = state => {
  return {
    ...state,
    exportFranchiseBillManagementList: {
      ...state.exportFranchiseBillManagementList,
      isPending: false,
    },
  };
};

export const exportFranchiseBillListFailure = (state, { error }) => {
  return {
    ...state,
    exportFranchiseBillManagementList: {
      ...state.exportFranchiseBillManagementList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_BILL_MANAGEMENT_LIST_REQUEST]: getFranchiseBillManagementListRequest,
  [Types.GET_FRANCHISE_BILL_MANAGEMENT_LIST_SUCCESS]: getFranchiseBillManagementListSuccess,
  [Types.GET_FRANCHISE_BILL_MANAGEMENT_LIST_FAILURE]: getFranchiseBillManagementListFailure,
  [Types.EXPORT_FRANCHISE_BILL_LIST_REQUEST]: exportFranchiseBillListRequest,
  [Types.EXPORT_FRANCHISE_BILL_LIST_SUCCESS]: exportFranchiseBillListSuccess,
  [Types.EXPORT_FRANCHISE_BILL_LIST_FAILURE]: exportFranchiseBillListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
