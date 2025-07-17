import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Planogram/Warehouses/redux/actions';

export const INITIAL_STATE = {
  updatePlanogramWarehouse: {
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
  listPlanogramWarehouses: {
    data: {},
    warehouseList: null,
    isPending: false,
    error: null,
  },
  listPlanogramWarehousesInitial: {
    data: {},
    warehouseList: null,
    isPending: false,
    error: null,
  },
  getPlanogramWarehouseDetails: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const updatePlanogramWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePlanogramWarehouse: {
      ...state.updatePlanogramWarehouse,
      isPending: true,
    },
  };
};
export const updatePlanogramWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatePlanogramWarehouse: {
      ...state.updatePlanogramWarehouse,
      data,
      isPending: false,
    },
  };
};
export const updatePlanogramWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatePlanogramWarehouse: {
      ...state.updatePlanogramWarehouse,
      isPending: false,
      error,
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
export const listPlanogramWarehousesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    listPlanogramWarehouses: {
      ...state.listPlanogramWarehouses,
      isPending: true,
    },
  };
};
export const listPlanogramWarehousesSuccess = (state = INITIAL_STATE, { data }) => {
  const warehouseList = data?.res?.items?.map(element => ({ id: element?.warehouseId, name: element?.name }));
  return {
    ...state,
    listPlanogramWarehouses: {
      ...state.listPlanogramWarehouses,
      data,
      warehouseList,
      isPending: false,
    },
  };
};
export const listPlanogramWarehousesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    listPlanogramWarehouses: {
      ...state.listPlanogramWarehouses,
      isPending: false,
      error,
    },
  };
};
export const listPlanogramWarehousesInitialRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    listPlanogramWarehousesInitial: {
      ...state.listPlanogramWarehousesInitial,
      isPending: true,
    },
  };
};
export const listPlanogramWarehousesInitialSuccess = (state = INITIAL_STATE, { data }) => {
  const warehouseList = data?.res?.items?.map(element => ({ id: element?.warehouseId, name: element?.name }));
  return {
    ...state,
    listPlanogramWarehousesInitial: {
      ...state.listPlanogramWarehousesInitial,
      data,
      warehouseList,
      isPending: false,
    },
  };
};
export const listPlanogramWarehousesInitialFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    listPlanogramWarehousesInitial: {
      ...state.listPlanogramWarehousesInitial,
      isPending: false,
      error,
    },
  };
};
export const getPlanogramWarehouseDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPlanogramWarehouseDetails: {
      ...state.getPlanogramWarehouseDetails,
      isPending: true,
    },
  };
};
export const getPlanogramWarehouseDetailsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getPlanogramWarehouseDetails: {
      ...state.getPlanogramWarehouseDetails,
      data,
      isPending: false,
    },
  };
};
export const getPlanogramWarehouseDetailsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPlanogramWarehouseDetails: {
      ...state.getPlanogramWarehouseDetails,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.UPDATE_PLANOGRAM_WAREHOUSE_REQUEST]: updatePlanogramWarehouseRequest,
  [Types.UPDATE_PLANOGRAM_WAREHOUSE_SUCCESS]: updatePlanogramWarehouseSuccess,
  [Types.UPDATE_PLANOGRAM_WAREHOUSE_FAILURE]: updatePlanogramWarehouseFailure,
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
  [Types.LIST_PLANOGRAM_WAREHOUSES_REQUEST]: listPlanogramWarehousesRequest,
  [Types.LIST_PLANOGRAM_WAREHOUSES_SUCCESS]: listPlanogramWarehousesSuccess,
  [Types.LIST_PLANOGRAM_WAREHOUSES_FAILURE]: listPlanogramWarehousesFailure,
  [Types.GET_PLANOGRAM_WAREHOUSE_DETAILS_REQUEST]: getPlanogramWarehouseDetailsRequest,
  [Types.GET_PLANOGRAM_WAREHOUSE_DETAILS_SUCCESS]: getPlanogramWarehouseDetailsSuccess,
  [Types.GET_PLANOGRAM_WAREHOUSE_DETAILS_FAILURE]: getPlanogramWarehouseDetailsFailure,
  [Types.LIST_PLANOGRAM_WAREHOUSES_INITIAL_REQUEST]: listPlanogramWarehousesInitialRequest,
  [Types.LIST_PLANOGRAM_WAREHOUSES_INITIAL_SUCCESS]: listPlanogramWarehousesInitialSuccess,
  [Types.LIST_PLANOGRAM_WAREHOUSES_INITIAL_FAILURE]: listPlanogramWarehousesInitialFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
