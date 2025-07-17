import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  storeAudit: {
    isPending: false,
    error: null,
  },
};

export const createStoreAuditRequest = state => {
  return {
    ...state,
    storeAudit: {
      ...state.storeAudit,
      isPending: true,
    },
  };
};

export const createStoreAuditSuccess = state => {
  return {
    ...state,
    storeAudit: {
      ...state.storeAudit,
      isPending: false,
    },
  };
};

export const createStoreAuditFailure = (state, { error }) => {
  return {
    ...state,
    storeAudit: {
      ...state.storeAudit,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_STORE_AUDIT_REQUEST]: createStoreAuditRequest,
  [Types.CREATE_STORE_AUDIT_SUCCESS]: createStoreAuditSuccess,
  [Types.CREATE_STORE_AUDIT_FAILURE]: createStoreAuditFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
