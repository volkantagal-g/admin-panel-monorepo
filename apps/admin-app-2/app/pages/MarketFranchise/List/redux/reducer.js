import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketFranchises: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  filters: {
    cities: [],
    domainTypes: [],
    searchValue: "",
    isActivated: true,
  },
};

export const getMarketFranchisesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketFranchises: {
      ...state.marketFranchises,
      isPending: true,
    },
  };
};

export const getMarketFranchisesSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    marketFranchises: {
      ...state.marketFranchises,
      data,
      total,
      isPending: false,
    },
  };
};

export const getMarketFranchisesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    marketFranchises: {
      ...state.marketFranchises,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_FRANCHISES_REQUEST]: getMarketFranchisesRequest,
  [Types.GET_MARKET_FRANCHISES_SUCCESS]: getMarketFranchisesSuccess,
  [Types.GET_MARKET_FRANCHISES_FAILURE]: getMarketFranchisesFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
