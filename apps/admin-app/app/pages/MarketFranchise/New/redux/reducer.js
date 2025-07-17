import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  form: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const createMarketFranchiseRequest = (state = INITIAL_STATE, { requestBody }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data: requestBody,
      isPending: true,
    },
  };
};

export const createMarketFranchiseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data,
      isPending: false,
    },
  };
};

export const createMarketFranchiseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_FRANCHISE_REQUEST]: createMarketFranchiseRequest,
  [Types.CREATE_MARKET_FRANCHISE_SUCCESS]: createMarketFranchiseSuccess,
  [Types.CREATE_MARKET_FRANCHISE_FAILURE]: createMarketFranchiseFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);