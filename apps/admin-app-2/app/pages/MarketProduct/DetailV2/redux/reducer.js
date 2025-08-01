import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMarketProductById: {
    isPending: false,
    data: {},
    error: null,
  },
  createMarketProduct: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProduct: {
    isPending: false,
    data: {},
    error: null,
  },
  assignFamilyToProduct: {
    isPending: false,
    data: {},
    error: null,
  },
  getTransferGroups: {
    data: [],
    isPending: false,
    error: null,
  },
  getProductTransferGroupsByProduct: {
    data: [],
    isPending: false,
    error: null,
  },
  updateTransferGroupsOfProduct: {
    data: [],
    isPending: false,
    error: null,
  },
  getProductsOfSubCategory: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketCategoryPosition: {
    isPending: false,
    error: null,
  },
  deleteMarketCategoryPosition: {
    isPending: false,
    error: null,
  },
  addMarketCategoryPosition: {
    isPending: false,
    error: null,
  },
  updateMainCategory: {
    isPending: false,
    error: null,
  },
  createMarketProductImageUrl: {
    uploadedImages: [],
    isPending: false,
    erroredImages: [],
  },
  createMarketProductTag: {
    data: {},
    isPending: false,
    error: null,
  },
  updateMarketProductTag: {
    data: {},
    isPending: false,
    error: null,
  },
  deleteMarketProductTag: {
    tagId: null,
    data: {},
    isPending: false,
    error: null,
  },
  getMarketProductTags: {
    data: [],
    isPending: false,
    error: null,
  },
  getMarketProductFeedData: {
    isPending: false,
    data: {},
    error: null,
  },
  getMarketProductSlugs: {
    isPending: false,
    data: {},
    error: null,
  },
  getMarketProductBundlesData: {
    isPending: false,
    data: {},
    error: null,
  },
  getMarketProductMasterCategoriesOld: {
    isPending: false,
    data: [],
    error: null,
  },
  getProductActivationValidationErrors: {
    isPending: false,
    data: {},
    error: null,
  },
  activateProducts: {
    isPending: false,
    error: null,
  },
  isImperialUnitUsed: false,
  getMarketProductAllPrice: {
    isPending: false,
    data: {},
    error: null,
  },
  updateMarketProductPricing: {
    isPending: false,
    data: {},
    error: null,
  },
  createBuyingPriceFinancials: {
    isPending: false,
    data: {},
    error: null,
  },
  createWastePricing: {
    isPending: false,
    data: {},
    error: null,
  },
  getWarehouseSegments: {
    isPending: false,
    data: {},
    error: null,
  },
  getBadges: {
    data: [],
    isPending: false,
    error: null,
  },
  updateBuyingPriceFinancials: {
    isPending: false,
    data: {},
    error: null,
  },
  getSupplyLogisticInfo: {
    isPending: false,
    data: {},
    error: null,
  },
  updateWastePricing: {
    isPending: false,
    data: {},
    error: null,
  },
  updateSupplyLogisticInfo: {
    isPending: false,
    data: {},
    error: null,
  },
  createSupplyLogisticInfo: {
    isPending: false,
    data: {},
    error: null,
  },
  updateWarehousePricing: {
    isPending: false,
    data: {},
    error: null,
  },
  getMasterCategoriesV2: {
    isPending: false,
    data: [],
    error: null,
  },
  getBundlePricingsBySubProductId: {
    isPending: false,
    data: {},
    error: null,
  },
  getSupplyBrands: {
    isPending: false,
    data: [],
    error: null,
  },
  createSellingPriceFinancials: {
    isPending: false,
    data: {},
    error: null,
  },
  createSellingPriceDiscountedFinancials: {
    isPending: false,
    data: {},
    error: null,
  },
  getSellingPriceList: {
    isPending: false,
    data: {},
    error: null,
  },
  getMarketProductsPriceList: {
    data: [],
    isPending: false,
    error: null,
  },
  updateBundleSubProductPrices: {
    data: [],
    isPending: false,
    error: null,
  },
  updateBundleSubProductStruckPrice: {
    data: [],
    isPending: false,
    error: null,
  },
  deleteBundleStruckPrice: {
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
  deleteBuyingPriceFinancials: {
    data: [],
    isPending: false,
    error: null,
  },
  deleteDiscountedPrice: {
    isPending: false,
    data: {},
  },
};

