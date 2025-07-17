import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  kdsAuditFormTypeList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const kdsAuditFromTypeListRequest = state => {
  return {
    ...state,
    kdsAuditFormTypeList: {
      ...state.kdsAuditFormTypeList,
      isPending: true,
    },
  };
};

export const kdsAuditFormTypeListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    kdsAuditFormTypeList: {
      ...state.kdsAuditFormTypeList,
      data,
      total,
      isPending: false,
    },
  };
};

export const kdsAuditFormTypeListFailure = state => {
  return {
    ...state,
    kdsAuditFormTypeList: {
      ...state.kdsAuditFormTypeList,
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
  [Types.GET_KDS_AUDIT_FORM_TYPE_LIST_REQUEST]: kdsAuditFromTypeListRequest,
  [Types.GET_KDS_AUDIT_FORM_TYPE_LIST_SUCCESS]: kdsAuditFormTypeListSuccess,
  [Types.GET_KDS_AUDIT_FORM_TYPE_LIST_FAILURE]: kdsAuditFormTypeListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
