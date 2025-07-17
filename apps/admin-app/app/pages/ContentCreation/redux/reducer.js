import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getContentCreationTransactionId: {
    isPending: false,
    data: {},
    error: null,
  },
  getContentCreationTransactionDetails: {
    isPending: false,
    data: undefined,
    error: null,
  },
};

export const getContentCreationTransactionIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getContentCreationTransactionId: {
      ...state.getContentCreationTransactionId,
      isPending: true,
    },
  };
};
export const getContentCreationTransactionIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getContentCreationTransactionId: {
      data,
      isPending: false,
    },
  };
};
export const getContentCreationTransactionIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getContentCreationTransactionId: {
      ...state.getContentCreationTransactionId,
      isPending: false,
      error,
    },
  };
};

export const getContentCreationTransactionDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getContentCreationTransactionDetails: {
      ...state.getContentCreationTransactionDetails,
      isPending: true,
    },
  };
};
export const getContentCreationTransactionDetailsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getContentCreationTransactionDetails: {
      data,
      isPending: false,
    },
  };
};
export const getContentCreationTransactionDetailsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getContentCreationTransactionDetails: {
      ...state.getContentCreationTransactionDetails,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};
export const HANDLERS = {
  [Types.GET_CONTENT_CREATION_TRANSACTION_ID_REQUEST]: getContentCreationTransactionIdRequest,
  [Types.GET_CONTENT_CREATION_TRANSACTION_ID_SUCCESS]: getContentCreationTransactionIdSuccess,
  [Types.GET_CONTENT_CREATION_TRANSACTION_ID_FAILURE]: getContentCreationTransactionIdFailure,
  [Types.GET_CONTENT_CREATION_TRANSACTION_DETAILS_REQUEST]: getContentCreationTransactionDetailsRequest,
  [Types.GET_CONTENT_CREATION_TRANSACTION_DETAILS_SUCCESS]: getContentCreationTransactionDetailsSuccess,
  [Types.GET_CONTENT_CREATION_TRANSACTION_DETAILS_FAILURE]: getContentCreationTransactionDetailsFailure,
  [Types.DESTROY_PAGE]: destroy,
};
export default createReducer(INITIAL_STATE, HANDLERS);
