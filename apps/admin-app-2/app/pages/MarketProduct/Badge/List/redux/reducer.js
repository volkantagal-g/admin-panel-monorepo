import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getBadges: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductBadges: {
    data: [],
    isPending: false,
    error: null,
  },
  updateMarketProductBadgesBulk: {
    isPending: false,
    error: null,
  },
  selectedBadge: { data: {} },
};

export const getBadgesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getBadges: {
      ...INITIAL_STATE.getBadges,
      isPending: true,
    },
  };
};

export const getBadgesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getBadges: {
      ...INITIAL_STATE.getBadges,
      data,
      isPending: false,
    },
  };
};

export const getBadgesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getBadges: {
      ...INITIAL_STATE.getBadges,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductBadgesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductBadges: {
      ...INITIAL_STATE.getMarketProductBadges,
      isPending: true,
    },
  };
};

export const getMarketProductBadgesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductBadges: {
      ...INITIAL_STATE.getMarketProductBadges,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductBadgesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductBadges: {
      ...INITIAL_STATE.getMarketProductBadges,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductBadgesBulkRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductBadgesBulk: {
      ...INITIAL_STATE.updateMarketProductBadgesBulk,
      isPending: true,
    },
  };
};

export const updateMarketProductBadgesBulkSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductBadgesBulk: {
      ...INITIAL_STATE.updateMarketProductBadgesBulk,
      data,
      isPending: false,
    },
  };
};

export const updateMarketProductBadgesBulkFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductBadgesBulk: {
      ...INITIAL_STATE.updateMarketProductBadgesBulk,
      isPending: false,
      error,
    },
  };
};

export const setSelectedBadge = (state = INITIAL_STATE, { badge }) => {
  return {
    ...state,
    selectedBadge: {
      ...INITIAL_STATE.selectedBadge,
      data: badge,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BADGES_REQUEST]: getBadgesRequest,
  [Types.GET_BADGES_SUCCESS]: getBadgesSuccess,
  [Types.GET_BADGES_FAILURE]: getBadgesFailure,
  [Types.GET_MARKET_PRODUCT_BADGES_REQUEST]: getMarketProductBadgesRequest,
  [Types.GET_MARKET_PRODUCT_BADGES_SUCCESS]: getMarketProductBadgesSuccess,
  [Types.GET_MARKET_PRODUCT_BADGES_FAILURE]: getMarketProductBadgesFailure,
  [Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST]: updateMarketProductBadgesBulkRequest,
  [Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_SUCCESS]: updateMarketProductBadgesBulkSuccess,
  [Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_FAILURE]: updateMarketProductBadgesBulkFailure,
  [Types.SET_SELECTED_BADGE]: setSelectedBadge,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
