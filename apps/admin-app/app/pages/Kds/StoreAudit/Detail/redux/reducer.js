import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  storeAuditDetail: {
    data: {},
    initialData: {},
    auditFormTypeName: null,
    isPending: false,
    error: null,
    uploadedImageCollapsePanel: {
      questionGroupIds: [],
      questionIds: [],
    },
  },
};

export const getStoreAuditDetailRequest = state => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: true,
    },
  };
};

export const getStoreAuditDetailSuccess = (state, { data, initialData }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      data,
      initialData,
      isPending: false,
    },
  };
};

export const getStoreAuditDetailFailure = (state, { error }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: false,
      error,
    },
  };
};

export const updateStoreAuditAnswerRequest = state => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: true,
    },
  };
};

export const updateStoreAuditAnswerSuccess = (state, { data, uploadedImageCollapsePanel }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      data,
      uploadedImageCollapsePanel,
      isPending: false,
    },
  };
};

export const updateStoreAuditAnswerFailure = (state, { error }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: false,
      error,
    },
  };
};

export const updateStoreAuditNoteRequest = state => {
  return {
    ...state,
    storeAuditDetail: { ...state.storeAuditDetail },
  };
};

export const updateStoreAuditNoteSuccess = (state, { data }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      data,
    },
  };
};

export const updateStoreAuditNoteFailure = (state, { error }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      error,
    },
  };
};

export const uploadImagesToS3Request = state => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: true,
    },
  };
};

export const uploadImagesToS3Success = state => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: false,
    },
  };
};

export const uploadImagesToS3Failure = (state, { error }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: false,
      error,
    },
  };
};

export const updateStoreAuditDetailRequest = state => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: true,
    },
  };
};

export const updateStoreAuditDetailFailure = (state, { error }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: false,
      error,
    },
  };
};

export const getKdsAuditFormTypeDetailRequest = state => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: true,
    },
  };
};

export const getKdsAuditFormTypeDetailSuccess = (state, { data }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      auditFormTypeName: data.name,
      isPending: false,
    },
  };
};

export const getKdsAuditFormTypeDetailFailure = (state, { error }) => {
  return {
    ...state,
    storeAuditDetail: {
      ...state.storeAuditDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_STORE_AUDIT_DETAIL_REQUEST]: getStoreAuditDetailRequest,
  [Types.GET_STORE_AUDIT_DETAIL_SUCCESS]: getStoreAuditDetailSuccess,
  [Types.GET_STORE_AUDIT_DETAIL_FAILURE]: getStoreAuditDetailFailure,
  [Types.UPDATE_STORE_AUDIT_ANSWER_REQUEST]: updateStoreAuditAnswerRequest,
  [Types.UPDATE_STORE_AUDIT_ANSWER_SUCCESS]: updateStoreAuditAnswerSuccess,
  [Types.UPDATE_STORE_AUDIT_ANSWER_FAILURE]: updateStoreAuditAnswerFailure,
  [Types.UPDATE_STORE_AUDIT_NOTE_REQUEST]: updateStoreAuditNoteRequest,
  [Types.UPDATE_STORE_AUDIT_NOTE_SUCCESS]: updateStoreAuditNoteSuccess,
  [Types.UPDATE_STORE_AUDIT_NOTE_FAILURE]: updateStoreAuditNoteFailure,
  [Types.UPLOAD_IMAGES_TO_S3_REQUEST]: uploadImagesToS3Request,
  [Types.UPLOAD_IMAGES_TO_S3_FAILURE]: uploadImagesToS3Failure,
  [Types.UPDATE_STORE_AUDIT_DETAIL_REQUEST]: updateStoreAuditDetailRequest,
  [Types.UPDATE_STORE_AUDIT_DETAIL_FAILURE]: updateStoreAuditDetailFailure,
  [Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_REQUEST]: getKdsAuditFormTypeDetailRequest,
  [Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_SUCCESS]: getKdsAuditFormTypeDetailSuccess,
  [Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_FAILURE]: getKdsAuditFormTypeDetailFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
