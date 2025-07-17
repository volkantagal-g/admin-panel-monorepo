import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsAuditFormTypeDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getKdsAuditFormTypeDetailRequest = state => {
  return {
    ...state,
    kdsAuditFormTypeDetail: {
      ...state.kdsAuditFormTypeDetail,
      isPending: true,
    },
  };
};

export const getKdsAuditFormTypeDetailSuccess = (state, { data }) => {
  return {
    ...state,
    kdsAuditFormTypeDetail: {
      ...state.kdsAuditFormTypeDetail,
      data,
      isPending: false,
    },
  };
};

export const getKdsAuditFormTypeDetailFailure = (state, { error }) => {
  return {
    ...state,
    kdsAuditFormTypeDetail: {
      ...state.kdsAuditFormTypeDetail,
      isPending: false,
      error,
    },
  };
};

export const updateKdsAuditFormTypeRequest = state => {
  return {
    ...state,
    kdsAuditFormTypeDetail: {
      ...state.kdsAuditFormTypeDetail,
      isPending: true,
    },
  };
};

export const updateKdsAuditFormTypeFailure = (state, { error }) => {
  return {
    ...state,
    kdsAuditFormTypeDetail: {
      ...state.kdsAuditFormTypeDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_REQUEST]: getKdsAuditFormTypeDetailRequest,
  [Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_SUCCESS]: getKdsAuditFormTypeDetailSuccess,
  [Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_FAILURE]: getKdsAuditFormTypeDetailFailure,
  [Types.UPDATE_KDS_AUDIT_FORM_TYPE_REQUEST]: updateKdsAuditFormTypeRequest,
  [Types.UPDATE_KDS_AUDIT_FORM_TYPE_FAILURE]: updateKdsAuditFormTypeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
