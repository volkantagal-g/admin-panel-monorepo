import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createMarketProductGroup: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createMarketProductGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProductGroup: {
      ...INITIAL_STATE.createMarketProductGroup,
      isPending: true,
    },
  };
};

export const createMarketProductGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProductGroup: {
      ...INITIAL_STATE.createMarketProductGroup,
      data,
      isPending: false,
    },
  };
};

export const createMarketProductGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProductGroup: {
      ...INITIAL_STATE.createMarketProductGroup,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_PRODUCT_GROUP_REQUEST]: createMarketProductGroupRequest,
  [Types.CREATE_MARKET_PRODUCT_GROUP_SUCCESS]: createMarketProductGroupSuccess,
  [Types.CREATE_MARKET_PRODUCT_GROUP_FAILURE]: createMarketProductGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
