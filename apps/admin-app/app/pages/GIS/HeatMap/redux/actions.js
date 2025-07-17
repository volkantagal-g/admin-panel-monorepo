import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getPolygonsRequest: {},
  getPolygonsSuccess: { data: [] },
  getPolygonsFailure: { error: null },
  getAppOpenLocationsRequest: {},
  getAppOpenLocationsSuccess: { data: [] },
  getAppOpenLocationsFailure: { error: null },
  getMissedOrderLocationsRequest: {},
  getMissedOrderLocationsSuccess: { data: [] },
  getMissedOrderLocationsFailure: { error: null },
  getSuccessOrderLocationsRequest: {},
  getSuccessOrderLocationsSuccess: { data: [] },
  getSuccessOrderLocationsFailure: { error: null },
  getDownloadLocationsRequest: {},
  getDownloadLocationsSuccess: { data: [] },
  getDownloadLocationsFailure: { error: null },
  setHeatMapData: { data: [] },
  setIsPendingHeatMap: { isPending: true },
  setPolygonFilters: {
    filters: {
      city: undefined,
      domainType: undefined,
      polygonType: undefined,
      subregionIntervalType: undefined,
    },
  },
  setHeatMapFilters: {
    filters: {
      selectedCity: undefined,
      startDate: undefined,
      endDate: undefined,
      domainType: undefined,
      hours: undefined,
    },
  },
  setMapCenter: { center: [] },
  setMapOptions: { isShowWarehousesMarker: null },
}, { prefix: `${REDUX_KEY.GIS.HEATMAP}_` });