export const getMarketProductByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductById: {
      ...state.getMarketProductById,
      isPending: true,
    },
  };
};
export const getMarketProductByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductById: {
      data,
      isPending: false,
    },
  };
};
export const getMarketProductByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductById: {
      ...state.getMarketProductById,
      isPending: false,
      error,
    },
  };
};
export const createMarketProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProduct: {
      ...INITIAL_STATE.createMarketProduct,
      isPending: true,
    },
  };
};
export const createMarketProductSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProduct: {
      ...INITIAL_STATE.createMarketProduct,
      data,
      isPending: false,
    },
  };
};
export const createMarketProductFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProduct: {
      ...INITIAL_STATE.createMarketProduct,
      isPending: false,
      error,
    },
  };
};
export const updateMarketProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProduct: {
      ...INITIAL_STATE.updateMarketProduct,
      isPending: true,
    },
  };
};
export const updateMarketProductSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProduct: {
      ...INITIAL_STATE.updateMarketProduct,
      data,
      isPending: false,
    },
  };
};
export const updateMarketProductFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProduct: {
      ...INITIAL_STATE.updateMarketProduct,
      isPending: false,
      error,
    },
  };
};
export const assignFamilyToProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    assignFamilyToProduct: {
      ...INITIAL_STATE.assignFamilyToProduct,
      isPending: true,
    },
  };
};
export const assignFamilyToProductSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    assignFamilyToProduct: {
      ...INITIAL_STATE.assignFamilyToProduct,
      data,
      isPending: false,
    },
  };
};
export const assignFamilyToProductFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    assignFamilyToProduct: {
      ...INITIAL_STATE.assignFamilyToProduct,
      isPending: false,
      error,
    },
  };
};
export const getTransferGroupsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getTransferGroups: {
      ...INITIAL_STATE.getTransferGroups,
      isPending: true,
    },
  };
};
export const getTransferGroupsSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    getTransferGroups: {
      ...INITIAL_STATE.getTransferGroups,
      total,
      data,
      isPending: false,
    },
  };
};
export const getTransferGroupsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getTransferGroups: {
      ...INITIAL_STATE.getTransferGroups,
      isPending: false,
      error,
    },
  };
};
export const getProductTransferGroupsByProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getProductTransferGroupsByProduct: {
      ...INITIAL_STATE.getProductTransferGroupsByProduct,
      isPending: true,
    },
  };
};
export const getProductTransferGroupsByProductSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    getProductTransferGroupsByProduct: {
      ...INITIAL_STATE.getProductTransferGroupsByProduct,
      total,
      data,
      isPending: false,
    },
  };
};
export const getProductTransferGroupsByProductFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getProductTransferGroupsByProduct: {
      ...INITIAL_STATE.getProductTransferGroupsByProduct,
      isPending: false,
      error,
    },
  };
};
export const updateTransferGroupsOfProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateTransferGroupsOfProduct: {
      ...INITIAL_STATE.updateTransferGroupsOfProduct,
      isPending: true,
    },
  };
};
export const updateTransferGroupsOfProductSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    updateTransferGroupsOfProduct: {
      ...INITIAL_STATE.updateTransferGroupsOfProduct,
      total,
      data,
      isPending: false,
    },
  };
};
export const updateTransferGroupsOfProductFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateTransferGroupsOfProduct: {
      ...INITIAL_STATE.updateTransferGroupsOfProduct,
      isPending: false,
      error,
    },
  };
};

export const createMarketProductImageUrlRequest = state => {
  return {
    ...state,
    createMarketProductImageUrl: {
      ...state.createMarketProductImageUrl,
      isPending: true,
    },
  };
};
export const createMarketProductImageUrlSuccess = (state, { data }) => {
  return {
    ...state,
    createMarketProductImageUrl: {
      ...state.createMarketProductImageUrl,
      uploadedImages: [
        ...state.createMarketProductImageUrl.uploadedImages,
        data,
      ],
      isPending: false,
    },
  };
};
export const createMarketProductImageUrlFailure = (state, { key, error }) => {
  return {
    ...state,
    createMarketProductImageUrl: {
      ...state.createMarketProductImageUrl,
      isPending: false,
      erroredImages: [
        ...state.createMarketProductImageUrl.erroredImages,
        {
          key,
          error,
        },
      ],
    },
  };
};

export const getProductsOfSubCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getProductsOfSubCategory: {
      ...state.getProductsOfSubCategory,
      isPending: true,
    },
  };
};
export const getProductsOfSubCategorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      data: {
        ...data,
        items: data?.items || [],
      },
      isPending: false,
    },
  };
};
export const getProductsOfSubCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      isPending: false,
      error,
    },
  };
};
export const resetProductsOfSubCategory = (state = INITIAL_STATE) => {
  return {
    ...state,
    getProductsOfSubCategory: {
      ...state.getProductsOfSubCategory,
      isPending: true,
    },
  };
};
export const resetProductsOfSubCategorySuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      data,
      isPending: false,
    },
  };
};
export const resetProductsOfSubCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      isPending: false,
      error,
    },
  };
};
export const updateMarketCategoryPositionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketCategoryPosition: {
      ...INITIAL_STATE.updateMarketCategoryPosition,
      isPending: true,
    },
  };
};
export const updateMarketCategoryPositionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketCategoryPosition: {
      ...INITIAL_STATE.updateMarketCategoryPosition,
      isPending: false,
    },
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      data: {},
    },
  };
};
export const updateMarketCategoryPositionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketCategoryPosition: {
      ...INITIAL_STATE.updateMarketCategoryPosition,
      isPending: false,
      error,
    },
  };
};

export const deleteMarketCategoryPositionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteMarketCategoryPosition: {
      ...INITIAL_STATE.deleteMarketCategoryPosition,
      isPending: true,
    },
  };
};
export const deleteMarketCategoryPositionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteMarketCategoryPosition: {
      ...INITIAL_STATE.deleteMarketCategoryPosition,
      isPending: false,
    },
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      data: {},
    },
  };
};
export const deleteMarketCategoryPositionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteMarketCategoryPosition: {
      ...INITIAL_STATE.deleteMarketCategoryPosition,
      isPending: false,
      error,
    },
  };
};

export const addMarketCategoryPositionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addMarketCategoryPosition: {
      ...INITIAL_STATE.addMarketCategoryPosition,
      isPending: true,
    },
  };
};
export const addMarketCategoryPositionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    addMarketCategoryPosition: {
      ...INITIAL_STATE.addMarketCategoryPosition,
      isPending: false,
    },
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      data: {},
    },
  };
};
export const addMarketCategoryPositionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addMarketCategoryPosition: {
      ...INITIAL_STATE.addMarketCategoryPosition,
      isPending: false,
      error,
    },
  };
};

