import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Planogram/Products/redux/actions';

export const INITIAL_STATE = {
  getPlanogramProductList: {
    data: {},
    isPending: false,
    error: null,
  },
  getSizes: {
    data: {},
    isPending: false,
    error: null,
  },
  getDemographies: {
    data: {},
    isPending: false,
    error: null,
  },
  getWarehouseTypes: {
    data: {},
    isPending: false,
    error: null,
  },
  getMainWarehousesAndCities: {
    data: {},
    isPending: false,
    error: null,
  },
  getPlanogramProductDetails: {
    data: {},
    isPending: false,
    error: null,
  },
  filterPlanogramWarehouse: {
    data: {},
    isPending: false,
    error: null,
  },
  updatePlanogramProduct: {
    data: {},
    isPending: false,
    error: null,
  },
};
export const getPlanogramProductListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPlanogramProductList: {
      ...state.getPlanogramProductList,
      isPending: true,
    },
  };
};
export const getPlanogramProductListSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    getPlanogramProductList: {
      ...state.getPlanogramProductList,
      data,
      isPending: false,
    },
  };
};
export const getPlanogramProductListFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    getPlanogramProductList: {
      ...state.getPlanogramProductList,
      error,
      isPending: false,
    },
  };
};
export const getSizesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSizes: {
      ...state.getSizes,
      isPending: true,
    },
  };
};
export const getSizesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSizes: {
      ...state.getSizes,
      data,
      isPending: false,
    },
  };
};
export const getSizesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSizes: {
      ...state.getSizes,
      isPending: false,
      error,
    },
  };
};
export const getDemographiesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getDemographies: {
      ...state.getDemographies,
      isPending: true,
    },
  };
};
export const getDemographiesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getDemographies: {
      ...state.getDemographies,
      data,
      isPending: false,
    },
  };
};
export const getDemographiesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getDemographies: {
      ...state.getDemographies,
      isPending: false,
      error,
    },
  };
};
export const getWarehouseTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getWarehouseTypes: {
      ...state.getWarehouseTypes,
      isPending: true,
    },
  };
};
export const getWarehouseTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getWarehouseTypes: {
      ...state.getWarehouseTypes,
      data,
      isPending: false,
    },
  };
};
export const getWarehouseTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getWarehouseTypes: {
      ...state.getWarehouseTypes,
      isPending: false,
      error,
    },
  };
};
export const getMainWarehousesAndCitiesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMainWarehousesAndCities: {
      ...state.getMainWarehousesAndCities,
      isPending: true,
    },
  };
};
export const getMainWarehousesAndCitiesSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    getMainWarehousesAndCities: {
      ...state.getMainWarehousesAndCities,
      data,
      isPending: false,
    },
  };
};
export const getMainWarehousesAndCitiesFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    getMainWarehousesAndCities: {
      ...state.getMainWarehousesAndCities,
      isPending: false,
      error,
    },
  };
};
export const getPlanogramProductDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPlanogramProductDetails: {
      ...state.getPlanogramProductDetails,
      isPending: true,
    },
  };
};
export const getPlanogramProductDetailsSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    getPlanogramProductDetails: {
      ...state.getPlanogramProductDetails,
      data,
      isPending: false,
    },
  };
};
export const getPlanogramProductDetailsFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    getPlanogramProductDetails: {
      ...state.getPlanogramProductDetails,
      isPending: false,
      error,
    },
  };
};
export const filterPlanogramWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    filterPlanogramWarehouse: {
      ...state.filterPlanogramWarehouse,
      isPending: true,
    },
  };
};
export const filterPlanogramWarehouseSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    filterPlanogramWarehouse: {
      ...state.filterPlanogramWarehouse,
      data,
      isPending: false,
    },
  };
};
export const filterPlanogramWarehouseFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    filterPlanogramWarehouse: {
      ...state.filterPlanogramWarehouse,
      isPending: false,
      error,
    },
  };
};
export const updatePlanogramProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePlanogramProduct: {
      ...state.updatePlanogramProduct,
      isPending: true,
    },
  };
};
export const updatePlanogramProductSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    updatePlanogramProduct: {
      ...state.updatePlanogramProduct,
      data,
      isPending: false,
    },
  };
};
export const updatePlanogramProductFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    updatePlanogramProduct: {
      ...state.updatePlanogramProduct,
      error,
      isPending: false,
    },
  };
};
export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PLANOGRAM_PRODUCT_LIST_REQUEST]: getPlanogramProductListRequest,
  [Types.GET_PLANOGRAM_PRODUCT_LIST_SUCCESS]: getPlanogramProductListSuccess,
  [Types.GET_PLANOGRAM_PRODUCT_LIST_FAILURE]: getPlanogramProductListFailure,
  [Types.GET_SIZES_REQUEST]: getSizesRequest,
  [Types.GET_SIZES_SUCCESS]: getSizesSuccess,
  [Types.GET_SIZES_FAILURE]: getSizesFailure,
  [Types.GET_DEMOGRAPHIES_REQUEST]: getDemographiesRequest,
  [Types.GET_DEMOGRAPHIES_SUCCESS]: getDemographiesSuccess,
  [Types.GET_DEMOGRAPHIES_FAILURE]: getDemographiesFailure,
  [Types.GET_WAREHOUSE_TYPES_REQUEST]: getWarehouseTypesRequest,
  [Types.GET_WAREHOUSE_TYPES_SUCCESS]: getWarehouseTypesSuccess,
  [Types.GET_WAREHOUSE_TYPES_FAILURE]: getWarehouseTypesFailure,
  [Types.GET_MAIN_WAREHOUSES_AND_CITIES_REQUEST]:
    getMainWarehousesAndCitiesRequest,
  [Types.GET_MAIN_WAREHOUSES_AND_CITIES_SUCCESS]:
    getMainWarehousesAndCitiesSuccess,
  [Types.GET_MAIN_WAREHOUSES_AND_CITIES_FAILURE]:
    getMainWarehousesAndCitiesFailure,
  [Types.GET_PLANOGRAM_PRODUCT_DETAILS_REQUEST]:
    getPlanogramProductDetailsRequest,
  [Types.GET_PLANOGRAM_PRODUCT_DETAILS_SUCCESS]:
    getPlanogramProductDetailsSuccess,
  [Types.GET_PLANOGRAM_PRODUCT_DETAILS_FAILURE]:
    getPlanogramProductDetailsFailure,
  [Types.FILTER_PLANOGRAM_WAREHOUSE_REQUEST]: filterPlanogramWarehouseRequest,
  [Types.FILTER_PLANOGRAM_WAREHOUSE_SUCCESS]: filterPlanogramWarehouseSuccess,
  [Types.FILTER_PLANOGRAM_WAREHOUSE_FAILURE]: filterPlanogramWarehouseFailure,
  [Types.UPDATE_PLANOGRAM_PRODUCT_REQUEST]: updatePlanogramProductRequest,
  [Types.UPDATE_PLANOGRAM_PRODUCT_SUCCESS]: updatePlanogramProductSuccess,
  [Types.UPDATE_PLANOGRAM_PRODUCT_FAILURE]: updatePlanogramProductFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
