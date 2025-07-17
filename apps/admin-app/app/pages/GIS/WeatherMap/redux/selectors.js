import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.WEATHER_MAP;

export const weatherMapSelector = {
  getMapOptions: state => state?.[reducerKey]?.mapOptions,
  getPolygonFilters: state => state?.[reducerKey]?.polygonFilters,
  getPolygons: state => state?.[reducerKey]?.polygons?.data,
  getWeatherForecastFilters: state => state?.[reducerKey]?.weatherForecastFilters,
  getWeatherForecasts: state => state?.[reducerKey]?.weatherForecast?.data,
  getWeatherControlfilters: state => state?.[reducerKey]?.weatherControlFilters,
  isPendingPolygons: state => state?.[reducerKey]?.polygons?.isPending,
};
