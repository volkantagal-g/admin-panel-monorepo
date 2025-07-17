import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getPolygonsRequest: {},
  getPolygonsSuccess: { data: [] },
  getPolygonsFailure: { error: null },
  updatePolygonsRequest: { polygonType: null, updateData: {} },
  updatePolygonsSuccess: { data: [] },
  updatePolygonsFailure: { error: null },
  getGorillasWhsRequest: { body: null },
  getGorillasWhsSuccess: { data: [] },
  getGorillasWhsFailure: { error: null },
  getSlottedDeliveryConfigRequest: { body: null },
  getSlottedDeliveryConfigSuccess: { data: [] },
  getSlottedDeliveryConfigFailure: { error: null },
  setFilters: {
    filters: {
      city: undefined,
      isActive: undefined,
      domainType: undefined,
      polygonType: undefined,
      subregionIntervalType: undefined,
      vehicleTypes: undefined,
    },
  },
  setMapOptions: { isShowWarehousesMarker: null },
  setMapCenter: { center: [] },
  setMapZoom: { zoom: null },
}, { prefix: `${REDUX_KEY.POLYGON.MAP}_` });
