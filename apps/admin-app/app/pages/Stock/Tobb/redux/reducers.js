import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  ids: [],
  processedRequests: [],
  failedRequests: [],
  invalidRequests: [],
  tobbGibRequest: {
    data: [],
    isPending: false,
    error: null,
  },
  exportTobbGibRequestSuccessRequests: {
    data: {},
    isPending: false,
    error: null,
  },
  exportTobbGibRequestInvalidRequests: {
    data: {},
    isPending: false,
    error: null,
  },
  exportTobbGibRequestFailedRequests: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getTobbGibRequestRequest = (state, { ids, isRetryFailedRequests }) => {
  return {
    ...state,
    ...(!isRetryFailedRequests ? { ids } : undefined),
    ...(!isRetryFailedRequests ? { failedRequests: INITIAL_STATE.failedRequests } : undefined),
    ...(!isRetryFailedRequests ? { invalidRequests: INITIAL_STATE.invalidRequests } : undefined),
    tobbGibRequest: {
      ...state.tobbGibRequest,
      ...(!isRetryFailedRequests ? { data: INITIAL_STATE.tobbGibRequest.data } : undefined),
      isPending: true,
    },
  };
};

export const getTobbGibRequestSuccess = (state, { data, invalidRequests, failedRequests }) => {
  return {
    ...state,
    invalidRequests,
    failedRequests,
    tobbGibRequest: {
      ...state.tobbGibRequest,
      data,
      isPending: false,
    },
  };
};

export const getTobbGibRequestFailure = (state, { error, data, invalidRequests, failedRequests }) => {
  return {
    ...state,
    invalidRequests,
    failedRequests,
    tobbGibRequest: {
      ...state.tobbGibRequest,
      data,
      isPending: false,
      error,
    },
  };
};

export const exportTobbGibRequestSuccessRequestsRequest = state => {
  return {
    ...state,
    exportTobbGibRequestSuccessRequests: {
      ...state.exportTobbGibRequestSuccessRequests,
      isPending: true,
    },
  };
};

export const exportTobbGibRequestSuccessRequestsSuccess = (state, { data }) => {
  return {
    ...state,
    exportTobbGibRequestSuccessRequests: {
      ...state.exportTobbGibRequestSuccessRequests,
      data,
      isPending: false,
    },
  };
};

export const exportTobbGibRequestSuccessRequestsFailure = (state, { error }) => {
  return {
    ...state,
    exportTobbGibRequestSuccessRequests: {
      ...state.exportTobbGibRequestSuccessRequests,
      isPending: false,
      error,
    },
  };
};

export const exportTobbGibRequestInvalidRequestsRequest = state => {
  return {
    ...state,
    exportTobbGibRequestInvalidRequests: {
      ...state.exportTobbGibRequestInvalidRequests,
      isPending: true,
    },
  };
};

export const exportTobbGibRequestInvalidRequestsSuccess = (state, { data }) => {
  return {
    ...state,
    exportTobbGibRequestInvalidRequests: {
      ...state.exportTobbGibRequestInvalidRequests,
      data,
      isPending: false,
    },
  };
};

export const exportTobbGibRequestInvalidRequestsFailure = (state, { error }) => {
  return {
    ...state,
    exportTobbGibRequestInvalidRequests: {
      ...state.exportTobbGibRequestInvalidRequests,
      isPending: false,
      error,
    },
  };
};

export const exportTobbGibRequestFailedRequestsRequest = state => {
  return {
    ...state,
    exportTobbGibRequestFailedRequests: {
      ...state.exportTobbGibRequestFailedRequests,
      isPending: true,
    },
  };
};

export const exportTobbGibRequestFailedRequestsSuccess = (state, { data }) => {
  return {
    ...state,
    exportTobbGibRequestFailedRequests: {
      ...state.exportTobbGibRequestFailedRequests,
      data,
      isPending: false,
    },
  };
};

export const exportTobbGibRequestFailedRequestsFailure = (state, { error }) => {
  return {
    ...state,
    exportTobbGibRequestFailedRequests: {
      ...state.exportTobbGibRequestFailedRequests,
      isPending: false,
      error,
    },
  };
};

export const setTobbGibRequestProcessedRequests = (state, { processedRequests }) => {
  return {
    ...state,
    processedRequests: [
      ...state.processedRequests,
      ...state.invalidRequests,
      ...processedRequests,
    ],
  };
};

export const resetTobbGibRequestProcessedRequests = (state, { processedRequests }) => {
  return {
    ...state,
    processedRequests,
  };
};

export const destroyPage = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_TOBB_GIB_REQUEST_REQUEST]: getTobbGibRequestRequest,
  [Types.GET_TOBB_GIB_REQUEST_SUCCESS]: getTobbGibRequestSuccess,
  [Types.GET_TOBB_GIB_REQUEST_FAILURE]: getTobbGibRequestFailure,

  [Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_REQUEST]: exportTobbGibRequestSuccessRequestsRequest,
  [Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_SUCCESS]: exportTobbGibRequestSuccessRequestsSuccess,
  [Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_FAILURE]: exportTobbGibRequestSuccessRequestsFailure,

  [Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_REQUEST]: exportTobbGibRequestInvalidRequestsRequest,
  [Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_SUCCESS]: exportTobbGibRequestInvalidRequestsSuccess,
  [Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_FAILURE]: exportTobbGibRequestInvalidRequestsFailure,

  [Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_REQUEST]: exportTobbGibRequestFailedRequestsRequest,
  [Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_SUCCESS]: exportTobbGibRequestFailedRequestsSuccess,
  [Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_FAILURE]: exportTobbGibRequestFailedRequestsFailure,

  [Types.SET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS]: setTobbGibRequestProcessedRequests,
  [Types.RESET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS]: resetTobbGibRequestProcessedRequests,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
