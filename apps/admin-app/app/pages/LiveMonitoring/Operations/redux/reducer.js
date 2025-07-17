import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  operationStatsDataForCities: {
    data: [],
    isPending: false,
    error: null,
  },
  operationStatsDataForSelectedCity: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    domainType: null,
    integrationType: null,
    mainColumnSearchText: null,
  },
};

export const getOperationStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    operationStatsDataForCities: {
      ...INITIAL_STATE.operationStatsDataForCities,
      isPending: true,
    },
  };
};

export const getOperationStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    operationStatsDataForCities: {
      ...INITIAL_STATE.operationStatsDataForCities,
      data,
      isPending: false,
    },
  };
};

export const getOperationStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    operationStatsDataForCities: {
      ...INITIAL_STATE.operationStatsDataForCities,
      isPending: false,
      error,
    },
  };
};

export const getLiveMapDataBySelectedCityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    operationStatsDataForSelectedCity: {
      ...INITIAL_STATE.operationStatsDataForSelectedCity,
      isPending: true,
    },
  };
};

export const getLiveMapDataBySelectedCitySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    operationStatsDataForSelectedCity: {
      ...INITIAL_STATE.operationStatsDataForSelectedCity,
      data,
      isPending: false,
    },
  };
};

export const getLiveMapDataBySelectedCityFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    operationStatsDataForSelectedCity: {
      ...INITIAL_STATE.operationStatsDataForSelectedCity,
      isPending: false,
      error,
    },
  };
};

const setFilters = (state, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  };
};

export const initOrDestroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_OPERATION_STATS_REQUEST]: getOperationStatsRequest,
  [Types.GET_OPERATION_STATS_SUCCESS]: getOperationStatsSuccess,
  [Types.GET_OPERATION_STATS_FAILURE]: getOperationStatsFailure,
  [Types.GET_LIVE_MAP_DATA_BY_SELECTED_CITY_REQUEST]: getLiveMapDataBySelectedCityRequest,
  [Types.GET_LIVE_MAP_DATA_BY_SELECTED_CITY_SUCCESS]: getLiveMapDataBySelectedCitySuccess,
  [Types.GET_LIVE_MAP_DATA_BY_SELECTED_CITY_FAILURE]: getLiveMapDataBySelectedCityFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.INIT_PAGE]: initOrDestroy,
  [Types.DESTROY_PAGE]: initOrDestroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
