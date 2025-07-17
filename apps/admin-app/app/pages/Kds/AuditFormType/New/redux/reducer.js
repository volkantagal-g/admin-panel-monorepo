import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createKdsAuditFormType: {
    isPending: false,
    error: null,
  },
};

export const createKdsAuditFormTypeRequest = state => {
  return {
    ...state,
    createKdsAuditFormType: {
      ...state.createKdsAuditFormType,
      isPending: true,
    },
  };
};

export const createKdsAuditFormTypeSuccess = state => {
  return {
    ...state,
    createKdsAuditFormType: {
      ...state.createKdsAuditFormType,
      isPending: false,
    },
  };
};

export const createKdsAuditFormTypeFailure = (state, { error }) => {
  return {
    ...state,
    createKdsAuditFormType: {
      ...state.createKdsAuditFormType,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_KDS_AUDIT_FORM_TYPE_REQUEST]: createKdsAuditFormTypeRequest,
  [Types.CREATE_KDS_AUDIT_FORM_TYPE_SUCCESS]: createKdsAuditFormTypeSuccess,
  [Types.CREATE_KDS_AUDIT_FORM_TYPE_FAILURE]: createKdsAuditFormTypeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
