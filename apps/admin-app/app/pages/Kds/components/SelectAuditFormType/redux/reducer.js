import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  auditFormType: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getAuditFormTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    auditFormType: {
      ...state.auditFormType,
      isPending: true,
    },
  };
};

export const getAuditFormTypeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    auditFormType: {
      ...state.auditFormType,
      data,
      isPending: false,
    },
  };
};

export const getAuditFormTypeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    auditFormType: {
      ...state.auditFormType,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_AUDIT_FORM_TYPE_REQUEST]: getAuditFormTypeRequest,
  [Types.GET_AUDIT_FORM_TYPE_SUCCESS]: getAuditFormTypeSuccess,
  [Types.GET_AUDIT_FORM_TYPE_FAILURE]: getAuditFormTypeFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
