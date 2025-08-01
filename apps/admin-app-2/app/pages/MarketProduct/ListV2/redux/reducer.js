import { createReducer } from 'reduxsauce';
import { fromPairs } from 'lodash';

import { productFilters } from '@shared/shared/constantValues';

import { Types } from './actions';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

const FILTER_INITIAL_STATUS_OPTIONS = [MARKET_PRODUCT_STATUS.ACTIVE, MARKET_PRODUCT_STATUS.INACTIVE];

export const INITIAL_SELECTED_FILTER_OPTIONS = fromPairs(Object.keys(productFilters).map(key => [key, true]));
export const INITIAL_SELECTED_STATUS_OPTIONS = Object.entries(MARKET_PRODUCT_STATUS)
  .filter(([, value]) => FILTER_INITIAL_STATUS_OPTIONS.includes(value))
  .map(([key]) => key);

export const INITIAL_STATE = {
  getMarketProducts: {
    data: undefined,
    isPending: false,
    error: null,
  },
  exportActiveMarketProducts: {
    isPending: false,
    error: null,
  },
  importMarketProductDetails: {
    data: {},
    isPending: false,
    error: null,
  },
  exportMarketProductDetails: {
    data: {},
    isPending: false,
    error: null,
  },
  importMarketProductAdditionalTables: {
    data: {},
    isPending: false,
    error: null,
  },
  exportMarketProductAdditionalTables: {
    data: {},
    isPending: false,
    error: null,
  },
  importMarketProductCategoryPositions: {
    data: {},
    isPending: false,
    error: null,
  },
  exportMarketProductCategoryPositions: {
    data: {},
    isPending: false,
    error: null,
  },
  exportMarketProductSupplyAndLogistic: {
    data: {},
    isPending: false,
    error: null,
  },
  exportMarketProductPricingMetadata: {
    data: {},
    isPending: false,
    error: null,
  },
  importMarketProductDomainLimits: {
    data: {},
    isPending: false,
    error: null,
  },
  exportMarketProductDomainLimits: {
    data: {},
    isPending: false,
    error: null,
  },
  importMarketProductSupplyAndLogistic: {
    data: {},
    isPending: false,
    error: null,
  },
  importMarketProductPricingMetadata: {
    data: {},
    isPending: false,
    error: null,
  },
  importMarketProductToggles: {
    data: {},
    isPending: false,
    error: null,
  },
  filters: {
    selectedOptions: INITIAL_SELECTED_FILTER_OPTIONS,
    selectedStatusOptions: INITIAL_SELECTED_STATUS_OPTIONS,
    ids: [],
  },
};

export const getMarketProductsRequest = state => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      isPending: true,
    },
  };
};

export const getMarketProductsSuccess = (state, { data }) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductsFailure = (state, { error }) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const exportActiveMarketProductsRequest = state => {
  return {
    ...state,
    exportActiveMarketProducts: {
      ...INITIAL_STATE.exportActiveMarketProducts,
      isPending: true,
    },
  };
};

export const exportActiveMarketProductsSuccess = state => {
  return {
    ...state,
    exportActiveMarketProducts: {
      ...INITIAL_STATE.exportActiveMarketProducts,
      isPending: false,
    },
  };
};

