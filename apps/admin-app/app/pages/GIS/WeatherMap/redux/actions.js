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
  setWeatherForecastFilters: {
    filters: {
      startDate: undefined,
      endDate: undefined,
    },
  },
  setWeatherControlFilters: {
    selectedDay: undefined,
    selectedField: undefined,
    selectedHour: undefined,
  },
  getPolygonsRequest: {},
  getPolygonsSuccess: { data: [] },
  getPolygonsFailure: { error: null },
  getWeatherForecastRequest: {},
  getWeatherForecastSuccess: { data: [] },
  getWeatherForecastFailure: { error: null },
}, { prefix: `${REDUX_KEY.GIS.WEATHER_MAP}_` });
