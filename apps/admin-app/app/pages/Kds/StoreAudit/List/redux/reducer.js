import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsStoreAuditList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const kdsStoreAuditListRequest = state => {
  return {
    ...state,
    kdsStoreAuditList: {
      ...state.kdsStoreAuditList,
      isPending: true,
    },
  };
};

export const kdsStoreAuditListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    kdsStoreAuditList: {
      ...state.kdsStoreAuditList,
      data,
      total,
      isPending: false,
    },
  };
};

export const kdsStoreAuditListFailure = state => {
  return {
    ...state,
    kdsStoreAuditList: {
      ...state.kdsStoreAuditList,
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
  [Types.GET_KDS_STORE_AUDIT_LIST_REQUEST]: kdsStoreAuditListRequest,
  [Types.GET_KDS_STORE_AUDIT_LIST_SUCCESS]: kdsStoreAuditListSuccess,
  [Types.GET_KDS_STORE_AUDIT_LIST_FAILURE]: kdsStoreAuditListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