export const updateMainCategoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMainCategory: {
      ...INITIAL_STATE.updateMainCategory,
      isPending: true,
    },
  };
};
export const updateMainCategorySuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMainCategory: {
      ...INITIAL_STATE.updateMainCategory,
      isPending: false,
    },
    getProductsOfSubCategory: {
      ...INITIAL_STATE.getProductsOfSubCategory,
      data: {},
    },
  };
};
export const updateMainCategoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMainCategory: {
      ...INITIAL_STATE.updateMainCategory,
      isPending: false,
      error,
    },
  };
};
export const createMarketProductTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProductTag: {
      ...INITIAL_STATE.createMarketProductTag,
      isPending: true,
    },
  };
};
export const createMarketProductTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProductTag: {
      ...INITIAL_STATE.createMarketProductTag,
      data,
      isPending: false,
    },
  };
};
export const createMarketProductTagFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProductTag: {
      ...INITIAL_STATE.createMarketProductTag,
      isPending: false,
      error,
    },
  };
};
export const updateMarketProductTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductTag: {
      ...INITIAL_STATE.updateMarketProductTag,
      isPending: true,
    },
  };
};
export const updateMarketProductTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductTag: {
      ...INITIAL_STATE.updateMarketProductTag,
      data,
      isPending: false,
    },
  };
};
export const updateMarketProductTagFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductTag: {
      ...INITIAL_STATE.updateMarketProductTag,
      isPending: false,
      error,
    },
  };
};

export const deleteMarketProductTagRequest = (state = INITIAL_STATE, { tagId }) => {
  return {
    ...state,
    deleteMarketProductTag: {
      ...state.deleteMarketProductTag,
      tagId,
      isPending: true,
    },
  };
};
export const deleteMarketProductTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteMarketProductTag: {
      ...state.deleteMarketProductTag,
      data,
      isPending: false,
    },
  };
};
export const deleteMarketProductTagFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteMarketProductTag: {
      ...state.deleteMarketProductTag,
      isPending: false,
      error,
    },
  };
};
export const getMarketProductTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductTags: {
      ...INITIAL_STATE.getMarketProductTags,
      isPending: true,
    },
  };
};
export const getMarketProductTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductTags: {
      ...INITIAL_STATE.getMarketProductTags,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductTagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductTags: {
      ...INITIAL_STATE.getMarketProductTags,
      isPending: false,
      error,
    },
  };
};
export const getMarketProductFeedDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductFeedData: {
      ...INITIAL_STATE.getMarketProductFeedData,
      isPending: true,
    },
  };
};
export const getMarketProductFeedDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductFeedData: {
      ...INITIAL_STATE.getMarketProductFeedData,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductFeedDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductFeedData: {
      ...INITIAL_STATE.getMarketProductFeedData,
      isPending: false,
      error,
    },
  };
};
export const getMarketProductSlugsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductSlugs: {
      ...state.getMarketProductSlugs,
      isPending: true,
    },
  };
};

