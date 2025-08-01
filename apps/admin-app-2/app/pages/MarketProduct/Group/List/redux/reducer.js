import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductGroups: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getMarketProductGroupsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductGroups: {
      ...INITIAL_STATE.getMarketProductGroups,
      isPending: true,
    },
  };
};

export const getMarketProductGroupsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductGroups: {
      ...INITIAL_STATE.getMarketProductGroups,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductGroupsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductGroups: {
      ...INITIAL_STATE.getMarketProductGroups,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_GROUPS_REQUEST]: getMarketProductGroupsRequest,
  [Types.GET_MARKET_PRODUCT_GROUPS_SUCCESS]: getMarketProductGroupsSuccess,
  [Types.GET_MARKET_PRODUCT_GROUPS_FAILURE]: getMarketProductGroupsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
