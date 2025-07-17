import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo, useRef } from 'react';

import { HexagonLayerWrapper, WarehouseLayerWrapper } from './components/index';

import { Maps, PolygonLayer } from '@shared/containers/GIS/Maps';

import { weatherMapSelector } from '../../redux/selectors';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { getPolygonsGeojson, getFilteredWarehouses } from '../../utils/helper';
import { Creators } from '../../redux/actions';

const MapWrapper = () => {
  const polygons = useSelector(weatherMapSelector.getPolygons);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const polygonFilters = useSelector(weatherMapSelector.getPolygonFilters);
  const mapOptions = useSelector(weatherMapSelector.getMapOptions);
  const weatherForecastData = useSelector(weatherMapSelector.getWeatherForecasts);
  const hexagonFilters = useSelector(weatherMapSelector.getWeatherControlfilters);
  const mapRef = useRef();
  const dispatch = useDispatch();

  const memoizedWarehouseMarkers = useMemo(
    () => {
      if (mapOptions.isShowWarehousesMarker && polygonFilters.city) {
        const filteredWarehouses = getFilteredWarehouses({ warehouses, polygonFilters });
        return (
          <WarehouseLayerWrapper
            warehouses={filteredWarehouses}
          />
        );
      }
      return undefined;
    },
    [mapOptions, polygonFilters, warehouses],
  );

  const renderLivePolygons = useMemo(() => {
    if (polygons) {
      const polygonsGeoJson = getPolygonsGeojson(polygons);
      return (
        <PolygonLayer
          geojson={polygonsGeoJson}
          isStroked
        />
      );
    }
    return null;
  }, [polygons]);

  const renderHexagonLayers = useMemo(() => {
    if (weatherForecastData) {
      return (
        <HexagonLayerWrapper
          weatherForecastData={weatherForecastData}
          filters={hexagonFilters}
          zoomLevel={mapOptions.zoom}
        />
      );
    }
    return null;
  }, [hexagonFilters, mapOptions.zoom, weatherForecastData]);

  const handleMapEvent = useCallback(event => {
    const { latitude, longitude, zoom } = event.viewState;
    const currentCenter = [latitude, longitude];
    const currentZoom = (zoom);
    dispatch(Creators.setMapCenter({ center: currentCenter }));
    dispatch(Creators.setMapZoom({ zoom: currentZoom }));
  }, [dispatch]);

  return (
    <Maps
      id="map"
      ref={mapRef}
      latitude={mapOptions.center[0]}
      longitude={mapOptions.center[1]}
      zoom={mapOptions.zoom}
      onMapEvents={handleMapEvent}
    >
      {memoizedWarehouseMarkers}
      {renderLivePolygons}
      {renderHexagonLayers}
    </Maps>
  );
};

export default MapWrapper;
