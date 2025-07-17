import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isNewFamilyModalOpen: false,
  createMarketProductFamily: {
    isPending: false,
    data: {},
    error: null,
  },
  getMarketProductFamilyList: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductFamilyDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const createMarketProductFamilyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProductFamily: {
      ...INITIAL_STATE.createMarketProductFamily,
      isPending: true,
    },
  };
};

export const createMarketProductFamilySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProductFamily: {
      ...INITIAL_STATE.createMarketProductFamily,
      data,
      isPending: false,
    },
  };
};

export const createMarketProductFamilyFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProductFamily: {
      ...INITIAL_STATE.createMarketProductFamily,
      isPending: false,
      error,
    },
  };
};

export const openNewFamilyModal = state => ({
  ...state,
  isNewFamilyModalOpen: true,
});

export const closeNewFamilyModal = state => ({
  ...state,
  isNewFamilyModalOpen: false,
});

export const getMarketProductFamilyListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductFamilyList: {
      ...state.getMarketProductFamilyList,
      isPending: true,
    },
  };
};

export const getMarketProductFamilyListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductFamilyList: {
      ...state.getMarketProductFamilyList,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductFamilyListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductFamilyList: {
      ...state.getMarketProductFamilyList,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductFamilyDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductFamilyDetail: {
      ...state.getMarketProductFamilyDetail,
      isPending: true,
    },
  };
};

export const getMarketProductFamilyDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductFamilyDetail: {
      ...state.getMarketProductFamilyDetail,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductFamilyDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductFamilyDetail: {
      ...state.getMarketProductFamilyDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_MARKET_PRODUCT_FAMILY_REQUEST]: createMarketProductFamilyRequest,
  [Types.CREATE_MARKET_PRODUCT_FAMILY_SUCCESS]: createMarketProductFamilySuccess,
  [Types.CREATE_MARKET_PRODUCT_FAMILY_FAILURE]: createMarketProductFamilyFailure,
  [Types.OPEN_NEW_FAMILY_MODAL]: openNewFamilyModal,
  [Types.CLOSE_NEW_FAMILY_MODAL]: closeNewFamilyModal,
  [Types.GET_MARKET_PRODUCT_FAMILY_LIST_REQUEST]: getMarketProductFamilyListRequest,
  [Types.GET_MARKET_PRODUCT_FAMILY_LIST_SUCCESS]: getMarketProductFamilyListSuccess,
  [Types.GET_MARKET_PRODUCT_FAMILY_LIST_FAILURE]: getMarketProductFamilyListFailure,
  [Types.GET_MARKET_PRODUCT_FAMILY_DETAIL_REQUEST]: getMarketProductFamilyDetailRequest,
  [Types.GET_MARKET_PRODUCT_FAMILY_DETAIL_SUCCESS]: getMarketProductFamilyDetailSuccess,
  [Types.GET_MARKET_PRODUCT_FAMILY_DETAIL_FAILURE]: getMarketProductFamilyDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
