import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  uploadFranchiseEarnings: {
    isPending: false,
    isSuccess: false,
  },
};

export const uploadFranchiseEarningsRequest = state => {
  return {
    ...state,
    uploadFranchiseEarnings: {
      ...state.uploadFranchiseEarnings,
      isPending: true,
    },
  };
};

export const uploadFranchiseEarningsSuccess = state => {
  return {
    ...state,
    uploadFranchiseEarnings: {
      ...state.uploadFranchiseEarnings,
      isSuccess: true,
      isPending: false,
    },
  };
};

export const uploadFranchiseEarningsFailure = state => {
  return {
    ...state,
    uploadFranchiseEarnings: {
      ...state.uploadFranchiseEarnings,
      isPending: false,
      isSuccess: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPLOAD_FRANCHISE_EARNINGS_REQUEST]: uploadFranchiseEarningsRequest,
  [Types.UPLOAD_FRANCHISE_EARNINGS_SUCCESS]: uploadFranchiseEarningsSuccess,
  [Types.UPLOAD_FRANCHISE_EARNINGS_FAILURE]: uploadFranchiseEarningsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
