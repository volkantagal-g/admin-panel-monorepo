import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMasterMainCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getMasterCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  getMasterClasses: {
    data: [],
    isPending: false,
    error: null,
  },
  getSubClasses: {
    data: [],
    isPending: false,
    error: null,
  },
  bulkUpdateMarketProductMasterCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  importCreateMasterCategory: {
    data: [],
    isPending: false,
    error: null,
  },
  importUpdateMasterCategory: {
    data: [],
    isPending: false,
    error: null,
  },
  exportMasterCategory: {
    data: {},
    isPending: false,
    error: null,
  },
  filters: { searchValue: undefined },
};

export const getMasterMainCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMasterMainCategories: {
      ...INITIAL_STATE.getMasterMainCategories,
      isPending: true,
    },
  };
};

export const getMasterMainCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMasterMainCategories: {
      ...INITIAL_STATE.getMasterMainCategories,
      data,
      isPending: false,
    },
  };
};

export const getMasterMainCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMasterMainCategories: {
      ...INITIAL_STATE.getMasterMainCategories,
      isPending: false,
      error,
    },
  };
};

export const getMasterCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMasterCategories: {
      ...INITIAL_STATE.getMasterCategories,
      isPending: true,
    },
  };
};

export const getMasterCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMasterCategories: {
      ...INITIAL_STATE.getMasterCategories,
      data,
      isPending: false,
    },
  };
};

export const getMasterCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMasterCategories: {
      ...INITIAL_STATE.getMasterCategories,
      isPending: false,
      error,
    },
  };
};

export const getMasterClassesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMasterClasses: {
      ...INITIAL_STATE.getMasterClasses,
      isPending: true,
    },
  };
};

export const getMasterClassesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMasterClasses: {
      ...INITIAL_STATE.getMasterClasses,
      data,
      isPending: false,
    },
  };
};

export const getMasterClassesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMasterClasses: {
      ...INITIAL_STATE.getMasterClasses,
      isPending: false,
      error,
    },
  };
};

export const getMasterSubClassesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMasterSubClasses: {
      ...INITIAL_STATE.getMasterSubClasses,
      isPending: true,
    },
  };
};

export const getMasterSubClassesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMasterSubClasses: {
      ...INITIAL_STATE.getMasterSubClasses,
      data,
      isPending: false,
    },
  };
};

export const getMasterSubClassesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMasterSubClasses: {
      ...INITIAL_STATE.getMasterSubClasses,
      isPending: false,
      error,
    },
  };
};

export const bulkUpdateMarketProductMasterCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    bulkUpdateMarketProductMasterCategories: {
      ...INITIAL_STATE.bulkUpdateMarketProductMasterCategories,
      isPending: true,
    },
  };
};

export const bulkUpdateMarketProductMasterCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    bulkUpdateMarketProductMasterCategories: {
      ...INITIAL_STATE.bulkUpdateMarketProductMasterCategories,
      data,
      isPending: false,
    },
  };
};

export const bulkUpdateMarketProductMasterCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bulkUpdateMarketProductMasterCategories: {
      ...INITIAL_STATE.bulkUpdateMarketProductMasterCategories,
      isPending: false,
      error,
    },
  };
};

export const setSearchValue = (state = INITIAL_STATE, { searchValue }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchValue,
    },
  };
};

export const importCreateMasterCategoryRequest = state => {
  return {
    ...state,
    importCreateMasterCategory: {
      ...INITIAL_STATE.importCreateMasterCategory,
      isPending: true,
    },
  };
};

