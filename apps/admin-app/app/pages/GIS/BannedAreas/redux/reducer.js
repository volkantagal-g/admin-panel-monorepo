import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { DEFAULT_MAP_OPTIONS, NONE_POYGON_TYPE } from '@shared/shared/constants';
import { BAN_POLYGON_TYPES, weekDays } from '@app/pages/GIS/BannedAreas/utils/constants';

export const INITIAL_STATE = {
  bannedAreas: {
    data: [],
    isPending: false,
    error: null,
  },
  createdBannedArea: {
    isPending: false,
    error: null,
  },
  createdMultipleBannedArea: {
    isPending: false,
    error: null,
  },
  deactivateBannedArea: {
    isPending: false,
    error: null,
  },
  scheduledBannedAreas: {
    data: [],
    isPending: false,
    error: null,
  },
  createdScheduledBannedArea: {
    isPending: false,
    error: null,
  },
  deactivateScheduledBannedArea: {
    isPending: false,
    error: null,
  },
  g10Polygons: {
    data: [],
    isPending: false,
    error: null,
  },
  gbPolygons: {
    data: [],
    isPending: false,
    error: null,
  },
  gsPolygons: {
    data: [],
    isPending: false,
    error: null,
  },
  geometry: null,
  featureCollection: null,
  tempGeoJson: null,
  formValues: {
    domainTypes: [],
    polygonType: NONE_POYGON_TYPE,
    name: null,
    vehicleTypes: [],
  },
  scheduledBanFormValues: {
    cityId: undefined,
    vehicleTypes: undefined,
    domainTypes: undefined,
    polygonType: undefined,
    name: undefined,
    isActive: true,
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
    activeDays: weekDays,
  },
  isScheduledBanFormShow: false,
  filters: { polygonTypes: BAN_POLYGON_TYPES },
  mapOptions: {
    isShowG10Areas: false,
    isShowGBAreas: false,
    isShowGSAreas: false,
    center: DEFAULT_MAP_OPTIONS.CENTER,
    zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL,
  },
  isUploadDrawerOpen: false,
};

export const setIsScheduledBanFormShow = (state = INITIAL_STATE, { isScheduledBanFormShow }) => {
  return {
    ...state,
    isScheduledBanFormShow,
  };
};

export const setTempGeoJson = (state = INITIAL_STATE, { tempGeoJson }) => {
  return {
    ...state,
    tempGeoJson,
  };
};

export const getBannedAreasRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    bannedAreas: {
      ...state.bannedAreas,
      isPending: true,
    },
  };
};

export const getBannedAreasSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    bannedAreas: {
      ...state.bannedAreas,
      data,
      isPending: false,
    },
  };
};

export const getBannedAreasFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bannedAreas: {
      ...state.bannedAreas,
      isPending: false,
      error,
    },
  };
};

export const createBannedAreaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdBannedArea: {
      ...state.createdBannedArea,
      isPending: true,
    },
  };
};

export const createBannedAreaSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdBannedArea: {
      ...state.createdBannedArea,
      isPending: false,
    },
  };
};

export const createBannedAreaFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createdBannedArea: {
      ...state.createdBannedArea,
      isPending: false,
      error,
    },
  };
};

export const createMultiBannedAreaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdMultipleBannedArea: {
      ...state.createdMultipleBannedArea,
      isPending: true,
    },
  };
};

export const createMultiBannedAreaSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createdMultipleBannedArea: {
      ...state.createdMultipleBannedArea,
      isPending: false,
      data,
    },
  };
};

export const createMultiBannedAreaFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createdMultipleBannedArea: {
      ...state.createdMultipleBannedArea,
      isPending: false,
      error,
    },
  };
};

export const deactivateBannedAreaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    bannedAreas: {
      ...state.bannedAreas,
      isPending: true,
    },
  };
};

export const deactivateBannedAreaSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    bannedAreas: {
      ...state.bannedAreas,
      isPending: false,
    },
  };
};

export const deactivateBannedAreaFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    bannedAreas: {
      ...state.bannedAreas,
      isPending: false,
      error,
    },
  };
};

export const getScheduledBannedAreasRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    scheduledBannedAreas: {
      ...state.scheduledBannedAreas,
      isPending: true,
    },
  };
};

export const getScheduledBannedAreasSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    scheduledBannedAreas: {
      ...state.scheduledBannedAreas,
      data,
      isPending: false,
    },
  };
};

export const getScheduledBannedAreasFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    scheduledBannedAreas: {
      ...state.scheduledBannedAreas,
      isPending: false,
      error,
    },
  };
};

export const createScheduledBannedAreaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdScheduledBannedArea: {
      ...state.createdScheduledBannedArea,
      isPending: true,
    },
  };
};

export const createScheduledBannedAreaSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createdScheduledBannedArea: {
      ...state.createdScheduledBannedArea,
      isPending: false,
    },
  };
};

export const createScheduledBannedAreaFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createdScheduledBannedArea: {
      ...state.createdScheduledBannedArea,
      isPending: false,
      error,
    },
  };
};

export const deactivateScheduledBannedAreaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deactivateScheduledBannedArea: {
      ...state.deactivateScheduledBannedArea,
      isPending: true,
    },
  };
};

export const deactivateScheduledBannedAreaSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    scheduledBannedAreas: {
      ...state.scheduledBannedAreas,
      isPending: false,
    },
  };
};

export const getG10PolygonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    g10Polygons: {
      ...state.g10Polygons,
      isPending: true,
    },
  };
};

export const getG10PolygonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    g10Polygons: {
      ...state.g10Polygons,
      data,
      isPending: false,
    },
  };
};

export const getG10PolygonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    g10Polygons: {
      ...state.g10Polygons,
      isPending: false,
      error,
    },
  };
};

