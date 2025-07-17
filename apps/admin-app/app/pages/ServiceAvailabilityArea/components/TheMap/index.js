import { useCallback } from 'react';
import { featureCollection, polygon as turfPolygon } from '@turf/turf';
import { Col } from 'antd';

import { Maps, GeoJsonLayer, WarehouseLayer } from '@shared/components/GIS/Maps';
import { CENTER_OF_TURKEY, LIST_MAP_ZOOM } from '@app/pages/ServiceAvailabilityArea/constants';

export default function TheMap({
  mapState = { center: CENTER_OF_TURKEY, zoom: LIST_MAP_ZOOM },
  areas = [],
  warehouses = [],
  onPolygonClick,
}) {
  const renderAreas = useCallback(() => {
    const polygonsGeoJson = featureCollection(areas.map(polygon => {
      const geom = polygon.polygon.coordinates;
      return turfPolygon(geom, polygon);
    }));
    return (
      <GeoJsonLayer
        onClick={onPolygonClick || (() => {
          return null;
        })}
        geoJson={polygonsGeoJson}
      />
    );
  }, [areas, onPolygonClick]);

  const renderWarehouses = useCallback(() => {
    return (
      <WarehouseLayer
        warehouses={warehouses}
      />
    );
  }, [warehouses]);

  return (
    <Col xs={24} sm={24} md={20} lg={20}>
      <Maps
        center={mapState.center}
        currentZoom={mapState.zoom}
      >
        {renderAreas()}
        {renderWarehouses()}
      </Maps>
    </Col>
  );
}
