import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from 'antd';

import { keys, reverse } from 'lodash';

import { Creators } from '../../redux/actions';
import PolygonFilter from '../PolygonFilter';
import useStyles from './styles';

import { getCitiesSelector } from '@shared/redux/selectors/common';
import WeatherController from '../WeatherController';
import { weatherMapSelector } from '../../redux/selectors';
import { DEFAULT_MAP_OPTIONS } from '../../utils/constants';

const MapSideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getData);
  const weatherFilters = useSelector(weatherMapSelector.getWeatherForecastFilters);
  const weatherControlFilters = useSelector(weatherMapSelector.getWeatherControlfilters);
  const weatherForecastData = useSelector(weatherMapSelector.getWeatherForecasts);

  const handleFiltersChange = useCallback((filters = {}) => {
    return dispatch(Creators.setPolygonFilters({ filters }));
  }, [dispatch]);

  const handleMapOptionsChange = ({ isShowWarehousesMarker }) => {
    dispatch(Creators.setMapOptions({ isShowWarehousesMarker }));
  };

  const handleWeatherFiltersChange = useCallback((filters = {}) => {
    return dispatch(Creators.setWeatherForecastFilters({ filters }));
  }, [dispatch]);

  const handleWeatherForecastRequest = useCallback(() => {
    dispatch(Creators.getWeatherForecastRequest());
  }, [dispatch]);

  const handleWeatherControlFilterChange = useCallback((filters = {}) => {
    return dispatch(Creators.setWeatherControlFilters(filters));
  }, [dispatch]);

  const handleCityChange = useCallback(({ selectedCity }) => {
    const center = reverse([...selectedCity.center.coordinates]);
    dispatch(Creators.setMapZoom({ zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL }));
    return dispatch(Creators.setMapCenter({ center }));
  }, [dispatch]);

  useEffect(() => {
    const defaultWeatherControlFilters = {
      selectedField: 'temperature',
      selectedHour: 12,
      selectedDay: weatherFilters.startDate,
    };
    return handleWeatherControlFilterChange(defaultWeatherControlFilters);
  }, [handleWeatherControlFilterChange, weatherFilters.startDate]);
  return (
    <div className={classes.sideBar}>
      <Card size="small">
        <PolygonFilter
          cities={[...cities]}
          getPolygons={handleWeatherForecastRequest}
          onCityChange={handleCityChange}
          onPolygonFiltersChange={handleFiltersChange}
          onWeatherFiltersChange={handleWeatherFiltersChange}
          isFormDisabled={false}
          handleMapOptionsChange={handleMapOptionsChange}
        />
      </Card>
      {weatherForecastData.forecasts && (
      <Card size="small">
        <WeatherController
          setFilters={handleWeatherControlFilterChange}
          filters={weatherControlFilters}
          weatherFields={keys(weatherForecastData.forecasts?.[0])}
        />
      </Card>
      )}
    </div>
  );
};

export default MapSideBar;
