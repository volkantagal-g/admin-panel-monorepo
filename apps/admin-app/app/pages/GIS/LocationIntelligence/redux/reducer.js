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
  statsLocations: {
    data: [],
    isPending: false,
    error: null,
  },
  availableStats: {
    data: [],
    isPending: false,
    error: null,
  },
  availableStatsFilters: { geoBoundaryType: undefined },
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
  statsLocationsFilters: {
    polygonIds: [],
    statTypes: [],
    dateStart: undefined,
    dateEnd: undefined,
    isGeoJson: true,
  },
  selectedStyle: undefined,
  customStyleProps: {
    colorRange: undefined,
    classificationType: undefined,
    paletteType: undefined,
    statType: undefined,
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
export const setAvailableStatsFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    availableStatsFilters: {
      ...state.availableStatsFilters,
      ...filters,
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

export const setStatsLocationsFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    statsLocationsFilters: {
      ...state.statsLocationsFilters,
      ...filters,
    },
  };
};

export const getAvailableStatsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    availableStats: {
      ...state.availableStats,
      isPending: true,
    },
  };
};

export const getAvailableStatsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    availableStats: {
      ...state.availableStats,
      isPending: false,
      data,
    },
  };
};

export const getAvailableStatsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    availableStats: {
      ...state.availableStats,
      isPending: false,
      error,
    },
  };
};

export const getStatsLocationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    statsLocations: {
      ...state.statsLocations,
      isPending: true,
    },
  };
};

export const getStatsLocationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    statsLocations: {
      ...state.availableStats,
      isPending: false,
      data,
    },
  };
};

export const getStatsLocationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    statsLocations: {
      ...state.statsLocations,
      isPending: false,
      error,
    },
  };
};

export const setSelectedStyle = (state = INITIAL_STATE, { style }) => {
  return {
    ...state,
    selectedStyle: {
      ...state.selectedStyle,
      style,
    },
  };
};

export const setCustomStyleProps = (state = INITIAL_STATE, { customStyleProps }) => {
  return {
    ...state,
    customStyleProps: {
      ...state.customStyleProps,
      ...customStyleProps,
    },
  };
};

export const resetPolygons = (state = INITIAL_STATE) => {
  return {
    ...state,
    statsLocations: { ...INITIAL_STATE.statsLocations },
    polygons: { ...INITIAL_STATE.polygons },
    selectedStyle: { ...INITIAL_STATE.selectedStyle },
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
  [Types.SET_MAP_OPTIONS]: setMapOptions,
  [Types.SET_MAP_CENTER]: setMapCenter,
  [Types.SET_MAP_ZOOM]: setMapZoom,
  [Types.GET_AVAILABLE_STATS_REQUEST]: getAvailableStatsRequest,
  [Types.GET_AVAILABLE_STATS_SUCCESS]: getAvailableStatsSuccess,
  [Types.GET_AVAILABLE_STATS_FAILURE]: getAvailableStatsFailure,
  [Types.GET_STATS_LOCATIONS_REQUEST]: getStatsLocationsRequest,
  [Types.GET_STATS_LOCATIONS_SUCCESS]: getStatsLocationsSuccess,
  [Types.GET_STATS_LOCATIONS_FAILURE]: getStatsLocationsFailure,
  [Types.SET_POLYGON_FILTERS]: setPolygonFilters,
  [Types.SET_AVAILABLE_STATS_FILTERS]: setAvailableStatsFilters,
  [Types.SET_STATS_LOCATIONS_FILTERS]: setStatsLocationsFilters,
  [Types.SET_SELECTED_STYLE]: setSelectedStyle,
  [Types.SET_CUSTOM_STYLE_PROPS]: setCustomStyleProps,
  [Types.RESET_POLYGONS]: resetPolygons,
};

export default createReducer(INITIAL_STATE, HANDLERS);
