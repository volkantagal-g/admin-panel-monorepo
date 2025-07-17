import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  setMapOptions: {
    isShowWarehousesMarker: null,
    isShowSubregionPolygons: null,
    isShowCustomStyledPolygons: null,
  },
  setMapCenter: { center: [] },
  setMapZoom: { zoom: undefined },
  setPolygonFilters: {
    filters: {
      city: undefined,
      domainType: undefined,
      polygonType: undefined,
      subregionIntervalType: undefined,
    },
  },
  setAvailableStatsFilters: { filters: { geoBoundaryType: undefined } },
  setStatsLocationsFilters: {
    filters: {
      polygonIds: [],
      statTypes: [],
      dateStart: undefined,
      dateEnd: undefined,
      isGeoJson: undefined,
    },
  },
  setSelectedStyle: { style: {} },
  setCustomStyleProps: {
    customStyleProps: {
      colorRange: undefined,
      classificationType: undefined,
      paletteType: undefined,
      statType: undefined,
    },
  },
  getPolygonsRequest: {},
  getPolygonsSuccess: { data: [] },
  getPolygonsFailure: { error: null },
  getAvailableStatsRequest: {},
  getAvailableStatsSuccess: { data: null },
  getAvailableStatsFailure: { error: null },
  getStatsLocationsRequest: {},
  getStatsLocationsSuccess: { data: [] },
  getStatsLocationsFailure: { error: null },
  resetPolygons: {},
}, { prefix: `${REDUX_KEY.GIS.LOCATION_INTELLIGENCE}_` });
