import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { weekDays } from '../utils/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,

    getBannedAreasRequest: {},
    getBannedAreasSuccess: { data: [] },
    getBannedAreasFailure: { error: null },

    createBannedAreaRequest: { reqBody: undefined },
    createBannedAreaSuccess: {},
    createBannedAreaFailure: { error: null },

    createMultiBannedAreaRequest: { features: null },
    createMultiBannedAreaSuccess: { data: {} },
    createMultiBannedAreaFailure: { error: null },

    deactivateBannedAreaRequest: { id: undefined, polygonType: undefined },
    deactivateBannedAreaSuccess: {},
    deactivateBannedAreaFailure: { error: null },

    getScheduledBannedAreasRequest: {},
    getScheduledBannedAreasSuccess: { data: [] },
    getScheduledBannedAreasFailure: { error: null },

    createScheduledBannedAreaRequest: { reqBody: undefined },
    createScheduledBannedAreaSuccess: {},
    createScheduledBannedAreaFailure: { error: null },

    deactivateScheduledBannedAreaRequest: { scheduledBannedAreaId: undefined },
    deactivateScheduledBannedAreaSuccess: {},
    deactivateScheduledBannedAreaFailure: { error: null },

    getG10PolygonsRequest: {},
    getG10PolygonsSuccess: { data: [] },
    getG10PolygonsFailure: { error: null },

    getGbPolygonsRequest: {},
    getGbPolygonsSuccess: { data: [] },
    getGbPolygonsFailure: { error: null },

    getGsPolygonsRequest: {},
    getGsPolygonsSuccess: { data: [] },
    getGsPolygonsFailure: { error: null },

    setScheduledBanFormValues: {
      scheduledBanFormValues: {
        cityId: undefined,
        vehicleTypes: undefined,
        domainTypes: undefined,
        polygonType: undefined,
        name: undefined,
        isActive: undefined,
        startTime: undefined,
        endTime: undefined,
        startDate: undefined,
        endDate: undefined,
        activeDays: weekDays,
      },
    },

    setIsScheduledBanFormShow: { isScheduledBanFormShow: undefined },

    setFilters: {
      filters: {
        isActive: undefined,
        domainType: undefined,
        polygonTypes: undefined,
      },
    },
    setFormValues: {
      formValues: {
        cityId: undefined,
        domainTypes: undefined,
        polygonType: undefined,
        name: undefined,
        vehicleTypes: undefined,
      },
    },
    setClearMapStatus: { clearMapStatus: false },
    setGeometry: { geometry: undefined },
    setFeatureCollection: { featureCollection: undefined },
    setTempGeoJson: { tempGeoJson: undefined },
    setMapOptions: {
      isShowG10Areas: null,
      isShowGBAreas: null,
      isShowGSAreas: null,
    },
    setMapCenter: { center: [] },
    setMapZoom: { zoom: null },
  },
  { prefix: `${REDUX_KEY.GIS.BANNED_AREAS}_` },
);
