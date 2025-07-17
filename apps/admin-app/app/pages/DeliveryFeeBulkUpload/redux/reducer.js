import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { deliveryFee: {} };

export const deliveryFeeBulkUploadRequest = (state = INITIAL_STATE, { requestBody }) => {
  return {
    ...state,
    deliveryFee: requestBody,
  };
};

export const deliveryFeeBulkUploadSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deliveryFee: data,
  };
};

export const deliveryFeeBulkUploadFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deliveryFee: {},
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DELIVERY_FEE_BULK_UPLOAD_REQUEST]: deliveryFeeBulkUploadRequest,
  [Types.DELIVERY_FEE_BULK_UPLOAD_SUCCESS]: deliveryFeeBulkUploadSuccess,
  [Types.DELIVERY_FEE_BULK_UPLOAD_FAILURE]: deliveryFeeBulkUploadFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
