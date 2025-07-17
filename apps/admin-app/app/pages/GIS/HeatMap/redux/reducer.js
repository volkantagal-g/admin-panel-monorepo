import { createReducer } from 'reduxsauce';

import {
  GETIR_DOMAIN_TYPES,
  DEFAULT_MAP_OPTIONS,
  NONE_POYGON_TYPE,
  DAYTIME_INTERVAL_TYPE,
} from '@shared/shared/constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  polygons: {
    data: [],
    isPending: false,
    error: null,
  },
  appOpen: {
    data: [],
    isPending: false,
    error: null,
  },
  missedOrders: {
    data: [],
    isPending: false,
    error: null,
  },
  successOrders: {
    data: [],
    isPending: false,
    error: null,
  },
  downloadLocations: {
    data: [],
    isPending: false,
    error: null,
  },
  polygonFilters: {
    city: undefined,
    domainTypes: GETIR_DOMAIN_TYPES.GETIR10,
    polygonTypes: NONE_POYGON_TYPE,
    subregionIntervalType: DAYTIME_INTERVAL_TYPE,
  },
  heatMapFilters: {
    selectedCity: undefined,
    startDate: undefined,
    endDate: undefined,
    domainTypes: GETIR_DOMAIN_TYPES.GETIR10,
    hours: [],
  },
  mapOptions: {
    isShowWarehousesMarker: false,
    center: DEFAULT_MAP_OPTIONS.CENTER,
    zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL,
  },
  heatMapData: { data: [] },
  isPendingHeatMap: { isPending: true },
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

export const getAppOpenLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    appOpen: {
      ...state.appOpen,
      isPending: true,
    },
  };
};

export const getAppOpenLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    appOpen: {
      ...state.appOpen,
      data,
      isPending: false,
    },
  };
};

export const getAppOpenLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    appOpen: {
      ...state.appOpen,
      isPending: false,
      error,
    },
  };
};

export const getMissedOrderLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    missedOrders: {
      ...state.missedOrders,
      isPending: true,
    },
  };
};

export const getMissedOrderLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    missedOrders: {
      ...state.missedOrders,
      data,
      isPending: false,
    },
  };
};

export const getMissedOrderLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    missedOrders: {
      ...state.missedOrders,
      isPending: false,
      error,
    },
  };
};

export const getSuccessOrderLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    successOrders: {
      ...state.successOrders,
      isPending: true,
    },
  };
};

export const getSuccessOrderLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    successOrders: {
      ...state.successOrders,
      data,
      isPending: false,
    },
  };
};

export const getSuccessOrderLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    successOrders: {
      ...state.successOrders,
      isPending: false,
      error,
    },
  };
};

export const getDownloadLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    downloadLocations: {
      ...state.downloadLocations,
      isPending: true,
    },
  };
};

export const getDownloadLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    downloadLocations: {
      ...state.downloadLocations,
      data,
      isPending: false,
    },
  };
};

export const getDownloadLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    downloadLocations: {
      ...state.downloadLocations,
      isPending: false,
      error,
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

export const setPolygonFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    polygonFilters: {
      ...state.polygonFilters,
      ...filters,
    },
  };
};

export const setHeatMapFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    heatMapFilters: {
      ...state.heatMapFilters,
      ...filters,
    },
  };
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

export const setHeatMapData = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    heatMapData: {
      ...state.heatMapData,
      data,
    },
    isPendingHeatMap: { isPending: false },
  };
};

export const setIsPendingHeatMap = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPendingHeatMap: { isPending: true },
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
  [Types.GET_APP_OPEN_LOCATIONS_REQUEST]: getAppOpenLocationsRequest,
  [Types.GET_APP_OPEN_LOCATIONS_SUCCESS]: getAppOpenLocationsSuccess,
  [Types.GET_APP_OPEN_LOCATIONS_FAILURE]: getAppOpenLocationsFailure,
  [Types.GET_MISSED_ORDER_LOCATIONS_REQUEST]: getMissedOrderLocationsRequest,
  [Types.GET_MISSED_ORDER_LOCATIONS_SUCCESS]: getMissedOrderLocationsSuccess,
  [Types.GET_MISSED_ORDER_LOCATIONS_FAILURE]: getMissedOrderLocationsFailure,
  [Types.GET_SUCCESS_ORDER_LOCATIONS_REQUEST]: getSuccessOrderLocationsRequest,
  [Types.GET_SUCCESS_ORDER_LOCATIONS_SUCCESS]: getSuccessOrderLocationsSuccess,
  [Types.GET_SUCCESS_ORDER_LOCATIONS_FAILURE]: getSuccessOrderLocationsFailure,
  [Types.GET_DOWNLOAD_LOCATIONS_REQUEST]: getDownloadLocationsRequest,
  [Types.GET_DOWNLOAD_LOCATIONS_SUCCESS]: getDownloadLocationsSuccess,
  [Types.GET_DOWNLOAD_LOCATIONS_FAILURE]: getDownloadLocationsFailure,
  [Types.SET_POLYGON_FILTERS]: setPolygonFilters,
  [Types.SET_HEAT_MAP_FILTERS]: setHeatMapFilters,
  [Types.SET_MAP_OPTIONS]: setMapOptions,
  [Types.SET_MAP_CENTER]: setMapCenter,
  [Types.SET_HEAT_MAP_DATA]: setHeatMapData,
  [Types.SET_IS_PENDING_HEAT_MAP]: setIsPendingHeatMap,
};

export default createReducer(INITIAL_STATE, HANDLERS);