export const getGbPolygonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    gbPolygons: {
      ...state.gbPolygons,
      isPending: true,
    },
  };
};

export const getGbPolygonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    gbPolygons: {
      ...state.gbPolygons,
      data,
      isPending: false,
    },
  };
};

export const getGbPolygonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    gbPolygons: {
      ...state.gbPolygons,
      isPending: false,
      error,
    },
  };
};

export const getGsPolygonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    gsPolygons: {
      ...state.gsPolygons,
      isPending: true,
    },
  };
};

export const getGsPolygonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    gsPolygons: {
      ...state.gsPolygons,
      data,
      isPending: false,
    },
  };
};

export const getGsPolygonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    gsPolygons: {
      ...state.gsPolygons,
      isPending: false,
      error,
    },
  };
};

export const setGeometry = (state = INITIAL_STATE, { geometry }) => {
  return {
    ...state,
    geometry: { ...geometry },
  };
};

export const setFeatureCollection = (state = INITIAL_STATE, { featureCollection }) => {
  return {
    ...state,
    featureCollection,
  };
};

export const setFormValues = (state = INITIAL_STATE, { formValues }) => {
  return {
    ...state,
    formValues: {
      ...state.formValues,
      ...formValues,
    },
  };
};
export const setScheduledBanFormValues = (state = INITIAL_STATE, { scheduledBanFormValues }) => {
  return {
    ...state,
    scheduledBanFormValues: {
      ...state.scheduledBanFormValues,
      ...scheduledBanFormValues,
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

export const setMapOptions = (state = INITIAL_STATE, { type, ...options }) => {
  return {
    ...state,
    mapOptions: {
      ...state.mapOptions,
      ...options,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_BANNED_AREAS_REQUEST]: getBannedAreasRequest,
  [Types.GET_BANNED_AREAS_SUCCESS]: getBannedAreasSuccess,
  [Types.GET_BANNED_AREAS_FAILURE]: getBannedAreasFailure,
  [Types.CREATE_BANNED_AREA_REQUEST]: createBannedAreaRequest,
  [Types.CREATE_BANNED_AREA_SUCCESS]: createBannedAreaSuccess,
  [Types.CREATE_BANNED_AREA_FAILURE]: createBannedAreaFailure,
  [Types.CREATE_MULTI_BANNED_AREA_REQUEST]: createMultiBannedAreaRequest,
  [Types.CREATE_MULTI_BANNED_AREA_SUCCESS]: createMultiBannedAreaSuccess,
  [Types.CREATE_MULTI_BANNED_AREA_FAILURE]: createMultiBannedAreaFailure,
  [Types.DEACTIVATE_BANNED_AREA_REQUEST]: deactivateBannedAreaRequest,
  [Types.DEACTIVATE_BANNED_AREA_SUCCESS]: deactivateBannedAreaSuccess,
  [Types.DEACTIVATE_BANNED_AREA_FAILURE]: deactivateBannedAreaFailure,
  [Types.GET_SCHEDULED_BANNED_AREAS_REQUEST]: getScheduledBannedAreasRequest,
  [Types.GET_SCHEDULED_BANNED_AREAS_SUCCESS]: getScheduledBannedAreasSuccess,
  [Types.GET_SCHEDULED_BANNED_AREAS_FAILURE]: getScheduledBannedAreasFailure,
  [Types.CREATE_SCHEDULED_BANNED_AREA_REQUEST]: createScheduledBannedAreaRequest,
  [Types.CREATE_SCHEDULED_BANNED_AREA_SUCCESS]: createScheduledBannedAreaSuccess,
  [Types.CREATE_SCHEDULED_BANNED_AREA_FAILURE]: createScheduledBannedAreaFailure,
  [Types.DEACTIVATE_SCHEDULED_BANNED_AREA_REQUEST]: deactivateScheduledBannedAreaRequest,
  [Types.DEACTIVATE_SCHEDULED_BANNED_AREA_SUCCESS]: deactivateScheduledBannedAreaSuccess,
  [Types.GET_G10_POLYGONS_REQUEST]: getG10PolygonsRequest,
  [Types.GET_G10_POLYGONS_SUCCESS]: getG10PolygonsSuccess,
  [Types.GET_G10_POLYGONS_FAILURE]: getG10PolygonsFailure,
  [Types.GET_GB_POLYGONS_REQUEST]: getGbPolygonsRequest,
  [Types.GET_GB_POLYGONS_SUCCESS]: getGbPolygonsSuccess,
  [Types.GET_GB_POLYGONS_FAILURE]: getGbPolygonsFailure,
  [Types.GET_GS_POLYGONS_REQUEST]: getGsPolygonsRequest,
  [Types.GET_GS_POLYGONS_SUCCESS]: getGsPolygonsSuccess,
  [Types.GET_GS_POLYGONS_FAILURE]: getGsPolygonsFailure,
  [Types.SET_GEOMETRY]: setGeometry,
  [Types.SET_FEATURE_COLLECTION]: setFeatureCollection,
  [Types.SET_FORM_VALUES]: setFormValues,
  [Types.SET_SCHEDULED_BAN_FORM_VALUES]: setScheduledBanFormValues,
  [Types.SET_IS_SCHEDULED_BAN_FORM_SHOW]: setIsScheduledBanFormShow,
  [Types.SET_FILTERS]: setFilters,
  [Types.SET_MAP_CENTER]: setMapCenter,
  [Types.SET_MAP_ZOOM]: setMapZoom,
  [Types.SET_MAP_OPTIONS]: setMapOptions,
  [Types.SET_TEMP_GEO_JSON]: setTempGeoJson,
};

export default createReducer(INITIAL_STATE, HANDLERS);