export const getMarketProductSlugsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductSlugs: {
      ...INITIAL_STATE.getMarketProductSlugs,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductSlugsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductSlugs: {
      ...INITIAL_STATE.getMarketProductSlugs,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductBundlesDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductBundlesData: {
      ...INITIAL_STATE.getMarketProductBundlesData,
      isPending: true,
    },
  };
};
export const getMarketProductBundlesDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductBundlesData: {
      ...INITIAL_STATE.getMarketProductBundlesData,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductBundlesDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductBundlesData: {
      ...INITIAL_STATE.getMarketProductBundlesData,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductMasterCategoriesOldRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductMasterCategoriesOld: {
      ...state.getMarketProductMasterCategoriesOld,
      isPending: true,
    },
  };
};
export const getMarketProductMasterCategoriesOldSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductMasterCategoriesOld: {
      ...INITIAL_STATE.getMarketProductMasterCategoriesOld,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductMasterCategoriesOldFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductMasterCategoriesOld: {
      ...INITIAL_STATE.getMarketProductMasterCategoriesOld,
      isPending: false,
      error,
    },
  };
};
export const getProductActivationValidationErrorsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getProductActivationValidationErrors: {
      ...state.getProductActivationValidationErrors,
      isPending: true,
    },
  };
};
export const getProductActivationValidationErrorsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getProductActivationValidationErrors: {
      ...INITIAL_STATE.getProductActivationValidationErrors,
      data,
      isPending: false,
    },
  };
};
export const getProductActivationValidationErrorsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getProductActivationValidationErrors: {
      ...INITIAL_STATE.getProductActivationValidationErrors,
      isPending: false,
      error,
    },
  };
};
export const activateProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateProducts: {
      ...state.activateProducts,
      isPending: true,
    },
  };
};
export const activateProductsSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateProducts: {
      ...INITIAL_STATE.activateProducts,
      isPending: false,
    },
  };
};
export const activateProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activateProducts: {
      ...INITIAL_STATE.activateProducts,
      isPending: false,
      error,
    },
  };
};
export const setIsImperialUnitUsed = (state = INITIAL_STATE, { isImperialUnitUsed }) => {
  return {
    ...state,
    isImperialUnitUsed,
  };
};
export const getMarketProductAllPriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMarketProductAllPrice: {
      ...state.getMarketProductAllPrice,
      isPending: true,
    },
  };
};
export const createBuyingPriceFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createBuyingPriceFinancials: {
      ...INITIAL_STATE.createBuyingPriceFinancials,
      isPending: true,
    },
  };
};
export const getMarketProductAllPriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMarketProductAllPrice: {
      ...state.getMarketProductAllPrice,
      data,
      isPending: false,
    },
  };
};
export const createBuyingPriceFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createBuyingPriceFinancials: {
      ...INITIAL_STATE.createBuyingPriceFinancials,
      data,
      isPending: false,
    },
  };
};
export const getMarketProductAllPriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMarketProductAllPrice: {
      ...INITIAL_STATE.getMarketProductAllPrice,
      isPending: false,
      error,
    },
  };
};
export const updateMarketProductPricingRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateMarketProductPricing: {
      ...INITIAL_STATE.updateMarketProductPricing,
      isPending: true,
    },
  };
};
export const updateMarketProductPricingSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateMarketProductPricing: {
      ...INITIAL_STATE.updateMarketProductPricing,
      data,
      isPending: false,
    },
  };
};
export const updateMarketProductPricingFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateMarketProductPricing: {
      ...INITIAL_STATE.updateMarketProductPricing,
      isPending: false,
      error,
    },
  };
};
export const createBuyingPriceFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createBuyingPriceFinancials: {
      ...INITIAL_STATE.createBuyingPriceFinancials,
      isPending: false,
      error,
    },
  };
};
export const getWarehouseSegmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getWarehouseSegments: {
      ...state.getWarehouseSegments,
      isPending: true,
    },
  };
};
export const getWarehouseSegmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getWarehouseSegments: {
      ...INITIAL_STATE.getWarehouseSegments,
      data,
      isPending: false,
    },
  };
};
export const getWarehouseSegmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getWarehouseSegments: {
      ...state.getWarehouseSegments,
      isPending: false,
      error,
    },
  };
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
export const updateBuyingPriceFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBuyingPriceFinancials: {
      ...INITIAL_STATE.updateBuyingPriceFinancials,
      isPending: true,
    },
  };
};
export const updateBuyingPriceFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateBuyingPriceFinancials: {
      ...INITIAL_STATE.updateBuyingPriceFinancials,
      data,
      isPending: false,
    },
  };
};
export const updateBuyingPriceFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBuyingPriceFinancials: {
      ...INITIAL_STATE.updateBuyingPriceFinancials,
      isPending: false,
      error,
    },
  };
};
export const updateWastePricingRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateWastePricing: {
      ...INITIAL_STATE.updateWastePricing,
      isPending: true,
    },
  };
};
export const updateWastePricingSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateWastePricing: {
      ...INITIAL_STATE.updateWastePricing,
      data,
      isPending: false,
    },
  };
};
export const updateWastePricingFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateWastePricing: {
      ...INITIAL_STATE.updateWastePricing,
      isPending: false,
      error,
    },
  };
};
export const getSupplyLogisticInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSupplyLogisticInfo: {
      ...state.getSupplyLogisticInfo,
      isPending: true,
    },
  };
};
export const getSupplyLogisticInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSupplyLogisticInfo: {
      ...INITIAL_STATE.getSupplyLogisticInfo,
      data,
      isPending: false,
    },
  };
};
export const getSupplyLogisticInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSupplyLogisticInfo: {
      ...INITIAL_STATE.getSupplyLogisticInfo,
      isPending: false,
      error,
    },
  };
};
export const updateWarehousePricingRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateWarehousePricing: {
      ...INITIAL_STATE.updateWarehousePricing,
      isPending: true,
    },
  };
};
export const updateSupplyLogisticInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateSupplyLogisticInfo: {
      ...INITIAL_STATE.updateSupplyLogisticInfo,
      isPending: true,
    },
  };
};
export const updateSupplyLogisticInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateSupplyLogisticInfo: {
      ...INITIAL_STATE.updateSupplyLogisticInfo,
      data,
      isPending: false,
    },
  };
};
export const updateSupplyLogisticInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateSupplyLogisticInfo: {
      ...state.updateSupplyLogisticInfo,
      isPending: false,
      error,
    },
  };
};
export const updateWarehousePricingSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateWarehousePricing: {
      ...INITIAL_STATE.updateWarehousePricing,
      data,
      isPending: false,
    },
  };
};
export const updateWarehousePricingFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateWarehousePricing: {
      ...INITIAL_STATE.updateWarehousePricing,
      isPending: false,
      error,
    },
  };
};
export const createSupplyLogisticInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createSupplyLogisticInfo: {
      ...INITIAL_STATE.createSupplyLogisticInfo,
      isPending: true,
    },
  };
};
export const createSupplyLogisticInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createSupplyLogisticInfo: {
      ...INITIAL_STATE.createSupplyLogisticInfo,
      data,
      isPending: false,
    },
  };
};
export const createSupplyLogisticInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createSupplyLogisticInfo: {
      ...INITIAL_STATE.createSupplyLogisticInfo,
      isPending: false,
      error,
    },
  };
};

export const getMasterCategoriesV2Request = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMasterCategoriesV2: {
      ...state.getMasterCategoriesV2,
      isPending: true,
    },
  };
};

export const getMasterCategoriesV2Success = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMasterCategoriesV2: {
      ...INITIAL_STATE.getMasterCategoriesV2,
      data,
      isPending: false,
    },
  };
};

export const getMasterCategoriesV2Failure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMasterCategoriesV2: {
      ...INITIAL_STATE.getMasterCategoriesV2,
      isPending: false,
      error,
    },
  };
};

export const getBundlePricingsBySubProductIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getBundlePricingsBySubProductId: {
      ...INITIAL_STATE.getBundlePricingsBySubProductId,
      data,
      isPending: false,
    },
  };
};
export const getBundlePricingsBySubProductIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getBundlePricingsBySubProductId: {
      ...INITIAL_STATE.getBundlePricingsBySubProductId,
      isPending: false,
      error,
    },
  };
};
export const getSupplyBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSupplyBrands: {
      ...state.getSupplyBrands,
      isPending: true,
    },
  };
};
export const getSupplyBrandsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSupplyBrands: {
      ...INITIAL_STATE.getSupplyBrands,
      data,
      isPending: false,
    },
  };
};
export const getSupplyBrandsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSupplyBrands: {
      ...INITIAL_STATE.getSupplyBrands,
      isPending: false,
      error,
    },
  };
};
export const createSellingPriceFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createSellingPriceFinancials: {
      ...INITIAL_STATE.createSellingPriceFinancials,
      isPending: true,
    },
  };
};
export const createSellingPriceFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createSellingPriceFinancials: {
      ...INITIAL_STATE.createSellingPriceFinancials,
      data,
      isPending: false,
    },
  };
};
export const createSellingPriceFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createSellingPriceFinancials: {
      ...INITIAL_STATE.createSellingPriceFinancials,
      isPending: false,
      error,
    },
  };
};
export const createSellingPriceDiscountedFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createSellingPriceDiscountedFinancials: {
      ...INITIAL_STATE.createSellingPriceDiscountedFinancials,
      isPending: true,
    },
  };
};
export const createSellingPriceDiscountedFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createSellingPriceDiscountedFinancials: {
      ...INITIAL_STATE.createSellingPriceDiscountedFinancials,
      data,
      isPending: false,
    },
  };
};
export const createSellingPriceDiscountedFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createSellingPriceDiscountedFinancials: {
      ...INITIAL_STATE.createSellingPriceDiscountedFinancials,
      isPending: false,
      error,
    },
  };
};
export const getSellingPriceListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSellingPriceList: {
      ...state.getSellingPriceList,
      isPending: true,
    },
  };
};
export const getSellingPriceListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSellingPriceList: {
      ...state.getSellingPriceList,
      data,
      isPending: false,
    },
  };
};
export const getSellingPriceListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSellingPriceList: {
      ...state.getSellingPriceList,
      isPending: false,
      error,
    },
  };
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
      error: null,
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

export const updateBundleSubProductPricesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBundleSubProductPrices: {
      ...state.updateBundleSubProductPrices,
      isPending: true,
    },
  };
};

export const updateBundleSubProductPricesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateBundleSubProductPrices: {
      ...state.updateBundleSubProductPrices,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const updateBundleSubProductPricesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBundleSubProductPrices: {
      ...state.updateBundleSubProductPrices,
      isPending: false,
      error,
    },
  };
};

export const updateBundleSubProductStruckPriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBundleSubProductStruckPrice: {
      ...state.updateBundleSubProductStruckPrice,
      isPending: true,
    },
  };
};

export const updateBundleSubProductStruckPriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateBundleSubProductStruckPrice: {
      ...state.updateBundleSubProductStruckPrice,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const updateBundleSubProductStruckPriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateBundleSubProductStruckPrice: {
      ...state.updateBundleSubProductStruckPrice,
      isPending: false,
      error,
    },
  };
};

export const deleteBundleStruckPriceRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteBundleStruckPrice: {
      ...state.deleteBundleStruckPrice,
      isPending: true,
    },
  };
};

export const deleteBundleStruckPriceSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteBundleStruckPrice: {
      ...state.deleteBundleStruckPrice,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const deleteBundleStruckPriceFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteBundleStruckPrice: {
      ...state.deleteBundleStruckPrice,
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
export const deleteBuyingPriceFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteBuyingPriceFinancials: {
      ...state.deleteBuyingPriceFinancials,
      isPending: true,
    },
  };
};

