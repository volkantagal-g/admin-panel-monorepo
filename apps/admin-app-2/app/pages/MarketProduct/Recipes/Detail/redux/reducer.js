import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getRecipeById: {
    isPending: false,
    data: {},
    error: null,
  },
  updateRecipe: {
    isPending: false,
    data: {},
    error: null,
  },
  marketProducts: {
    isPending: false,
    data: {},
    error: null,
  },
  tableMarketProducts: {
    isPending: false,
    data: {},
    error: null,
  },
  modalMarketProducts: {
    isPending: false,
    data: {},
    error: null,
  },
  segments: {
    isPending: false,
    data: {},
    error: null,
  },
  createRecipeImageUrl: {
    uploadedImages: [],
    isPending: false,
    erroredImages: [],
  },
  isSubstituteProductsModalOpen: null,
};

export const getRecipeByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRecipeById: {
      ...state.getRecipeById,
      isPending: true,
    },
  };
};
export const getRecipeByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRecipeById: {
      data,
      isPending: false,
    },
  };
};
export const getRecipeByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRecipeById: {
      ...state.getRecipeById,
      isPending: false,
      error,
    },
  };
};
export const updateRecipeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateRecipe: {
      ...INITIAL_STATE.updateRecipe,
      isPending: true,
    },
  };
};
export const updateRecipeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateRecipe: {
      ...INITIAL_STATE.updateRecipe,
      data,
      isPending: false,
    },
  };
};
export const updateRecipeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateRecipe: {
      ...INITIAL_STATE.updateRecipe,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    marketProducts: {
      ...state.marketProducts,
      isPending: true,
    },
  };
};

export const getMarketProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    marketProducts: {
      ...state.marketProducts,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    marketProducts: {
      ...state.marketProducts,
      isPending: false,
      error,
    },
  };
};

export const getTableMarketProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    tableMarketProducts: {
      ...state.tableMarketProducts,
      isPending: true,
    },
  };
};

export const getTableMarketProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    tableMarketProducts: {
      ...state.tableMarketProducts,
      data,
      isPending: false,
    },
  };
};

export const getTableMarketProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    tableMarketProducts: {
      ...state.tableMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const getModalMarketProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    modalMarketProducts: {
      ...state.modalMarketProducts,
      isPending: true,
    },
  };
};

export const getModalMarketProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    modalMarketProducts: {
      ...state.modalMarketProducts,
      data,
      isPending: false,
    },
  };
};

export const getModalMarketProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    modalMarketProducts: {
      ...state.modalMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const getSegmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    segments: {
      ...state.segments,
      isPending: true,
    },
  };
};

export const getSegmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    segments: {
      ...state.segments,
      data,
      isPending: false,
    },
  };
};

export const getSegmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    segments: {
      ...state.tableMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const createRecipeImageUrlRequest = state => {
  return {
    ...state,
    createRecipeImageUrl: {
      ...state.createRecipeImageUrl,
      isPending: true,
    },
  };
};
export const createRecipeImageUrlSuccess = (state, { data }) => {
  return {
    ...state,
    createRecipeImageUrl: {
      ...state.createRecipeImageUrl,
      uploadedImages: [
        ...state.createRecipeImageUrl.uploadedImages,
        data,
      ],
      isPending: false,
    },
  };
};
export const createRecipeImageUrlFailure = (state, { key, error }) => {
  return {
    ...state,
    createRecipeImageUrl: {
      ...state.createRecipeImageUrl,
      isPending: false,
      erroredImages: [
        ...state.createRecipeImageUrl.erroredImages,
        {
          key,
          error,
        },
      ],
    },
  };
};

export const clearMarketProducts = state => ({
  ...state,
  marketProducts: {
    ...state.marketProducts,
    data: {},
  },
});

export const openSubstituteProductsModal = state => ({
  ...state,
  isSubstituteProductsModalOpen: true,
});

export const closeSubstituteProductsModal = state => ({
  ...state,
  isSubstituteProductsModalOpen: false,
});

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RECIPE_BY_ID_REQUEST]: getRecipeByIdRequest,
  [Types.GET_RECIPE_BY_ID_SUCCESS]: getRecipeByIdSuccess,
  [Types.GET_RECIPE_BY_ID_FAILURE]: getRecipeByIdFailure,
  [Types.UPDATE_RECIPE_REQUEST]: updateRecipeRequest,
  [Types.UPDATE_RECIPE_SUCCESS]: updateRecipeSuccess,
  [Types.UPDATE_RECIPE_FAILURE]: updateRecipeFailure,
  [Types.GET_MARKET_PRODUCTS_REQUEST]: getMarketProductsRequest,
  [Types.GET_MARKET_PRODUCTS_SUCCESS]: getMarketProductsSuccess,
  [Types.GET_MARKET_PRODUCTS_FAILURE]: getMarketProductsFailure,
  [Types.GET_TABLE_MARKET_PRODUCTS_REQUEST]: getTableMarketProductsRequest,
  [Types.GET_TABLE_MARKET_PRODUCTS_SUCCESS]: getTableMarketProductsSuccess,
  [Types.GET_TABLE_MARKET_PRODUCTS_FAILURE]: getModalMarketProductsFailure,
  [Types.GET_MODAL_MARKET_PRODUCTS_REQUEST]: getModalMarketProductsRequest,
  [Types.GET_MODAL_MARKET_PRODUCTS_SUCCESS]: getModalMarketProductsSuccess,
  [Types.GET_MODAL_MARKET_PRODUCTS_FAILURE]: getTableMarketProductsFailure,
  [Types.GET_SEGMENTS_REQUEST]: getSegmentsRequest,
  [Types.GET_SEGMENTS_SUCCESS]: getSegmentsSuccess,
  [Types.GET_SEGMENTS_FAILURE]: getSegmentsFailure,
  [Types.CREATE_RECIPE_IMAGE_URL_REQUEST]: createRecipeImageUrlRequest,
  [Types.CREATE_RECIPE_IMAGE_URL_SUCCESS]: createRecipeImageUrlSuccess,
  [Types.CREATE_RECIPE_IMAGE_URL_FAILURE]: createRecipeImageUrlFailure,
  [Types.CLEAR_MARKET_PRODUCTS]: clearMarketProducts,
  [Types.OPEN_SUBSTITUTE_PRODUCTS_MODAL]: openSubstituteProductsModal,
  [Types.CLOSE_SUBSTITUTE_PRODUCTS_MODAL]: closeSubstituteProductsModal,
  [Types.DESTROY_PAGE]: destroy,
};
export default createReducer(INITIAL_STATE, HANDLERS);