export const importCreateMasterCategorySuccess = (state, { data }) => {
  return {
    ...state,
    importCreateMasterCategory: {
      ...INITIAL_STATE.importCreateMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const importCreateMasterCategoryFailure = (state, { error }) => {
  return {
    ...state,
    importCreateMasterCategory: {
      ...INITIAL_STATE.importCreateMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const importUpdateMasterCategoryRequest = state => {
  return {
    ...state,
    importUpdateMasterCategory: {
      ...INITIAL_STATE.importUpdateMasterCategory,
      isPending: true,
    },
  };
};

export const importUpdateMasterCategorySuccess = (state, { data }) => {
  return {
    ...state,
    importUpdateMasterCategory: {
      ...INITIAL_STATE.importUpdateMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const importUpdateMasterCategoryFailure = (state, { error }) => {
  return {
    ...state,
    importUpdateMasterCategory: {
      ...INITIAL_STATE.importUpdateMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const exportMasterCategoryRequest = state => {
  return {
    ...state,
    exportMasterCategory: {
      ...INITIAL_STATE.exportMasterCategory,
      isPending: true,
    },
  };
};

export const exportMasterCategorySuccess = (state, { data }) => {
  return {
    ...state,
    exportMasterCategory: {
      ...INITIAL_STATE.exportMasterCategory,
      data,
      isPending: false,
    },
  };
};

export const exportMasterCategoryFailure = (state, { error }) => {
  return {
    ...state,
    exportMasterCategory: {
      ...INITIAL_STATE.exportMasterCategory,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MASTER_MAIN_CATEGORIES_REQUEST]: getMasterMainCategoriesRequest,
  [Types.GET_MASTER_MAIN_CATEGORIES_SUCCESS]: getMasterMainCategoriesSuccess,
  [Types.GET_MASTER_MAIN_CATEGORIES_FAILURE]: getMasterMainCategoriesFailure,
  [Types.GET_MASTER_CATEGORIES_REQUEST]: getMasterCategoriesRequest,
  [Types.GET_MASTER_CATEGORIES_SUCCESS]: getMasterCategoriesSuccess,
  [Types.GET_MASTER_CATEGORIES_FAILURE]: getMasterCategoriesFailure,
  [Types.GET_MASTER_CLASSES_REQUEST]: getMasterClassesRequest,
  [Types.GET_MASTER_CLASSES_SUCCESS]: getMasterClassesSuccess,
  [Types.GET_MASTER_CLASSES_FAILURE]: getMasterClassesFailure,
  [Types.GET_MASTER_SUB_CLASSES_REQUEST]: getMasterSubClassesRequest,
  [Types.GET_MASTER_SUB_CLASSES_SUCCESS]: getMasterSubClassesSuccess,
  [Types.GET_MASTER_SUB_CLASSES_FAILURE]: getMasterSubClassesFailure,
  [Types.BULK_UPDATE_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST]: bulkUpdateMarketProductMasterCategoriesRequest,
  [Types.BULK_UPDATE_MARKET_PRODUCT_MASTER_CATEGORIES_SUCCESS]: bulkUpdateMarketProductMasterCategoriesSuccess,
  [Types.BULK_UPDATE_MARKET_PRODUCT_MASTER_CATEGORIES_FAILURE]: bulkUpdateMarketProductMasterCategoriesFailure,
  [Types.IMPORT_UPDATE_MASTER_CATEGORY_REQUEST]: importUpdateMasterCategoryRequest,
  [Types.IMPORT_UPDATE_MASTER_CATEGORY_SUCCESS]: importUpdateMasterCategorySuccess,
  [Types.IMPORT_UPDATE_MASTER_CATEGORY_FAILURE]: importUpdateMasterCategoryFailure,
  [Types.IMPORT_CREATE_MASTER_CATEGORY_REQUEST]: importCreateMasterCategoryRequest,
  [Types.IMPORT_CREATE_MASTER_CATEGORY_SUCCESS]: importCreateMasterCategorySuccess,
  [Types.IMPORT_CREATE_MASTER_CATEGORY_FAILURE]: importCreateMasterCategoryFailure,
  [Types.EXPORT_MASTER_CATEGORY_REQUEST]: exportMasterCategoryRequest,
  [Types.EXPORT_MASTER_CATEGORY_SUCCESS]: exportMasterCategorySuccess,
  [Types.EXPORT_MASTER_CATEGORY_FAILURE]: exportMasterCategoryFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_SEARCH_VALUE]: setSearchValue,
};

export default createReducer(INITIAL_STATE, HANDLERS);
