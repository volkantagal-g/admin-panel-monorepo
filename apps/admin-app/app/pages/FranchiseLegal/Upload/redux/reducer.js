import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  uploadFranchiseLegal: {
    isPending: false,
    isSuccess: false,
  },
};

export const uploadFranchiseLegalRequest = state => {
  return {
    ...state,
    uploadFranchiseLegal: {
      ...state.uploadFranchiseLegal,
      isPending: true,
    },
  };
};

export const uploadFranchiseLegalSuccess = state => {
  return {
    ...state,
    uploadFranchiseLegal: {
      ...state.uploadFranchiseLegal,
      isSuccess: true,
      isPending: false,
    },
  };
};

export const uploadFranchiseLegalFailure = state => {
  return {
    ...state,
    uploadFranchiseLegal: {
      ...state.uploadFranchiseLegal,
      isPending: false,
      isSuccess: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPLOAD_FRANCHISE_LEGAL_REQUEST]: uploadFranchiseLegalRequest,
  [Types.UPLOAD_FRANCHISE_LEGAL_SUCCESS]: uploadFranchiseLegalSuccess,
  [Types.UPLOAD_FRANCHISE_LEGAL_FAILURE]: uploadFranchiseLegalFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
