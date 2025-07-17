import { createReducer } from 'reduxsauce';

import {
  GETIR_DOMAIN_TYPES,
  DEFAULT_MAP_OPTIONS,
  NONE_POYGON_TYPE,
  DAYTIME_INTERVAL_TYPE,
} from '@shared/shared/constants';
import { Types } from './actions';
import { vehicleTypes } from '../utils';

export const INITIAL_STATE = {
  polygons: {
    data: [],
    isPending: false,
    error: null,
  },
  gorillasWarehouses: {
    data: [],
    isPending: false,
    error: null,
  },
  deliveryFeeConfig: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    city: undefined,
    isActive: true,
    domainType: GETIR_DOMAIN_TYPES.GETIR10,
    polygonType: NONE_POYGON_TYPE,
    subregionIntervalType: DAYTIME_INTERVAL_TYPE,
    vehicleTypes: [...vehicleTypes],
  },
  mapOptions: {
    isShowWarehousesMarker: false,
    center: DEFAULT_MAP_OPTIONS.CENTER,
    zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL,
  },
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

export const updatePolygonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      isPending: true,
    },
  };
};

export const updatePolygonsSuccess = (state = INITIAL_STATE) => {
/* TODO
After gpolygons POST method implementation
=> this reducer should set update response to polygons state
=> Remove getPolygonsRequest at the end of the update request in saga side.
*/
  return {
    ...state,
    polygons: {
      ...state.polygons,
      isPending: false,
      // data,
    },
  };
};

export const updatePolygonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      isPending: false,
      error,
    },
  };
};

export const getGorillasWhsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    gorillasWarehouses: {
      ...state.gorillasWarehouses,
      isPending: true,
    },
  };
};
export const getGorillasWhsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    gorillasWarehouses: {
      ...state.gorillasWarehouses,
      data,
      isPending: false,
    },
  };
};

export const getGorillasWhsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    gorillasWarehouses: {
      ...state.gorillasWarehouses,
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

export const setMapZoom = (state = INITIAL_STATE, { zoom }) => {
  return {
    ...state,
    mapOptions: {
      ...state.mapOptions,
      zoom,
    },
  };
};

export const setFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
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

export const getSlottedDeliveryConfigRequest = state => {
  return {
    ...state,
    deliveryFeeConfig: {
      ...state.deliveryFeeConfig,
      isPending: true,
    },
  };
};

export const getSlottedDeliveryConfigSuccess = (state, { data }) => {
  return {
    ...state,
    deliveryFeeConfig: {
      ...state.deliveryFeeConfig,
      data,
      isPending: false,
    },
  };
};

export const getSlottedDeliveryConfigFailure = (state, { error }) => {
  return {
    ...state,
    deliveryFeeConfig: {
      ...state.deliveryFeeConfig,
      isPending: false,
      error,
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
  [Types.UPDATE_POLYGONS_REQUEST]: updatePolygonsRequest,
  [Types.UPDATE_POLYGONS_SUCCESS]: updatePolygonsSuccess,
  [Types.UPDATE_POLYGONS_FAILURE]: updatePolygonsFailure,
  [Types.GET_GORILLAS_WHS_REQUEST]: getGorillasWhsRequest,
  [Types.GET_GORILLAS_WHS_SUCCESS]: getGorillasWhsSuccess,
  [Types.GET_GORILLAS_WHS_FAILURE]: getGorillasWhsFailure,
  [Types.GET_SLOTTED_DELIVERY_CONFIG_REQUEST]: getSlottedDeliveryConfigRequest,
  [Types.GET_SLOTTED_DELIVERY_CONFIG_SUCCESS]: getSlottedDeliveryConfigSuccess,
  [Types.GET_SLOTTED_DELIVERY_CONFIG_FAILURE]: getSlottedDeliveryConfigFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.SET_MAP_OPTIONS]: setMapOptions,
  [Types.SET_MAP_CENTER]: setMapCenter,
  [Types.SET_MAP_ZOOM]: setMapZoom,
};

export default createReducer(INITIAL_STATE, HANDLERS);
