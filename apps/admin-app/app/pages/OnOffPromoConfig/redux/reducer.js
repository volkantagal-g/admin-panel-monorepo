import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  cityFilter: {
    selectedCities: null,
    selectedCountries: null,
    cityList: [],
  },
  warehouseFilter: {
    selectedWarehouses: null,
    warehouseList: [],
    warehouseListTemp: [],
  },
  configFilter: { selectedConfig: null },
  result: { resultData: [] },
  changedConfig: {},
};

export const setSelectedCityFilter = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cityFilter: {
      ...state.cityFilter,
      selectedCities: data.cities,
      selectedCountries: data.countries,
    },
    warehouseFilter: {
      ...state.warehouseFilter,
      warehouseList:
        data.warehouses.length > 0
          ? data.warehouses
          : state.warehouseFilter.warehouseListTemp,
    },
  };
};

export const setSelectedWarehouse = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouseFilter: {
      ...state.warehouseFilter,
      selectedWarehouses: data,
    },
  };
};

export const setSelectedConfig = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    configFilter: {
      ...state.configFilter,
      selectedConfig: data,
    },
  };
};

export const setConfigFilteredCityList = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cityFilter: {
      ...state.cityFilter,
      cityList: data,
    },
  };
};

export const setChangedConfig = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    changedConfig: {
      data,
      isPending: true,
    },
  };
};

export const getChangedConfigSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    changedConfig: {
      isPending: false,
      isSuccess: true,
    },
  };
};

export const getChangedConfigFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    changedConfig: {
      isPending: false,
      isSuccess: false,
    },
  };
};

export const getOnOffResultRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    result: {
      ...state.result,
      resultData: [...INITIAL_STATE.result.resultData],
    },
    cityFilter: { ...INITIAL_STATE.cityFilter },
    warehouseFilter: { ...INITIAL_STATE.warehouseFilter },
    warehouseListTemp: { ...INITIAL_STATE.warehouseFilter },
    isPending: true,
  };
};

export const getOnOffResultSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    result: {
      ...state.result,
      resultData: data.result,
    },
    cityFilter: {
      ...state.cityFilter,
      cityList: data.city_list,
    },
    warehouseFilter: {
      ...state.warehouseFilter,
      warehouseList: data.warehouse_list,
      warehouseListTemp: data.warehouse_list,
    },
    isPending: false,
  };
};

export const getOnOffResultFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    result: {
      ...state.result,
      resultData: [...INITIAL_STATE.result.resultData],
      error,
    },
    cityFilter: {
      ...state.cityFilter,
      cityList: { ...INITIAL_STATE.cityFilter.cityList },
      error,
    },
    warehouseFilter: {
      ...state.warehouseFilter,
      warehouseList: { ...INITIAL_STATE.warehouseFilter.warehouseList },
      warehouseListTemp: { ...INITIAL_STATE.warehouseFilter.warehouseList },
      error,
    },
    isPending: false,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_SELECTED_CITY_FILTER]: setSelectedCityFilter,
  [Types.SET_SELECTED_WAREHOUSE]: setSelectedWarehouse,
  [Types.SET_CHANGED_CONFIG]: setChangedConfig,
  [Types.GET_CHANGED_CONFIG_SUCCESS]: getChangedConfigSuccess,
  [Types.GET_CHANGED_CONFIG_FAILURE]: getChangedConfigFailure,
  [Types.GET_ON_OFF_RESULT_REQUEST]: getOnOffResultRequest,
  [Types.GET_ON_OFF_RESULT_SUCCESS]: getOnOffResultSuccess,
  [Types.GET_ON_OFF_RESULT_FAILURE]: getOnOffResultFailure,
  [Types.SET_SELECTED_CONFIG]: setSelectedConfig,
  [Types.SET_CONFIG_FILTERED_CITY_LIST]: setConfigFilteredCityList,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
