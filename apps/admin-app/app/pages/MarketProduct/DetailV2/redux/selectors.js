import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { MARKET_PRODUCT_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { classifyValidationErrors } from '@app/pages/MarketProduct/utils';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.DETAIL;

export const getMarketProductByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductById');
    },
    ({ data }) => {
      return data?.marketProduct || {};
    },
  ),
  getPositions: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductById');
    },
    ({ data }) => {
      return data?.positions || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductById');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductById?.error,
  ),
};

export const getMarketProductSlugsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSlugs');
    },
    ({ data }) => {
      return data?.productSlugs || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSlugs');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const createMarketProductSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProduct');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProduct');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const updateMarketProductSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProduct');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProduct');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProduct');
    },
    ({ error }) => {
      return error;
    },
  ),
  getValidationErrors: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProduct');
    },
    state => {
      return classifyValidationErrors(state?.data?.details?.errors || []);
    },
  ),
};

export const getTransferGroupsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroups');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getTransferGroups');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getProductTransferGroupsByProductSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductTransferGroupsByProduct');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductTransferGroupsByProduct');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const updateTransferGroupsOfProductSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateTransferGroupsOfProduct');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateTransferGroupsOfProduct');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const createMarketProductImageUrlSelector = {
  getUploadedImages: createSelector(
    state => state[reducerKey],
    state => state?.createMarketProductImageUrl?.uploadedImages,
  ),
  getErroredImages: createSelector(
    state => state[reducerKey],
    state => state?.createMarketProductImageUrl?.erroredImages,
  ),
};

export const getProductsOfSubCategorySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductsOfSubCategory');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductsOfSubCategory');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getSubCategoryProductPositions: state => state?.[reducerKey]?.getProductsOfSubCategory?.data?.items
    ?.filter(subCategoryProductPosition => !!subCategoryProductPosition.item),
};

export const updateMainCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMainCategory');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const createMarketProductTagSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProductTag');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const deleteMarketProductTagSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.deleteMarketProductTag?.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state?.deleteMarketProductTag?.error,
  ),
  getTagId: createSelector(
    state => state[reducerKey],
    state => state?.deleteMarketProductTag?.tagId,
  ),
};

export const getMarketProductTagsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductTags');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductTags');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMarketProductFeedDataSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductFeedData');
    },
    ({ data = {} }) => {
      return data?.productFeedData || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductFeedData');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMarketProductBundlesDataSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductBundlesData?.data?.products,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductBundlesData?.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductBundlesData?.error,
  ),
};

export const getIsImperialUsedSelector = {
  getData: createSelector(
    state => {
      const productType = state?.[reducerKey]?.getMarketProductById?.data?.marketProduct?.type;
      const isProductWeight = Number(productType) === MARKET_PRODUCT_TYPE.WEIGHT;
      const isImperialUnitUsed = state?.[reducerKey]?.isImperialUnitUsed || JSON.parse(localStorage.getItem('isImperialUnitUsed'));
      return !isProductWeight && isImperialUnitUsed;
    },
    value => {
      return value;
    },
  ),
};

export const addMarketCategoryPositionSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.addMarketCategoryPosition?.isPending,
  ),
};

export const deleteMarketCategoryPositionSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.deleteMarketCategoryPosition?.isPending,
  ),
};

export const createBuyingPriceFinancialsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createBuyingPriceFinancials.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.createBuyingPriceFinancials.error,
  ),
};

export const getProductActivationValidationErrorsSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getProductActivationValidationErrors?.data,
  ),
  getValidationErrors: createSelector(
    state => state[reducerKey],
    state => classifyValidationErrors(state?.getProductActivationValidationErrors?.data?.details?.[0]?.errors || []),
  ),
  getIsProductValid: createSelector(
    state => state[reducerKey],
    state => state?.getProductActivationValidationErrors?.data?.isValid,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getProductActivationValidationErrors?.isPending,
  ),
};

export const getActivateProductsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.activateProducts?.isPending,
  ),
};

export const updateMarketProductPricingSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPricing.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPricing.data,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPricing.error,
  ),
};

export const createWastePricingSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createWastePricing.isPending,
  ),
};

export const getWarehouseSegmentsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getWarehouseSegments.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getWarehouseSegments.data?.segments,
  ),
};

export const getBadgesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getBadges.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getBadges.data,
  ),
};

export const updateBuyingPriceFinancialsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateBuyingPriceFinancials.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateBuyingPriceFinancials.data,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateBuyingPriceFinancials.error,
  ),
};

export const updateWastePricingSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateWastePricing.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateWastePricing.data,
  ),
};

export const updateWarehousePricingSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateWarehousePricing.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateWarehousePricing.data,
  ),
};

export const createSupplyLogisticInfoSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createSupplyLogisticInfo.isPending,
  ),
};

export const updateSupplyLogisticInfoSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateSupplyLogisticInfo.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateSupplyLogisticInfo.data,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateSupplyLogisticInfo.error,
  ),
};

export const getSupplyLogisticInfoSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getSupplyLogisticInfo.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getSupplyLogisticInfo.data,
  ),
};

export const getMasterCategoriesV2Selector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMasterCategoriesV2.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMasterCategoriesV2.data,
  ),
};

export const getBundlePricingsBySubProductIdSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getBundlePricingsBySubProductId.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getBundlePricingsBySubProductId.data,
  ),
};

export const getSupplyBrandsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getSupplyBrands.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getSupplyBrands.data,
  ),
};

export const createSellingPriceFinancialsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createSellingPriceFinancials.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.createSellingPriceFinancials.error,
  ),
};
export const createSellingPriceDiscountedFinancialsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createSellingPriceDiscountedFinancials.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.createSellingPriceDiscountedFinancials.error,
  ),
};
export const getSellingPriceListSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getSellingPriceList.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getSellingPriceList.data,
  ),
};

export const getMarketProductsPriceListSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductsPriceList.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductsPriceList.data,
  ),
};
export const updateBundleSubProductPricesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateBundleSubProductPrices.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateBundleSubProductPrices.data,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateBundleSubProductPrices.error,
  ),
};

export const updateBundleSubProductStruckPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateBundleSubProductStruckPrice.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.updateBundleSubProductStruckPrice.data,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateBundleSubProductStruckPrice.error,
  ),
};

export const deleteBundleStruckPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.deleteBundleStruckPrice.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.deleteBundleStruckPrice.data,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.deleteBundleStruckPrice.error,
  ),
};

export const updateMarketProductPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPrice.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPrice.error,
  ),
};
export const updateMarketProductDiscountedPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductDiscountedPrice.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductDiscountedPrice.error,
  ),
};

export const assignFamilyToProductSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.assignFamilyToProduct?.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state?.assignFamilyToProduct?.error,
  ),
};

export const getMarketProductAllPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductAllPrice.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductAllPrice.data,
  ),
};
export const deleteBuyingPriceFinancialsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.deleteBuyingPriceFinancials.isPending,
  ),
};
export const deleteDiscountedPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.deleteDiscountedPrice.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.deleteDiscountedPrice.data,
  ),
};
