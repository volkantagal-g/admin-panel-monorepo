import { useCallback } from 'react';
import { Col } from 'antd';
import { useSelector } from 'react-redux';

import { featureCollection, polygon as turfPolygon } from '@turf/turf';

import { GeoJsonLayer, Maps, WarehouseLayer } from '@shared/components/GIS/Maps';
import { heatMapSelector } from '@app/pages/GIS/HeatMap/redux/selectors';
import HeatMapLayer from './heatmap';
import { getWarehousesSelector } from '@shared/redux/selectors/common';

import { getFilteredWarehouses } from '../../utils/helpers';

const MapWrapper = () => {
  const mapOption = useSelector(heatMapSelector.getMapOptions);
  const polygons = useSelector(heatMapSelector.getPolygonData);
  const heatMapData = useSelector(heatMapSelector.getHeatMapData);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const polygonFilters = useSelector(heatMapSelector.getPolygonFilters);
  const isPending = useSelector(heatMapSelector.getIsPendingHeatMap);
  const mapCenterCoordinates = mapOption.center;

  const style = {
    fillColor: '#9b9a9a',
    color: '#000000',
    fillOpacity: 0.1,
    strokeWidth: 2,
  };

  const polygonsGeoJson = polygons
    ? featureCollection(polygons?.map(polygon => {
      const geom = polygon.geometry.coordinates;
      return turfPolygon(geom, polygon);
    }))
    : [];

  const memoizedWarehouseMarkers = useCallback(
    () => {
      if (mapOption.isShowWarehousesMarker && polygonFilters.city) {
        const filteredWarehouses = getFilteredWarehouses({ warehouses, polygonFilters });
        return (
          <WarehouseLayer
            warehouses={filteredWarehouses}
          />
        );
      }
      return undefined;
    },
    [mapOption.isShowWarehousesMarker, polygonFilters, warehouses],
  );

  const memoizedHeatLayer = useCallback(
    () => {
      if (heatMapData.data !== []) {
        return (
          <HeatMapLayer data={heatMapData} />
        );
      }
      return undefined;
    },
    [heatMapData],
  );

  return (
    <Col xs={24} sm={24} md={18} lg={20}>
      <Maps center={mapCenterCoordinates} currentZoom={12} flyOnCenterChange={false}>
        {!isPending ? (
          <GeoJsonLayer style={style} geoJson={polygonsGeoJson} onClick={() => {}} />
        ) : null}
        {memoizedWarehouseMarkers()}
        {memoizedHeatLayer()}
      </Maps>
    </Col>
  );
};

export default MapWrapper;
