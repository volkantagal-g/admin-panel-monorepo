import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getSupplierById: {
    isPending: false,
    data: {},
    error: null,
  },
  mapSupplierProducts: {
    isPending: false,
    data: {},
    error: null,
  },
  mapSupplierWarehouses: {
    isPending: false,
    data: {},
    error: null,
  },
  getSupplierProductMappings: {
    isPending: false,
    data: [],
    error: null,
  },
  updateSupplier: {
    isPending: false,
    data: {},
    error: null,
  },
  updateSupplierCustomSettings: {
    isPending: false,
    data: {},
    error: null,
  },
  createSupplierAccount: {
    isPending: false,
    data: {},
    error: null,
  },
  updateDCBonusForLogoAccount: {
    isPending: false,
    data: {},
    error: null,
  },
  updateSupplierProductMappingBarcodeAndCode: {
    isPending: false,
    data: {},
    error: null,
  },
  activateSupplier: {
    isPending: false,
    error: null,
  },
  deactivateSupplier: {
    isPending: false,
    error: null,
  },
};

export const getSupplierByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSupplierById: {
      ...INITIAL_STATE.getSupplierById,
      isPending: true,
    },
  };
};

export const getSupplierByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSupplierById: {
      ...INITIAL_STATE.getSupplierById,
      data,
      isPending: false,
    },
  };
};

export const getSupplierByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSupplierById: {
      ...INITIAL_STATE.getSupplierById,
      isPending: false,
      error,
    },
  };
};

export const mapSupplierProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    mapSupplierProducts: {
      ...INITIAL_STATE.mapSupplierProducts,
      isPending: true,
    },
  };
};

export const mapSupplierProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mapSupplierProducts: {
      ...INITIAL_STATE.mapSupplierProducts,
      data,
      isPending: false,
    },
  };
};

export const mapSupplierProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    mapSupplierProducts: {
      ...INITIAL_STATE.mapSupplierProducts,
      isPending: false,
      error,
    },
  };
};

export const mapSupplierWarehousesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    mapSupplierWarehouses: {
      ...INITIAL_STATE.mapSupplierWarehouses,
      isPending: true,
    },
  };
};

export const mapSupplierWarehousesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mapSupplierWarehouses: {
      ...INITIAL_STATE.mapSupplierWarehouses,
      data,
      isPending: false,
    },
  };
};

export const mapSupplierWarehousesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    mapSupplierWarehouses: {
      ...INITIAL_STATE.mapSupplierWarehouses,
      isPending: false,
      error,
    },
  };
};

export const getSupplierProductMappingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSupplierProductMappings: {
      ...INITIAL_STATE.getSupplierProductMappings,
      isPending: true,
    },
  };
};

export const getSupplierProductMappingsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSupplierProductMappings: {
      ...INITIAL_STATE.getSupplierProductMappings,
      data,
      isPending: false,
    },
  };
};

export const getSupplierProductMappingsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSupplierProductMappings: {
      ...INITIAL_STATE.getSupplierProductMappings,
      isPending: false,
      error,
    },
  };
};

export const updateSupplierRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateSupplier: {
      ...INITIAL_STATE.updateSupplier,
      isPending: true,
    },
  };
};

export const updateSupplierSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateSupplier: {
      ...INITIAL_STATE.updateSupplier,
      data,
      isPending: false,
    },
    getSupplierById: {
      ...INITIAL_STATE.getSupplierById,
      data,
      isPending: false,
    },
  };
};

export const updateSupplierFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateSupplier: {
      ...INITIAL_STATE.updateSupplier,
      isPending: false,
      error,
    },
  };
};

export const updateSupplierCustomSettingsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateSupplierCustomSettings: {
      ...INITIAL_STATE.updateSupplierCustomSettings,
      isPending: true,
    },
  };
};

export const updateSupplierCustomSettingsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateSupplierCustomSettings: {
      ...INITIAL_STATE.updateSupplierCustomSettings,
      data,
      isPending: false,
    },
    getSupplierById: {
      ...INITIAL_STATE.getSupplierById,
      data,
      isPending: false,
    },
  };
};

export const updateSupplierCustomSettingsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateSupplierCustomSettings: {
      ...INITIAL_STATE.updateSupplierCustomSettings,
      isPending: false,
      error,
    },
  };
};

export const createSupplierAccountRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createSupplierAccount: {
      ...INITIAL_STATE.createSupplierAccount,
      isPending: true,
    },
  };
};

export const createSupplierAccountSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createSupplierAccount: {
      ...INITIAL_STATE.createSupplierAccount,
      data,
      isPending: false,
    },
  };
};

export const createSupplierAccountFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createSupplierAccount: {
      ...INITIAL_STATE.createSupplierAccount,
      isPending: false,
      error,
    },
  };
};

export const updateDCBonusForLogoAccountRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateDCBonusForLogoAccount: {
      ...INITIAL_STATE.updateDCBonusForLogoAccount,
      isPending: true,
    },
  };
};

export const updateDCBonusForLogoAccountSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateDCBonusForLogoAccount: {
      ...INITIAL_STATE.updateDCBonusForLogoAccount,
      data,
      isPending: false,
    },
  };
};

export const updateDCBonusForLogoAccountFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateDCBonusForLogoAccount: {
      ...INITIAL_STATE.updateDCBonusForLogoAccount,
      isPending: false,
      error,
    },
  };
};

export const updateSupplierProductMappingBarcodeAndCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateSupplierProductMappingBarcodeAndCode: {
      ...INITIAL_STATE.updateSupplierProductMappingBarcodeAndCode,
      isPending: true,
    },
  };
};

export const updateSupplierProductMappingBarcodeAndCodeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateSupplierProductMappingBarcodeAndCode: {
      ...INITIAL_STATE.updateSupplierProductMappingBarcodeAndCode,
      data,
      isPending: false,
    },
  };
};

export const updateSupplierProductMappingBarcodeAndCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateSupplierProductMappingBarcodeAndCode: {
      ...INITIAL_STATE.updateSupplierProductMappingBarcodeAndCode,
      isPending: false,
      error,
    },
  };
};

export const activateSupplierRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateSupplier: {
      ...INITIAL_STATE.activateSupplier,
      isPending: true,
    },
  };
};

export const activateSupplierSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    activateSupplier: {
      ...INITIAL_STATE.activateSupplier,
      isPending: false,
    },
  };
};

export const activateSupplierFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    activateSupplier: {
      ...INITIAL_STATE.activateSupplier,
      isPending: false,
      error,
    },
  };
};

export const deactivateSupplierRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateSupplier: {
      ...INITIAL_STATE.deactivateSupplier,
      isPending: true,
    },
  };
};

export const deactivateSupplierSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateSupplier: {
      ...INITIAL_STATE.deactivateSupplier,
      isPending: false,
    },
  };
};

export const deactivateSupplierFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deactivateSupplier: {
      ...INITIAL_STATE.deactivateSupplier,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_SUPPLIER_BY_ID_REQUEST]: getSupplierByIdRequest,
  [Types.GET_SUPPLIER_BY_ID_SUCCESS]: getSupplierByIdSuccess,
  [Types.GET_SUPPLIER_BY_ID_FAILURE]: getSupplierByIdFailure,
  [Types.MAP_SUPPLIER_PRODUCTS_REQUEST]: mapSupplierProductsRequest,
  [Types.MAP_SUPPLIER_PRODUCTS_SUCCESS]: mapSupplierProductsSuccess,
  [Types.MAP_SUPPLIER_PRODUCTS_FAILURE]: mapSupplierProductsFailure,
  [Types.MAP_SUPPLIER_WAREHOUSES_REQUEST]: mapSupplierWarehousesRequest,
  [Types.MAP_SUPPLIER_WAREHOUSES_SUCCESS]: mapSupplierWarehousesSuccess,
  [Types.MAP_SUPPLIER_WAREHOUSES_FAILURE]: mapSupplierWarehousesFailure,
  [Types.GET_SUPPLIER_PRODUCT_MAPPINGS_REQUEST]: getSupplierProductMappingsRequest,
  [Types.GET_SUPPLIER_PRODUCT_MAPPINGS_SUCCESS]: getSupplierProductMappingsSuccess,
  [Types.GET_SUPPLIER_PRODUCT_MAPPINGS_FAILURE]: getSupplierProductMappingsFailure,
  [Types.UPDATE_SUPPLIER_REQUEST]: updateSupplierRequest,
  [Types.UPDATE_SUPPLIER_SUCCESS]: updateSupplierSuccess,
  [Types.UPDATE_SUPPLIER_FAILURE]: updateSupplierFailure,
  [Types.CREATE_SUPPLIER_ACCOUNT_REQUEST]: createSupplierAccountRequest,
  [Types.CREATE_SUPPLIER_ACCOUNT_SUCCESS]: createSupplierAccountSuccess,
  [Types.CREATE_SUPPLIER_ACCOUNT_FAILURE]: createSupplierAccountFailure,
  [Types.UPDATE_DC_BONUS_FOR_LOGO_ACCOUNT_REQUEST]: updateDCBonusForLogoAccountRequest,
  [Types.UPDATE_DC_BONUS_FOR_LOGO_ACCOUNT_SUCCESS]: updateDCBonusForLogoAccountSuccess,
  [Types.UPDATE_DC_BONUS_FOR_LOGO_ACCOUNT_FAILURE]: updateDCBonusForLogoAccountFailure,
  [Types.UPDATE_SUPPLIER_PRODUCT_MAPPING_BARCODE_AND_CODE_REQUEST]: updateSupplierProductMappingBarcodeAndCodeRequest,
  [Types.UPDATE_SUPPLIER_PRODUCT_MAPPING_BARCODE_AND_CODE_SUCCESS]: updateSupplierProductMappingBarcodeAndCodeSuccess,
  [Types.UPDATE_SUPPLIER_PRODUCT_MAPPING_BARCODE_AND_CODE_FAILURE]: updateSupplierProductMappingBarcodeAndCodeFailure,
  [Types.ACTIVATE_SUPPLIER_REQUEST]: activateSupplierRequest,
  [Types.ACTIVATE_SUPPLIER_SUCCESS]: activateSupplierSuccess,
  [Types.ACTIVATE_SUPPLIER_FAILURE]: activateSupplierFailure,
  [Types.DEACTIVATE_SUPPLIER_REQUEST]: deactivateSupplierRequest,
  [Types.DEACTIVATE_SUPPLIER_SUCCESS]: deactivateSupplierSuccess,
  [Types.DEACTIVATE_SUPPLIER_FAILURE]: deactivateSupplierFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
