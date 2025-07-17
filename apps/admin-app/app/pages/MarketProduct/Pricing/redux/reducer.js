import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductsPriceList: {
    data: [],
    isPending: false,
    error: null,
  },
  exportMarketProductSupplierBuyingPrices: {
    data: {},
    isPending: false,
    error: null,
  },
  getActiveMarketProducts: {
    data: [],
    isPending: false,
    error: null,
  },
  updateMarketProductPrice: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductDiscountedPrice: {
    isPending: false,
    data: {},
    error: null,
  },
  getMarketProductPriceDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  deletePrice: {
    isPending: false,
    data: {},
  },
  deleteDiscountedPrice: {
    isPending: false,
    data: {},
  },
};
export const getMarketProductsPriceListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductsPriceList: {
      ...state.getMarketProductsPriceList,
      isPending: true,
    },
  };
};

export const getMarketProductsPriceListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductsPriceList: {
      ...state.getMarketProductsPriceList,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductsPriceListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductsPriceList: {
      ...state.getMarketProductsPriceList,
      isPending: false,
      error,
    },
  };
};
export const getActiveMarketProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getActiveMarketProducts: {
      ...INITIAL_STATE.getActiveMarketProducts,
      isPending: true,
    },
  };
};

export const getActiveMarketProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getActiveMarketProducts: {
      ...INITIAL_STATE.getActiveMarketProducts,
      data,
      isPending: false,
    },
  };
};

export const getActiveMarketProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getActiveMarketProducts: {
      ...INITIAL_STATE.getActiveMarketProducts,
      isPending: false,
      error,
    },
  };
};
export const updateMarketProductPriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductPrice: {
      ...INITIAL_STATE.updateMarketProductPrice,
      isPending: true,
    },
  };
};
export const updateMarketProductPriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductPrice: {
      ...INITIAL_STATE.updateMarketProductPrice,
      data,
      isPending: false,
    },
  };
};
export const updateMarketProductPriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductPrice: {
      ...INITIAL_STATE.updateMarketProductPrice,
      isPending: false,
      error,
    },
  };
};
export const updateMarketProductDiscountedPriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductDiscountedPrice: {
      ...INITIAL_STATE.updateMarketProductDiscountedPrice,
      isPending: true,
    },
  };
};
export const updateMarketProductDiscountedPriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductDiscountedPrice: {
      ...INITIAL_STATE.updateMarketProductDiscountedPrice,
      data,
      isPending: false,
    },
  };
};
export const updateMarketProductDiscountedPriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductDiscountedPrice: {
      ...INITIAL_STATE.updateMarketProductDiscountedPrice,
      isPending: false,
      error,
    },
  };
};
export const getMarketProductPriceDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductPriceDetail: {
      ...state.getMarketProductPriceDetail,
      isPending: true,
    },
  };
};
export const getMarketProductPriceDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductPriceDetail: {
      ...state.getMarketProductPriceDetail,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductPriceDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductPriceDetail: {
      ...state.getMarketProductPriceDetail,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductDiscountedPriceDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductPriceDetail: {
      ...state.getMarketProductPriceDetail,
      isPending: true,
    },
  };
};
export const getMarketProductDiscountedPriceDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductPriceDetail: {
      ...state.getMarketProductPriceDetail,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductDiscountedPriceDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductPriceDetail: {
      ...state.getMarketProductPriceDetail,
      isPending: false,
      error,
    },
  };
};

export const deletePriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deletePrice: {
      ...state.deletePrice,
      isPending: true,
    },
  };
};
export const deletePriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deletePrice: {
      ...state.deletePrice,
      data,
      isPending: false,
    },
  };
};

export const deletePriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deletePrice: {
      ...state.deletePrice,
      data: [],
      isPending: false,
      error,
    },
  };
};

export const deleteDiscountedPriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteDiscountedPrice: {
      ...state.deleteDiscountedPrice,
      isPending: true,
    },
  };
};
export const deleteDiscountedPriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteDiscountedPrice: {
      ...state.deleteDiscountedPrice,
      data,
      isPending: false,
    },
  };
};

export const deleteDiscountedPriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteDiscountedPrice: {
      ...state.deleteDiscountedPrice,
      data: [],
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductSupplierBuyingPricesRequest = state => {
  return {
    ...state,
    exportMarketProductSupplierBuyingPrices: {
      ...INITIAL_STATE.exportMarketProductSupplierBuyingPrices,
      isPending: true,
    },
  };
};

export const exportMarketProductSupplierBuyingPricesSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductSupplierBuyingPrices: {
      ...INITIAL_STATE.exportMarketProductSupplierBuyingPrices,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductSupplierBuyingPricesFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductSupplierBuyingPrices: {
      ...INITIAL_STATE.exportMarketProductSupplierBuyingPrices,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCTS_PRICE_LIST_REQUEST]: getMarketProductsPriceListRequest,
  [Types.GET_MARKET_PRODUCTS_PRICE_LIST_SUCCESS]: getMarketProductsPriceListSuccess,
  [Types.GET_MARKET_PRODUCTS_PRICE_LIST_FAILURE]: getMarketProductsPriceListFailure,
  [Types.GET_ACTIVE_MARKET_PRODUCTS_REQUEST]: getActiveMarketProductsRequest,
  [Types.GET_ACTIVE_MARKET_PRODUCTS_SUCCESS]: getActiveMarketProductsSuccess,
  [Types.GET_ACTIVE_MARKET_PRODUCTS_FAILURE]: getActiveMarketProductsFailure,
  [Types.UPDATE_MARKET_PRODUCT_PRICE_REQUEST]: updateMarketProductPriceRequest,
  [Types.UPDATE_MARKET_PRODUCT_PRICE_SUCCESS]: updateMarketProductPriceSuccess,
  [Types.UPDATE_MARKET_PRODUCT_PRICE_FAILURE]: updateMarketProductPriceFailure,
  [Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_REQUEST]: updateMarketProductDiscountedPriceRequest,
  [Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_SUCCESS]: updateMarketProductDiscountedPriceSuccess,
  [Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_FAILURE]: updateMarketProductDiscountedPriceFailure,
  [Types.GET_MARKET_PRODUCT_PRICE_DETAIL_REQUEST]: getMarketProductPriceDetailRequest,
  [Types.GET_MARKET_PRODUCT_PRICE_DETAIL_SUCCESS]: getMarketProductPriceDetailSuccess,
  [Types.GET_MARKET_PRODUCT_PRICE_DETAIL_FAILURE]: getMarketProductPriceDetailFailure,
  [Types.GET_MARKET_PRODUCT_DISCOUNTED_PRICE_DETAIL_REQUEST]: getMarketProductDiscountedPriceDetailRequest,
  [Types.GET_MARKET_PRODUCT_DISCOUNTED_PRICE_DETAIL_SUCCESS]: getMarketProductDiscountedPriceDetailSuccess,
  [Types.GET_MARKET_PRODUCT_DISCOUNTED_PRICE_DETAIL_FAILURE]: getMarketProductDiscountedPriceDetailFailure,
  [Types.DELETE_PRICE_REQUEST]: deletePriceRequest,
  [Types.DELETE_PRICE_SUCCESS]: deletePriceSuccess,
  [Types.DELETE_PRICE_FAILURE]: deletePriceFailure,
  [Types.DELETE_DISCOUNTED_PRICE_REQUEST]: deleteDiscountedPriceRequest,
  [Types.DELETE_DISCOUNTED_PRICE_SUCCESS]: deleteDiscountedPriceSuccess,
  [Types.DELETE_DISCOUNTED_PRICE_FAILURE]: deleteDiscountedPriceFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