export const exportActiveMarketProductsFailure = (state, { error }) => {
  return {
    ...state,
    exportActiveMarketProducts: {
      ...INITIAL_STATE.exportActiveMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductDomainLimitsRequest = state => {
  return {
    ...state,
    importMarketProductDomainLimits: {
      ...INITIAL_STATE.importMarketProductDomainLimits,
      isPending: true,
    },
  };
};

export const importMarketProductDomainLimitsSuccess = (state, { data }) => {
  return {
    ...state,
    importMarketProductDomainLimits: {
      ...INITIAL_STATE.importMarketProductDomainLimits,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductDomainLimitsFailure = (state, { error }) => {
  return {
    ...state,
    importMarketProductDomainLimits: {
      ...INITIAL_STATE.importMarketProductDomainLimits,
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductDomainLimitsRequest = state => {
  return {
    ...state,
    exportMarketProductDomainLimits: {
      ...INITIAL_STATE.exportMarketProductDomainLimits,
      isPending: true,
    },
  };
};

export const exportMarketProductDomainLimitsSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductDomainLimits: {
      ...INITIAL_STATE.exportMarketProductDomainLimits,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductDomainLimitsFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductDomainLimits: {
      ...INITIAL_STATE.exportMarketProductDomainLimits,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductDetailsRequest = state => {
  return {
    ...state,
    importMarketProductDetails: {
      ...INITIAL_STATE.importMarketProductDetails,
      isPending: true,
    },
  };
};

export const importMarketProductDetailsSuccess = (state, { data }) => {
  return {
    ...state,
    importMarketProductDetails: {
      ...INITIAL_STATE.importMarketProductDetails,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductDetailsFailure = (state, { error }) => {
  return {
    ...state,
    importMarketProductDetails: {
      ...INITIAL_STATE.importMarketProductDetails,
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductDetailsRequest = state => {
  return {
    ...state,
    exportMarketProductDetails: {
      ...INITIAL_STATE.exportMarketProductDetails,
      isPending: true,
    },
  };
};

export const exportMarketProductDetailsSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductDetails: {
      ...INITIAL_STATE.exportMarketProductDetails,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductDetailsFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductDetails: {
      ...INITIAL_STATE.exportMarketProductDetails,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductAdditionalTablesRequest = state => {
  return {
    ...state,
    importMarketProductAdditionalTables: {
      ...INITIAL_STATE.importMarketProductAdditionalTables,
      isPending: true,
    },
  };
};

export const importMarketProductAdditionalTablesSuccess = (state, { data }) => {
  return {
    ...state,
    importMarketProductAdditionalTables: {
      ...INITIAL_STATE.importMarketProductAdditionalTables,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductAdditionalTablesFailure = (state, { error }) => {
  return {
    ...state,
    importMarketProductAdditionalTables: {
      ...INITIAL_STATE.importMarketProductAdditionalTables,
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductAdditionalTablesRequest = state => {
  return {
    ...state,
    exportMarketProductAdditionalTables: {
      ...INITIAL_STATE.exportMarketProductAdditionalTables,
      isPending: true,
    },
  };
};

export const exportMarketProductAdditionalTablesSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductAdditionalTables: {
      ...INITIAL_STATE.exportMarketProductAdditionalTables,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductAdditionalTablesFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductAdditionalTables: {
      ...INITIAL_STATE.exportMarketProductAdditionalTables,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductCategoryPositionsRequest = state => {
  return {
    ...state,
    importMarketProductCategoryPositions: {
      ...INITIAL_STATE.importMarketProductCategoryPositions,
      isPending: true,
    },
  };
};

export const importMarketProductCategoryPositionsSuccess = (state, { data }) => {
  return {
    ...state,
    importMarketProductCategoryPositions: {
      ...INITIAL_STATE.importMarketProductCategoryPositions,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductCategoryPositionsFailure = (state, { error }) => {
  return {
    ...state,
    importMarketProductCategoryPositions: {
      ...INITIAL_STATE.importMarketProductCategoryPositions,
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductCategoryPositionsRequest = state => {
  return {
    ...state,
    exportMarketProductCategoryPositions: {
      ...INITIAL_STATE.exportMarketProductCategoryPositions,
      isPending: true,
    },
  };
};

export const exportMarketProductCategoryPositionsSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductCategoryPositions: {
      ...INITIAL_STATE.exportMarketProductCategoryPositions,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductCategoryPositionsFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductCategoryPositions: {
      ...INITIAL_STATE.exportMarketProductCategoryPositions,
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductSupplyAndLogisticRequest = state => {
  return {
    ...state,
    exportMarketProductSupplyAndLogistic: {
      ...INITIAL_STATE.exportMarketProductSupplyAndLogistic,
      isPending: true,
    },
  };
};

export const exportMarketProductSupplyAndLogisticSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductSupplyAndLogistic: {
      ...INITIAL_STATE.exportMarketProductSupplyAndLogistic,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductSupplyAndLogisticFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductSupplyAndLogistic: {
      ...INITIAL_STATE.exportMarketProductSupplyAndLogistic,
      isPending: false,
      error,
    },
  };
};

export const exportMarketProductPricingMetadataRequest = state => {
  return {
    ...state,
    exportMarketProductPricingMetadata: {
      ...INITIAL_STATE.exportMarketProductPricingMetadata,
      isPending: true,
    },
  };
};

export const exportMarketProductPricingMetadataSuccess = (state, { data }) => {
  return {
    ...state,
    exportMarketProductPricingMetadata: {
      ...INITIAL_STATE.exportMarketProductPricingMetadata,
      data,
      isPending: false,
    },
  };
};

export const exportMarketProductPricingMetadataFailure = (state, { error }) => {
  return {
    ...state,
    exportMarketProductPricingMetadata: {
      ...INITIAL_STATE.exportMarketProductPricingMetadata,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductSupplyAndLogisticRequest = state => {
  return {
    ...state,
    importSupplyAndLogistic: {
      ...INITIAL_STATE.importMarketProductSupplyAndLogistic,
      isPending: true,
    },
  };
};

export const importMarketProductSupplyAndLogisticSuccess = (state, { data }) => {
  return {
    ...state,
    importSupplyAndLogistic: {
      ...INITIAL_STATE.importMarketProductSupplyAndLogistic,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductSupplyAndLogisticFailure = (state, { error }) => {
  return {
    ...state,
    importSupplyAndLogistic: {
      ...INITIAL_STATE.importMarketProductSupplyAndLogistic,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductPricingMetadataRequest = state => {
  return {
    ...state,
    importSupplyAndLogistic: {
      ...INITIAL_STATE.importMarketProductPricingMetadata,
      isPending: true,
    },
  };
};

export const importMarketProductPricingMetadataSuccess = (state, { data }) => {
  return {
    ...state,
    importSupplyAndLogistic: {
      ...INITIAL_STATE.importMarketProductPricingMetadata,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductPricingMetadataFailure = (state, { error }) => {
  return {
    ...state,
    importSupplyAndLogistic: {
      ...INITIAL_STATE.importMarketProductPricingMetadata,
      isPending: false,
      error,
    },
  };
};

export const importMarketProductTogglesRequest = state => {
  return {
    ...state,
    importMarketProductToggles: {
      ...INITIAL_STATE.importMarketProductToggles,
      isPending: true,
    },
  };
};

export const importMarketProductTogglesSuccess = (state, { data }) => {
  return {
    ...state,
    importMarketProductToggles: {
      ...INITIAL_STATE.importMarketProductToggles,
      data,
      isPending: false,
    },
  };
};

export const importMarketProductTogglesFailure = (state, { error }) => {
  return {
    ...state,
    importMarketProductToggles: {
      ...INITIAL_STATE.importMarketProductToggles,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const setFilterOptions = (state, { selectedOptions }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedOptions,
    },
  };
};

export const setStatusFilterOptions = (state, { selectedStatusOptions }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedStatusOptions,
    },
  };
};

export const setEnteredIds = (state, { ids }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ids,
    },
  };
};

export const HANDLERS = {
  [Types.GET_MARKET_PRODUCTS_REQUEST]: getMarketProductsRequest,
  [Types.GET_MARKET_PRODUCTS_SUCCESS]: getMarketProductsSuccess,
  [Types.GET_MARKET_PRODUCTS_FAILURE]: getMarketProductsFailure,
  [Types.EXPORT_ACTIVE_MARKET_PRODUCTS_REQUEST]: exportActiveMarketProductsRequest,
  [Types.EXPORT_ACTIVE_MARKET_PRODUCTS_SUCCESS]: exportActiveMarketProductsSuccess,
  [Types.EXPORT_ACTIVE_MARKET_PRODUCTS_FAILURE]: exportActiveMarketProductsFailure,
  [Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST]: importMarketProductDomainLimitsRequest,
  [Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_SUCCESS]: importMarketProductDomainLimitsSuccess,
  [Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_FAILURE]: importMarketProductDomainLimitsFailure,
  [Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST]: exportMarketProductDomainLimitsRequest,
  [Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_SUCCESS]: exportMarketProductDomainLimitsSuccess,
  [Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_FAILURE]: exportMarketProductDomainLimitsFailure,
  [Types.IMPORT_MARKET_PRODUCT_DETAILS_REQUEST]: importMarketProductDetailsRequest,
  [Types.IMPORT_MARKET_PRODUCT_DETAILS_SUCCESS]: importMarketProductDetailsSuccess,
  [Types.IMPORT_MARKET_PRODUCT_DETAILS_FAILURE]: importMarketProductDetailsFailure,
  [Types.EXPORT_MARKET_PRODUCT_DETAILS_REQUEST]: exportMarketProductDetailsRequest,
  [Types.EXPORT_MARKET_PRODUCT_DETAILS_SUCCESS]: exportMarketProductDetailsSuccess,
  [Types.EXPORT_MARKET_PRODUCT_DETAILS_FAILURE]: exportMarketProductDetailsFailure,
  [Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST]: importMarketProductAdditionalTablesRequest,
  [Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_SUCCESS]: importMarketProductAdditionalTablesSuccess,
  [Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_FAILURE]: importMarketProductAdditionalTablesFailure,
  [Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST]: exportMarketProductAdditionalTablesRequest,
  [Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_SUCCESS]: exportMarketProductAdditionalTablesSuccess,
  [Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_FAILURE]: exportMarketProductAdditionalTablesFailure,
  [Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST]: importMarketProductCategoryPositionsRequest,
  [Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_SUCCESS]: importMarketProductCategoryPositionsSuccess,
  [Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_FAILURE]: importMarketProductCategoryPositionsFailure,
  [Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST]: exportMarketProductCategoryPositionsRequest,
  [Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_SUCCESS]: exportMarketProductCategoryPositionsSuccess,
  [Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_FAILURE]: exportMarketProductCategoryPositionsFailure,
  [Types.IMPORT_MARKET_PRODUCT_SUPPLY_AND_LOGISTIC_REQUEST]: importMarketProductSupplyAndLogisticRequest,
  [Types.IMPORT_MARKET_PRODUCT_SUPPLY_AND_LOGISTIC_SUCCESS]: importMarketProductSupplyAndLogisticSuccess,
  [Types.IMPORT_MARKET_PRODUCT_SUPPLY_AND_LOGISTIC_FAILURE]: importMarketProductSupplyAndLogisticFailure,
  [Types.IMPORT_MARKET_PRODUCT_PRICING_METADATA_REQUEST]: importMarketProductPricingMetadataRequest,
  [Types.IMPORT_MARKET_PRODUCT_PRICING_METADATA_SUCCESS]: importMarketProductPricingMetadataSuccess,
  [Types.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FAILURE]: importMarketProductPricingMetadataFailure,
  [Types.IMPORT_MARKET_PRODUCT_TOGGLES_REQUEST]: importMarketProductTogglesRequest,
  [Types.IMPORT_MARKET_PRODUCT_TOGGLES_SUCCESS]: importMarketProductTogglesSuccess,
  [Types.IMPORT_MARKET_PRODUCT_TOGGLES_FAILURE]: importMarketProductTogglesFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_FILTER_OPTIONS]: setFilterOptions,
  [Types.SET_STATUS_FILTER_OPTIONS]: setStatusFilterOptions,
  [Types.SET_ENTERED_IDS]: setEnteredIds,
};

export default createReducer(INITIAL_STATE, HANDLERS);
