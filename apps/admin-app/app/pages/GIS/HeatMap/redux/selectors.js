import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.HEATMAP;

export const heatMapSelector = {
  getPolygonData: state => state?.[reducerKey]?.polygons?.data,
  getMapOptions: state => state?.[reducerKey]?.mapOptions,
  getPolygonFilters: state => state?.[reducerKey]?.polygonFilters,
  getHeatMapFilters: state => state?.[reducerKey]?.heatMapFilters,
  getHeatMapData: state => state?.[reducerKey]?.heatMapData?.data,
  getIsPendingHeatMap: state => state?.[reducerKey]?.isPendingHeatMap.isPending,
};
