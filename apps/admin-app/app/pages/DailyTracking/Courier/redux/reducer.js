import { createReducer } from 'reduxsauce';

import { DOMAIN_FILTER_TYPES } from '@shared/shared/constants';

import { Types } from './actions';
import { getSelectedCityFilterFromLocalStorage } from './localStorage';
import { getSelectedDomainType } from '@shared/redux/selectors/common';

const generateCustomInitialState = () => ({
  liveMapData: {
    data: [],
    isPending: false,
    error: null,
  },
  operationTimeSeriesData: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    cities: [],
    selectedCityFilter: getSelectedCityFilterFromLocalStorage(),
    selectedDomainType: getSelectedDomainType(),
    domainFilterType: DOMAIN_FILTER_TYPES.INCLUDES,
  },
  filteredResults: { data: [] },
});

export const INITIAL_STATE = generateCustomInitialState();

export const getLiveMapDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    liveMapData: {
      ...INITIAL_STATE.liveMapData,
      isPending: true,
    },
  };
};

export const getLiveMapDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    liveMapData: {
      ...INITIAL_STATE.liveMapData,
      data,
      isPending: false,
    },
  };
};

export const getLiveMapDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    liveMapData: {
      ...INITIAL_STATE.liveMapData,
      isPending: false,
      error,
    },
  };
};

export const getOperationTimeSeriesDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    operationTimeSeriesData: {
      ...INITIAL_STATE.operationTimeSeriesData,
      isPending: true,
    },
  };
};

export const getOperationTimeSeriesDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    operationTimeSeriesData: {
      ...INITIAL_STATE.operationTimeSeriesData,
      data,
      isPending: false,
    },
  };
};

export const getOperationTimeSeriesDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    operationTimeSeriesData: {
      ...INITIAL_STATE.operationTimeSeriesData,
      isPending: false,
      error,
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

export const setSelectedCityFilter = (state = INITIAL_STATE, { selectedCityFilter }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedCityFilter,
    },
  };
};

export const setSelectedDomainType = (state = INITIAL_STATE, { selectedDomainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDomainType,
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

export const initAndDestroyPage = () => {
  return generateCustomInitialState();
};

export const HANDLERS = {
  [Types.GET_LIVE_MAP_DATA_REQUEST]: getLiveMapDataRequest,
  [Types.GET_LIVE_MAP_DATA_SUCCESS]: getLiveMapDataSuccess,
  [Types.GET_LIVE_MAP_DATA_FAILURE]: getLiveMapDataFailure,
  [Types.GET_OPERATION_TIME_SERIES_DATA_REQUEST]: getOperationTimeSeriesDataRequest,
  [Types.GET_OPERATION_TIME_SERIES_DATA_SUCCESS]: getOperationTimeSeriesDataSuccess,
  [Types.GET_OPERATION_TIME_SERIES_DATA_FAILURE]: getOperationTimeSeriesDataFailure,
  [Types.SET_CITIES]: setCities,
  [Types.SET_SELECTED_CITY_FILTER]: setSelectedCityFilter,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_DOMAIN_FILTER_TYPE]: setDomainFilterType,
  [Types.DESTROY_PAGE]: initAndDestroyPage,
  [Types.INIT_PAGE]: initAndDestroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
