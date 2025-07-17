import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  campaigns: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getCampaignsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    campaigns: {
      ...INITIAL_STATE.campaigns,
      isPending: true,
    },
  };
};

export const getCampaignsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    campaigns: {
      ...INITIAL_STATE.campaigns,
      data,
      isPending: false,
    },
  };
};

export const getCampaignsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    campaigns: {
      ...INITIAL_STATE.campaigns,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CAMPAIGNS_REQUEST]: getCampaignsRequest,
  [Types.GET_CAMPAIGNS_SUCCESS]: getCampaignsSuccess,
  [Types.GET_CAMPAIGNS_FAILURE]: getCampaignsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
