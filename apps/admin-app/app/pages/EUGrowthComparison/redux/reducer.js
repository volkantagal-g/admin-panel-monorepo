import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  countries: {
    data: [],
    isPending: false,
    error: null,
  },
  xWeekStats: {
    data: {},
    isPending: false,
    error: null,
  },
  currentWeekStats: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getCountriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    countries: {
      ...state.countries,
      isPending: true,
    },
  };
};

export const getCountriesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    countries: {
      ...state.countries,
      isPending: false,
      data,
    },
  };
};

export const getCountriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    countries: {
      ...state.countries,
      isPending: false,
      error,
    },
  };
};

export const getXWeekStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    xWeekStats: {
      ...state.xWeekStats,
      isPending: true,
    },
  };
};

export const getXWeekStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    xWeekStats: {
      ...state.xWeekStats,
      isPending: false,
      data,
    },
  };
};

export const getXWeekStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    xWeekStats: {
      ...state.xWeekStats,
      isPending: false,
      error,
    },
  };
};

export const getStatsBetweenDatesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    currentWeekStats: {
      ...state.currentWeekStats,
      isPending: true,
    },
  };
};

export const getStatsBetweenDatesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    currentWeekStats: {
      ...state.currentWeekStats,
      isPending: false,
      data,
    },
  };
};

export const getStatsBetweenDatesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    currentWeekStats: {
      ...state.currentWeekStats,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COUNTRIES_REQUEST]: getCountriesRequest,
  [Types.GET_COUNTRIES_SUCCESS]: getCountriesSuccess,
  [Types.GET_COUNTRIES_FAILURE]: getCountriesFailure,
  [Types.GET_X_WEEK_STATS_REQUEST]: getXWeekStatsRequest,
  [Types.GET_X_WEEK_STATS_SUCCESS]: getXWeekStatsSuccess,
  [Types.GET_X_WEEK_STATS_FAILURE]: getXWeekStatsFailure,
  [Types.GET_STATS_BETWEEN_DATES_REQUEST]: getStatsBetweenDatesRequest,
  [Types.GET_STATS_BETWEEN_DATES_SUCCESS]: getStatsBetweenDatesSuccess,
  [Types.GET_STATS_BETWEEN_DATES_FAILURE]: getStatsBetweenDatesFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
