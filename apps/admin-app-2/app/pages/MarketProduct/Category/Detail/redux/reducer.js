import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductCategoryById: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductCategory: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductCategoryAdditionalInfo: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductCategoryImageUrl: {
    isPending: false,
    error: null,
  },
  activateMarketProductCategory: {
    isPending: false,
    error: null,
  },
  deactivateMarketProductCategory: {
    isPending: false,
    error: null,
  },
  getMarketProductCategorySlugs: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getMarketProductCategoryByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductCategoryById: {
      ...INITIAL_STATE.getMarketProductCategoryById,
      isPending: true,
    },
  };
};

export const getMarketProductCategoryByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductCategoryById: {
      ...INITIAL_STATE.getMarketProductCategoryById,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategoryByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductCategoryById: {
      ...INITIAL_STATE.getMarketProductCategoryById,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductCategory: {
      ...INITIAL_STATE.updateMarketProductCategory,
      isPending: true,
    },
  };
};

export const updateMarketProductCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductCategory: {
      ...INITIAL_STATE.updateMarketProductCategory,
      data,
      isPending: false,
    },
  };
};

export const updateMarketProductCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductCategory: {
      ...INITIAL_STATE.updateMarketProductCategory,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductCategoryAdditionalInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductCategoryAdditionalInfo: {
      ...INITIAL_STATE.updateMarketProductCategoryAdditionalInfo,
      isPending: true,
    },
  };
};

export const updateMarketProductCategoryAdditionalInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductCategoryAdditionalInfo: {
      ...INITIAL_STATE.updateMarketProductCategoryAdditionalInfo,
      data,
      isPending: false,
    },
  };
};

export const updateMarketProductCategoryAdditionalInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductCategoryAdditionalInfo: {
      ...INITIAL_STATE.updateMarketProductCategoryAdditionalInfo,
      isPending: false,
      error,
    },
  };
};

export const updateMarketProductCategoryImageUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductCategoryImageUrl: {
      ...INITIAL_STATE.updateMarketProductCategoryImageUrl,
      isPending: true,
    },
  };
};

export const updateMarketProductCategoryImageUrlSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductCategoryImageUrl: {
      ...INITIAL_STATE.updateMarketProductCategoryImageUrl,
      isPending: false,
    },
  };
};

export const updateMarketProductCategoryImageUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductCategoryImageUrl: {
      ...INITIAL_STATE.updateMarketProductCategoryImageUrl,
      isPending: false,
      error,
    },
  };
};

export const activateMarketProductCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateMarketProductCategory: {
      ...INITIAL_STATE.activateMarketProductCategory,
      isPending: true,
    },
  };
};

export const activateMarketProductCategorySuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateMarketProductCategory: {
      ...INITIAL_STATE.activateMarketProductCategory,
      isPending: false,
    },
  };
};

export const activateMarketProductCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activateMarketProductCategory: {
      ...INITIAL_STATE.activateMarketProductCategory,
      isPending: false,
      error,
    },
  };
};

export const deactivateMarketProductCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateMarketProductCategory: {
      ...INITIAL_STATE.deactivateMarketProductCategory,
      isPending: true,
    },
  };
};

export const deactivateMarketProductCategorySuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateMarketProductCategory: {
      ...INITIAL_STATE.deactivateMarketProductCategory,
      isPending: false,
    },
  };
};

export const deactivateMarketProductCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deactivateMarketProductCategory: {
      ...INITIAL_STATE.deactivateMarketProductCategory,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductCategorySlugsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductCategorySlugs: {
      ...INITIAL_STATE.getMarketProductCategorySlugs,
      isPending: true,
    },
  };
};

export const getMarketProductCategorySlugsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductCategorySlugs: {
      ...INITIAL_STATE.getMarketProductCategorySlugs,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductCategorySlugsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductCategorySlugs: {
      ...INITIAL_STATE.getMarketProductCategorySlugs,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST]: getMarketProductCategoryByIdRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_SUCCESS]: getMarketProductCategoryByIdSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_FAILURE]: getMarketProductCategoryByIdFailure,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST]: updateMarketProductCategoryRequest,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_SUCCESS]: updateMarketProductCategorySuccess,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_FAILURE]: updateMarketProductCategoryFailure,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST]: updateMarketProductCategoryAdditionalInfoRequest,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_SUCCESS]: updateMarketProductCategoryAdditionalInfoSuccess,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_FAILURE]: updateMarketProductCategoryAdditionalInfoFailure,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST]: updateMarketProductCategoryImageUrlRequest,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_SUCCESS]: updateMarketProductCategoryImageUrlSuccess,
  [Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_FAILURE]: updateMarketProductCategoryImageUrlFailure,
  [Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST]: activateMarketProductCategoryRequest,
  [Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS]: activateMarketProductCategorySuccess,
  [Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE]: activateMarketProductCategoryFailure,
  [Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST]: deactivateMarketProductCategoryRequest,
  [Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS]: deactivateMarketProductCategorySuccess,
  [Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE]: deactivateMarketProductCategoryFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST]: getMarketProductCategorySlugsRequest,
  [Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_SUCCESS]: getMarketProductCategorySlugsSuccess,
  [Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_FAILURE]: getMarketProductCategorySlugsFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
