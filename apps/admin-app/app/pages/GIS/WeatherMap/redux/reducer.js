import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  mapOptions: {
    isShowWarehousesMarker: false,
    isShowSubregionPolygons: false,
    isShowCustomStyledPolygons: false,
    center: undefined,
    zoom: undefined,
  },
  weatherForecast: {
    data: [],
    isPending: false,
    error: null,
  },
  weatherForecastFilters: {
    startDate: undefined,
    endDate: undefined,
  },
  weatherControlFilters: {
    selectedDay: undefined,
    selectedField: undefined,
    selectedHour: undefined,
  },
  polygonFilters: {
    city: undefined,
    domainType: undefined,
    polygonType: undefined,
    subregionIntervalType: undefined,
  },
  polygons: {
    data: [],
    isPending: false,
    error: null,
  },
};
export const setMapOptions = (state = INITIAL_STATE, { type, ...options }) => {
  return {
    ...state,
    mapOptions: {
      ...state.mapOptions,
      ...options,
    },
  };
};
export const setMapCenter = (state = INITIAL_STATE, { center }) => {
  return {
    ...state,
    mapOptions: {
      ...state.mapOptions,
      center,
    },
  };
};

export const setMapZoom = (state = INITIAL_STATE, { zoom }) => {
  return {
    ...state,
    mapOptions: {
      ...state.mapOptions,
      zoom,
    },
  };
};

export const getPolygonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      isPending: true,
    },
  };
};
export const getPolygonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      data,
      isPending: false,
    },
  };
};
export const getPolygonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      isPending: false,
      error,
    },
  };
};
export const setPolygonFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    polygonFilters: {
      ...state.polygonFilters,
      ...filters,
    },
  };
};
export const getWeatherForecastRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    weatherForecast: {
      ...state.weatherForecast,
      isPending: true,
    },
  };
};

export const getWeatherForecastSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    weatherForecast: {
      ...state.weatherForecast,
      data,
      isPending: false,
    },
  };
};

export const getWeatherForecastFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    weatherForecast: {
      ...state.weatherForecast,
      isPending: false,
      error,
    },
  };
};
export const setWeatherForecastFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    weatherForecastFilters: {
      ...state.weatherForecastFilters,
      ...filters,
    },
  };
};

export const setWeatherControlFilters = (state = INITIAL_STATE, { type, ...filters }) => {
  return {
    ...state,
    weatherControlFilters: {
      ...state.weatherControlFilters,
      ...filters,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_POLYGONS_REQUEST]: getPolygonsRequest,
  [Types.GET_POLYGONS_SUCCESS]: getPolygonsSuccess,
  [Types.GET_POLYGONS_FAILURE]: getPolygonsFailure,
  [Types.SET_POLYGON_FILTERS]: setPolygonFilters,
  [Types.SET_WEATHER_CONTROL_FILTERS]: setWeatherControlFilters,
  [Types.SET_MAP_OPTIONS]: setMapOptions,
  [Types.SET_MAP_CENTER]: setMapCenter,
  [Types.SET_MAP_ZOOM]: setMapZoom,
  [Types.GET_WEATHER_FORECAST_REQUEST]: getWeatherForecastRequest,
  [Types.GET_WEATHER_FORECAST_SUCCESS]: getWeatherForecastSuccess,
  [Types.GET_WEATHER_FORECAST_FAILURE]: getWeatherForecastFailure,
  [Types.SET_WEATHER_FORECAST_FILTERS]: setWeatherForecastFilters,
};

export default createReducer(INITIAL_STATE, HANDLERS);
