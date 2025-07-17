import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { serviceFee: {}, error: null };

export const serviceFeeBulkUploadRequest = (state = INITIAL_STATE, { requestBody }) => {
  return {
    ...state,
    serviceFee: requestBody,
    error: null,
  };
};

export const serviceFeeBulkUploadSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    serviceFee: data,
    error: null,
  };
};

export const serviceFeeBulkUploadFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    serviceFee: {},
    error,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SERVICE_FEE_BULK_UPLOAD_REQUEST]: serviceFeeBulkUploadRequest,
  [Types.SERVICE_FEE_BULK_UPLOAD_SUCCESS]: serviceFeeBulkUploadSuccess,
  [Types.SERVICE_FEE_BULK_UPLOAD_FAILURE]: serviceFeeBulkUploadFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