export const deleteBuyingPriceFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteBuyingPriceFinancials: {
      ...state.deleteBuyingPriceFinancials,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const deleteBuyingPriceFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteBuyingPriceFinancials: {
      ...state.deleteBuyingPriceFinancials,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCT_BY_ID_REQUEST]: getMarketProductByIdRequest,
  [Types.GET_MARKET_PRODUCT_BY_ID_SUCCESS]: getMarketProductByIdSuccess,
  [Types.GET_MARKET_PRODUCT_BY_ID_FAILURE]: getMarketProductByIdFailure,
  [Types.CREATE_MARKET_PRODUCT_REQUEST]: createMarketProductRequest,
  [Types.CREATE_MARKET_PRODUCT_SUCCESS]: createMarketProductSuccess,
  [Types.CREATE_MARKET_PRODUCT_FAILURE]: createMarketProductFailure,
  [Types.UPDATE_MARKET_PRODUCT_REQUEST]: updateMarketProductRequest,
  [Types.UPDATE_MARKET_PRODUCT_SUCCESS]: updateMarketProductSuccess,
  [Types.UPDATE_MARKET_PRODUCT_FAILURE]: updateMarketProductFailure,
  [Types.GET_TRANSFER_GROUPS_REQUEST]: getTransferGroupsRequest,
  [Types.GET_TRANSFER_GROUPS_SUCCESS]: getTransferGroupsSuccess,
  [Types.GET_TRANSFER_GROUPS_FAILURE]: getTransferGroupsFailure,
  [Types.GET_PRODUCT_TRANSFER_GROUPS_BY_PRODUCT_REQUEST]: getProductTransferGroupsByProductRequest,
  [Types.GET_PRODUCT_TRANSFER_GROUPS_BY_PRODUCT_SUCCESS]: getProductTransferGroupsByProductSuccess,
  [Types.GET_PRODUCT_TRANSFER_GROUPS_BY_PRODUCT_FAILURE]: getProductTransferGroupsByProductFailure,
  [Types.UPDATE_TRANSFER_GROUPS_OF_PRODUCT_REQUEST]: updateTransferGroupsOfProductRequest,
  [Types.UPDATE_TRANSFER_GROUPS_OF_PRODUCT_SUCCESS]: updateTransferGroupsOfProductSuccess,
  [Types.UPDATE_TRANSFER_GROUPS_OF_PRODUCT_FAILURE]: updateTransferGroupsOfProductFailure,
  [Types.CREATE_MARKET_PRODUCT_IMAGE_URL_REQUEST]: createMarketProductImageUrlRequest,
  [Types.CREATE_MARKET_PRODUCT_IMAGE_URL_SUCCESS]: createMarketProductImageUrlSuccess,
  [Types.CREATE_MARKET_PRODUCT_IMAGE_URL_FAILURE]: createMarketProductImageUrlFailure,
  [Types.GET_PRODUCTS_OF_SUB_CATEGORY_REQUEST]: getProductsOfSubCategoryRequest,
  [Types.GET_PRODUCTS_OF_SUB_CATEGORY_SUCCESS]: getProductsOfSubCategorySuccess,
  [Types.GET_PRODUCTS_OF_SUB_CATEGORY_FAILURE]: getProductsOfSubCategoryFailure,
  [Types.RESET_PRODUCTS_OF_SUB_CATEGORY]: resetProductsOfSubCategory,
  [Types.RESET_PRODUCTS_OF_SUB_CATEGORY_SUCCESS]: resetProductsOfSubCategorySuccess,
  [Types.RESET_PRODUCTS_OF_SUB_CATEGORY_FAILURE]: resetProductsOfSubCategoryFailure,
  [Types.UPDATE_MARKET_CATEGORY_POSITION_REQUEST]: updateMarketCategoryPositionRequest,
  [Types.UPDATE_MARKET_CATEGORY_POSITION_SUCCESS]: updateMarketCategoryPositionSuccess,
  [Types.UPDATE_MARKET_CATEGORY_POSITION_FAILURE]: updateMarketCategoryPositionFailure,
  [Types.DELETE_MARKET_CATEGORY_POSITION_REQUEST]: deleteMarketCategoryPositionRequest,
  [Types.DELETE_MARKET_CATEGORY_POSITION_SUCCESS]: deleteMarketCategoryPositionSuccess,
  [Types.DELETE_MARKET_CATEGORY_POSITION_FAILURE]: deleteMarketCategoryPositionFailure,
  [Types.ADD_MARKET_CATEGORY_POSITION_REQUEST]: addMarketCategoryPositionRequest,
  [Types.ADD_MARKET_CATEGORY_POSITION_SUCCESS]: addMarketCategoryPositionSuccess,
  [Types.ADD_MARKET_CATEGORY_POSITION_FAILURE]: addMarketCategoryPositionFailure,
  [Types.UPDATE_MAIN_CATEGORY_REQUEST]: updateMainCategoryRequest,
  [Types.UPDATE_MAIN_CATEGORY_SUCCESS]: updateMainCategorySuccess,
  [Types.UPDATE_MAIN_CATEGORY_FAILURE]: updateMainCategoryFailure,
  [Types.CREATE_MARKET_PRODUCT_TAG_REQUEST]: createMarketProductTagRequest,
  [Types.CREATE_MARKET_PRODUCT_TAG_SUCCESS]: createMarketProductTagSuccess,
  [Types.CREATE_MARKET_PRODUCT_TAG_FAILURE]: createMarketProductTagFailure,
  [Types.UPDATE_MARKET_PRODUCT_TAG_REQUEST]: updateMarketProductTagRequest,
  [Types.UPDATE_MARKET_PRODUCT_TAG_SUCCESS]: updateMarketProductTagSuccess,
  [Types.UPDATE_MARKET_PRODUCT_TAG_FAILURE]: updateMarketProductTagFailure,
  [Types.DELETE_MARKET_PRODUCT_TAG_REQUEST]: deleteMarketProductTagRequest,
  [Types.DELETE_MARKET_PRODUCT_TAG_SUCCESS]: deleteMarketProductTagSuccess,
  [Types.DELETE_MARKET_PRODUCT_TAG_FAILURE]: deleteMarketProductTagFailure,
  [Types.GET_MARKET_PRODUCT_TAGS_REQUEST]: getMarketProductTagsRequest,
  [Types.GET_MARKET_PRODUCT_TAGS_SUCCESS]: getMarketProductTagsSuccess,
  [Types.GET_MARKET_PRODUCT_TAGS_FAILURE]: getMarketProductTagsFailure,
  [Types.GET_MARKET_PRODUCT_FEED_DATA_REQUEST]: getMarketProductFeedDataRequest,
  [Types.GET_MARKET_PRODUCT_FEED_DATA_SUCCESS]: getMarketProductFeedDataSuccess,
  [Types.GET_MARKET_PRODUCT_FEED_DATA_FAILURE]: getMarketProductFeedDataFailure,
  [Types.GET_MARKET_PRODUCT_BUNDLES_DATA_REQUEST]: getMarketProductBundlesDataRequest,
  [Types.GET_MARKET_PRODUCT_BUNDLES_DATA_SUCCESS]: getMarketProductBundlesDataSuccess,
  [Types.GET_MARKET_PRODUCT_BUNDLES_DATA_FAILURE]: getMarketProductBundlesDataFailure,
  [Types.GET_MARKET_PRODUCT_SLUGS_REQUEST]: getMarketProductSlugsRequest,
  [Types.GET_MARKET_PRODUCT_SLUGS_SUCCESS]: getMarketProductSlugsSuccess,
  [Types.GET_MARKET_PRODUCT_SLUGS_FAILURE]: getMarketProductSlugsFailure,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST]: getMarketProductMasterCategoriesOldRequest,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_SUCCESS]: getMarketProductMasterCategoriesOldSuccess,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_FAILURE]: getMarketProductMasterCategoriesOldFailure,
  [Types.GET_PRODUCT_ACTIVATION_VALIDATION_ERRORS_REQUEST]: getProductActivationValidationErrorsRequest,
  [Types.GET_PRODUCT_ACTIVATION_VALIDATION_ERRORS_SUCCESS]: getProductActivationValidationErrorsSuccess,
  [Types.GET_PRODUCT_ACTIVATION_VALIDATION_ERRORS_FAILURE]: getProductActivationValidationErrorsFailure,
  [Types.ACTIVATE_PRODUCTS_REQUEST]: activateProductsRequest,
  [Types.ACTIVATE_PRODUCTS_SUCCESS]: activateProductsSuccess,
  [Types.ACTIVATE_PRODUCTS_FAILURE]: activateProductsFailure,
  [Types.SET_IS_IMPERIAL_UNIT_USED]: setIsImperialUnitUsed,
  [Types.GET_MARKET_PRODUCT_ALL_PRICE_REQUEST]: getMarketProductAllPriceRequest,
  [Types.GET_MARKET_PRODUCT_ALL_PRICE_SUCCESS]: getMarketProductAllPriceSuccess,
  [Types.GET_MARKET_PRODUCT_ALL_PRICE_FAILURE]: getMarketProductAllPriceFailure,
  [Types.UPDATE_MARKET_PRODUCT_PRICING_REQUEST]: updateMarketProductPricingRequest,
  [Types.UPDATE_MARKET_PRODUCT_PRICING_SUCCESS]: updateMarketProductPricingSuccess,
  [Types.UPDATE_MARKET_PRODUCT_PRICING_FAILURE]: updateMarketProductPricingFailure,
  [Types.ASSIGN_FAMILY_TO_PRODUCT_REQUEST]: assignFamilyToProductRequest,
  [Types.ASSIGN_FAMILY_TO_PRODUCT_SUCCESS]: assignFamilyToProductSuccess,
  [Types.ASSIGN_FAMILY_TO_PRODUCT_FAILURE]: assignFamilyToProductFailure,
  [Types.CREATE_BUYING_PRICE_FINANCIALS_REQUEST]: createBuyingPriceFinancialsRequest,
  [Types.CREATE_BUYING_PRICE_FINANCIALS_SUCCESS]: createBuyingPriceFinancialsSuccess,
  [Types.CREATE_BUYING_PRICE_FINANCIALS_FAILURE]: createBuyingPriceFinancialsFailure,
  [Types.GET_WAREHOUSE_SEGMENTS_REQUEST]: getWarehouseSegmentsRequest,
  [Types.GET_WAREHOUSE_SEGMENTS_SUCCESS]: getWarehouseSegmentsSuccess,
  [Types.GET_WAREHOUSE_SEGMENTS_FAILURE]: getWarehouseSegmentsFailure,
  [Types.GET_BADGES_REQUEST]: getBadgesRequest,
  [Types.GET_BADGES_SUCCESS]: getBadgesSuccess,
  [Types.GET_BADGES_FAILURE]: getBadgesFailure,
  [Types.UPDATE_BUYING_PRICE_FINANCIALS_REQUEST]: updateBuyingPriceFinancialsRequest,
  [Types.UPDATE_BUYING_PRICE_FINANCIALS_SUCCESS]: updateBuyingPriceFinancialsSuccess,
  [Types.UPDATE_BUYING_PRICE_FINANCIALS_FAILURE]: updateBuyingPriceFinancialsFailure,
  [Types.UPDATE_WASTE_PRICING_REQUEST]: updateWastePricingRequest,
  [Types.UPDATE_WASTE_PRICING_SUCCESS]: updateWastePricingSuccess,
  [Types.UPDATE_WASTE_PRICING_FAILURE]: updateWastePricingFailure,
  [Types.UPDATE_WAREHOUSE_PRICING_REQUEST]: updateWarehousePricingRequest,
  [Types.UPDATE_WAREHOUSE_PRICING_SUCCESS]: updateWarehousePricingSuccess,
  [Types.UPDATE_WAREHOUSE_PRICING_FAILURE]: updateWarehousePricingFailure,
  [Types.GET_SUPPLY_LOGISTIC_INFO_REQUEST]: getSupplyLogisticInfoRequest,
  [Types.GET_SUPPLY_LOGISTIC_INFO_SUCCESS]: getSupplyLogisticInfoSuccess,
  [Types.GET_SUPPLY_LOGISTIC_INFO_FAILURE]: getSupplyLogisticInfoFailure,
  [Types.UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST]: updateSupplyLogisticInfoRequest,
  [Types.UPDATE_SUPPLY_LOGISTIC_INFO_SUCCESS]: updateSupplyLogisticInfoSuccess,
  [Types.UPDATE_SUPPLY_LOGISTIC_INFO_FAILURE]: updateSupplyLogisticInfoFailure,
  [Types.CREATE_SUPPLY_LOGISTIC_INFO_REQUEST]: createSupplyLogisticInfoRequest,
  [Types.CREATE_SUPPLY_LOGISTIC_INFO_SUCCESS]: createSupplyLogisticInfoSuccess,
  [Types.CREATE_SUPPLY_LOGISTIC_INFO_FAILURE]: createSupplyLogisticInfoFailure,
  [Types.GET_MASTER_CATEGORIES_V2_REQUEST]: getMasterCategoriesV2Request,
  [Types.GET_MASTER_CATEGORIES_V2_SUCCESS]: getMasterCategoriesV2Success,
  [Types.GET_MASTER_CATEGORIES_V2_FAILURE]: getMasterCategoriesV2Failure,
  [Types.GET_SUPPLY_BRANDS_REQUEST]: getSupplyBrandsRequest,
  [Types.GET_SUPPLY_BRANDS_SUCCESS]: getSupplyBrandsSuccess,
  [Types.GET_SUPPLY_BRANDS_FAILURE]: getSupplyBrandsFailure,
  [Types.CREATE_SELLING_PRICE_FINANCIALS_REQUEST]: createSellingPriceFinancialsRequest,
  [Types.CREATE_SELLING_PRICE_FINANCIALS_SUCCESS]: createSellingPriceFinancialsSuccess,
  [Types.CREATE_SELLING_PRICE_FINANCIALS_FAILURE]: createSellingPriceFinancialsFailure,
  [Types.CREATE_SELLING_PRICE_DISCOUNTED_FINANCIALS_REQUEST]: createSellingPriceDiscountedFinancialsRequest,
  [Types.CREATE_SELLING_PRICE_DISCOUNTED_FINANCIALS_SUCCESS]: createSellingPriceDiscountedFinancialsSuccess,
  [Types.CREATE_SELLING_PRICE_DISCOUNTED_FINANCIALS_FAILURE]: createSellingPriceDiscountedFinancialsFailure,
  [Types.GET_SELLING_PRICE_LIST_REQUEST]: getSellingPriceListRequest,
  [Types.GET_SELLING_PRICE_LIST_SUCCESS]: getSellingPriceListSuccess,
  [Types.GET_SELLING_PRICE_LIST_FAILURE]: getSellingPriceListFailure,
  [Types.GET_MARKET_PRODUCTS_PRICE_LIST_REQUEST]: getMarketProductsPriceListRequest,
  [Types.GET_MARKET_PRODUCTS_PRICE_LIST_SUCCESS]: getMarketProductsPriceListSuccess,
  [Types.GET_MARKET_PRODUCTS_PRICE_LIST_FAILURE]: getMarketProductsPriceListFailure,
  [Types.UPDATE_BUNDLE_SUB_PRODUCT_PRICES_REQUEST]: updateBundleSubProductPricesRequest,
  [Types.UPDATE_BUNDLE_SUB_PRODUCT_PRICES_SUCCESS]: updateBundleSubProductPricesSuccess,
  [Types.UPDATE_BUNDLE_SUB_PRODUCT_PRICES_FAILURE]: updateBundleSubProductPricesFailure,
  [Types.UPDATE_BUNDLE_SUB_PRODUCT_STRUCK_PRICE_REQUEST]: updateBundleSubProductStruckPriceRequest,
  [Types.UPDATE_BUNDLE_SUB_PRODUCT_STRUCK_PRICE_SUCCESS]: updateBundleSubProductStruckPriceSuccess,
  [Types.UPDATE_BUNDLE_SUB_PRODUCT_STRUCK_PRICE_FAILURE]: updateBundleSubProductStruckPriceFailure,
  [Types.DELETE_BUNDLE_STRUCK_PRICE_REQUEST]: deleteBundleStruckPriceRequest,
  [Types.DELETE_BUNDLE_STRUCK_PRICE_SUCCESS]: deleteBundleStruckPriceSuccess,
  [Types.DELETE_BUNDLE_STRUCK_PRICE_FAILURE]: deleteBundleStruckPriceFailure,
  [Types.UPDATE_MARKET_PRODUCT_PRICE_REQUEST]: updateMarketProductPriceRequest,
  [Types.UPDATE_MARKET_PRODUCT_PRICE_SUCCESS]: updateMarketProductPriceSuccess,
  [Types.UPDATE_MARKET_PRODUCT_PRICE_FAILURE]: updateMarketProductPriceFailure,
  [Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_REQUEST]: updateMarketProductDiscountedPriceRequest,
  [Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_SUCCESS]: updateMarketProductDiscountedPriceSuccess,
  [Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_FAILURE]: updateMarketProductDiscountedPriceFailure,
  [Types.DELETE_BUYING_PRICE_FINANCIALS_REQUEST]: deleteBuyingPriceFinancialsRequest,
  [Types.DELETE_BUYING_PRICE_FINANCIALS_SUCCESS]: deleteBuyingPriceFinancialsSuccess,
  [Types.DELETE_BUYING_PRICE_FINANCIALS_FAILURE]: deleteBuyingPriceFinancialsFailure,
  [Types.DELETE_DISCOUNTED_PRICE_REQUEST]: deleteDiscountedPriceRequest,
  [Types.DELETE_DISCOUNTED_PRICE_SUCCESS]: deleteDiscountedPriceSuccess,
  [Types.DELETE_DISCOUNTED_PRICE_FAILURE]: deleteDiscountedPriceFailure,
  [Types.DESTROY_PAGE]: destroy,
};
export default createReducer(INITIAL_STATE, HANDLERS);
