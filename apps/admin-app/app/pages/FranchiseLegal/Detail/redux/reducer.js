import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseLegalAgreement: {
    tableData: [],
    data: {},
    historyData: [],
    total: 0,
    isPending: false,
    isTableRequestPending: false,
    isHistoryTablePending: false,
    error: null,
  },
};

export const getFranchiseLegalAgreementTableRequest = state => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isTableRequestPending: true,
    },
  };
};

export const getFranchiseLegalAgreementTableSuccess = (state, { data, total }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      tableData: data,
      total,
      isTableRequestPending: false,
    },
  };
};

export const getFranchiseLegalAgreementTableFailure = (state, { error }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isTableRequestPending: false,
      error,
    },
  };
};

export const getFranchiseLegalAgreementDetailRequest = state => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isPending: true,
    },
  };
};

export const getFranchiseLegalAgreementDetailSuccess = (state, { data }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      data,
      isPending: false,
    },
  };
};

export const getFranchiseLegalAgreementDetailFailure = (state, { error }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isPending: false,
      error,
    },
  };
};

export const notifyFranchisesRequest = state => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isPending: true,
    },
  };
};

export const notifyFranchisesSuccess = state => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isPending: false,
    },
  };
};

export const notifyFranchisesFailure = (state, { error }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isPending: false,
      error,
    },
  };
};

export const getLegalNotificationHistoryRequest = state => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isHistoryTablePending: true,
    },
  };
};

export const getLegalNotificationHistorySuccess = (state, { data }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      historyData: data,
      isHistoryTablePending: false,
    },
  };
};

export const getLegalNotificationHistoryFailure = (state, { error }) => {
  return {
    ...state,
    franchiseLegalAgreement: {
      ...state.franchiseLegalAgreement,
      isHistoryTablePending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {

  [Types.GET_FRANCHISE_LEGAL_AGREEMENT_TABLE_REQUEST]: getFranchiseLegalAgreementTableRequest,
  [Types.GET_FRANCHISE_LEGAL_AGREEMENT_TABLE_SUCCESS]: getFranchiseLegalAgreementTableSuccess,
  [Types.GET_FRANCHISE_LEGAL_AGREEMENT_TABLE_FAILURE]: getFranchiseLegalAgreementTableFailure,
  [Types.GET_FRANCHISE_LEGAL_AGREEMENT_DETAIL_REQUEST]: getFranchiseLegalAgreementDetailRequest,
  [Types.GET_FRANCHISE_LEGAL_AGREEMENT_DETAIL_SUCCESS]: getFranchiseLegalAgreementDetailSuccess,
  [Types.GET_FRANCHISE_LEGAL_AGREEMENT_DETAIL_FAILURE]: getFranchiseLegalAgreementDetailFailure,
  [Types.NOTIFY_FRANCHISES_REQUEST]: notifyFranchisesRequest,
  [Types.NOTIFY_FRANCHISES_SUCCESS]: notifyFranchisesSuccess,
  [Types.NOTIFY_FRANCHISES_FAILURE]: notifyFranchisesFailure,
  [Types.GET_LEGAL_NOTIFICATION_HISTORY_REQUEST]: getLegalNotificationHistoryRequest,
  [Types.GET_LEGAL_NOTIFICATION_HISTORY_SUCCESS]: getLegalNotificationHistorySuccess,
  [Types.GET_LEGAL_NOTIFICATION_HISTORY_FAILURE]: getLegalNotificationHistoryFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
