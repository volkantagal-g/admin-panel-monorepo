import { createReducer } from 'reduxsauce';

import { WAREHOUSE_TYPES, DOMAIN_FILTER_TYPES, GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';

import { Types } from './actions';

const getirDomainCodes = GETIR_MARKET_DOMAIN_TYPES.map(code => {
  return code.toString();
});

const getirWarehouseTypes = WAREHOUSE_TYPES.map(warehouseType => {
  return warehouseType.toString();
});

export const INITIAL_STATE = {
  response: {
    data: [],
    isPending: false,
    error: null,
  },
  dtsCategories: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    cities: [],
    domainTypes: [...getirDomainCodes],
    domainFilterType: DOMAIN_FILTER_TYPES.INCLUDES,
    warehouseTypes: [...getirWarehouseTypes],
    searchValue: "",
  },
  filteredResults: { data: [] },
  warehouses: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: true,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      data: data.data,
      isPending: false,
    },
  };
};

export const getResultsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
      error,
    },
  };
};

export const getPointsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: true,
    },
  };
};

export const getPointsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      data: data.data,
      isPending: false,
    },
  };
};

export const getPointsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
      error,
    },
  };
};

export const getDtsCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dtsCategories: {
      ...INITIAL_STATE.dtsCategories,
      isPending: true,
    },
  };
};

export const getDtsCategoriesSuccess = (state = INITIAL_STATE, { data }) => {
  let { dtsRuleCategories } = data;
  dtsRuleCategories = dtsRuleCategories.filter(dataItem => {
    return dataItem.isActive === true;
  });
  return {
    ...state,
    dtsCategories: {
      ...INITIAL_STATE.dtsCategories,
      data: dtsRuleCategories,
      isPending: false,
    },
  };
};

export const getDtsCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    dtsCategories: {
      ...INITIAL_STATE.dtsCategories,
      isPending: false,
      error,
    },
  };
};

export const setFilteredResults = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    filteredResults: {
      ...state.filteredResults,
      data,
    },
  };
};

export const setCountries = (state = INITIAL_STATE, { countries }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      countries,
    },
  };
};

export const setCities = (state = INITIAL_STATE, { cities }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      cities,
    },
  };
};

export const setDomainTypes = (state = INITIAL_STATE, { domainTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainTypes,
    },
  };
};

export const setDomainFilterType = (state = INITIAL_STATE, { domainFilterType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainFilterType,
    },
  };
};

export const setWarehouseTypes = (state = INITIAL_STATE, { warehouseTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouseTypes,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,
  [Types.GET_POINTS_REQUEST]: getPointsRequest,
  [Types.GET_POINTS_SUCCESS]: getPointsSuccess,
  [Types.GET_POINTS_FAILURE]: getPointsFailure,
  [Types.GET_DTS_CATEGORIES_REQUEST]: getDtsCategoriesRequest,
  [Types.GET_DTS_CATEGORIES_SUCCESS]: getDtsCategoriesSuccess,
  [Types.GET_DTS_CATEGORIES_FAILURE]: getDtsCategoriesFailure,
  [Types.SET_FILTERED_RESULTS]: setFilteredResults,
  [Types.SET_CITIES]: setCities,
  [Types.SET_DOMAIN_TYPES]: setDomainTypes,
  [Types.SET_DOMAIN_FILTER_TYPE]: setDomainFilterType,
  [Types.SET_WAREHOUSE_TYPES]: setWarehouseTypes,
  [Types.SET_SEARCH_VALUE]: setSearchValue,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
