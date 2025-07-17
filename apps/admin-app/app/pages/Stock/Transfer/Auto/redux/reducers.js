import { createReducer } from 'reduxsauce';

import { AUTO_TRANSFER_SERVICE_TYPE } from '@app/pages/Stock/Transfer/constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  stockTransferAuto: {
    data: {},
    isPending: false,
    error: null,
  },
  categoryParams: { data: {} },
  formWarehouses: { data: [] },
  regularWarehouses: { data: [] },
  productParams: { data: [] },
  supplierId: { data: null },
  serviceType: { data: AUTO_TRANSFER_SERVICE_TYPE.DEFAULT },
  getMarketProductMasterCategoriesOld: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getStockTransferAutoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    stockTransferAuto: {
      ...state.stockTransferAuto,
      isPending: true,
    },
  };
};

export const getStockTransferAutoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    stockTransferAuto: {
      ...state.stockTransferAuto,
      data,
      isPending: false,
    },
  };
};

export const getStockTransferAutoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    stockTransferAuto: {
      ...state.stockTransferAuto,
      isPending: false,
      error,
    },
  };
};

export const setCategoryParams = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    categoryParams: {
      ...state.categoryParams,
      data,
    },
  };
};

export const setFormWarehouses = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    formWarehouses: {
      ...state.formWarehouses,
      data,
    },
  };
};

export const setRegularWarehouses = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    regularWarehouses: {
      ...state.regularWarehouses,
      data,
    },
  };
};

export const setProductParams = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    productParams: {
      ...state.productParams,
      data,
    },
  };
};

export const setSupplierId = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    supplierId: {
      ...state.supplierId,
      data,
    },
  };
};

export const setServiceType = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    serviceType: {
      ...state.serviceType,
      data,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_STOCK_TRANSFER_AUTO_REQUEST]: getStockTransferAutoRequest,
  [Types.GET_STOCK_TRANSFER_AUTO_SUCCESS]: getStockTransferAutoSuccess,
  [Types.GET_STOCK_TRANSFER_AUTO_FAILURE]: getStockTransferAutoFailure,
  [Types.SET_CATEGORY_PARAMS]: setCategoryParams,
  [Types.SET_FORM_WAREHOUSES]: setFormWarehouses,
  [Types.SET_REGULAR_WAREHOUSES]: setRegularWarehouses,
  [Types.SET_PRODUCT_PARAMS]: setProductParams,
  [Types.SET_SUPPLIER_ID]: setSupplierId,
  [Types.SET_SERVICE_TYPE]: setServiceType,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST]: getMarketProductMasterCategoriesOldRequest,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_SUCCESS]: getMarketProductMasterCategoriesOldSuccess,
  [Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_FAILURE]: getMarketProductMasterCategoriesOldFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
