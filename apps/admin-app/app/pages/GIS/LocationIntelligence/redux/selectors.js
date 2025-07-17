import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.LOCATION_INTELLIGENCE;

export const locationIntelligenceSelector = {
  getMapOptions: state => state?.[reducerKey]?.mapOptions,
  getPolygonFilters: state => state?.[reducerKey]?.polygonFilters,
  getAvailableStatFilters: state => state?.[reducerKey]?.availableStatsFilters,
  getStatsLocationsFilters: state => state?.[reducerKey]?.statsLocationsFilters,
  getAvailableStatsData: state => state?.[reducerKey]?.availableStats?.data,
  getStatsData: state => state?.[reducerKey]?.statsLocations?.data,
  getPolygons: state => state?.[reducerKey]?.polygons?.data,
  isPendingAvailableStats: state => state?.[reducerKey]?.availableStats?.isPending,
  isPendingStats: state => state?.[reducerKey]?.statsLocations.isPending,
  isPendingPolygons: state => state?.[reducerKey]?.polygons?.isPending,
  getSelectedStyle: state => state?.[reducerKey]?.selectedStyle,
  getCustomStyleProps: state => state?.[reducerKey]?.customStyleProps,
};
