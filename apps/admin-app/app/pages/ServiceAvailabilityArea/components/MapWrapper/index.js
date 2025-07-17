import { useCallback, useRef } from 'react';

import { polygon as turfPolygon, point, featureCollection, booleanPointInPolygon } from '@turf/turf';

import { Col } from 'antd';

import { Maps, PolygonLayer, WarehouseLayer } from '@shared/containers/GIS/Maps';
import { CENTER_OF_TURKEY, LIST_MAP_ZOOM } from '@app/pages/ServiceAvailabilityArea/constants';

const EMPTY_ARRAY = [];
const EMPTY_FUNCTION = () => {};

const MapWrapper = ({
  center = CENTER_OF_TURKEY,
  zoom = LIST_MAP_ZOOM,
  areas = EMPTY_ARRAY,
  warehouses = EMPTY_ARRAY,
  onClick = EMPTY_FUNCTION,
}) => {
  const areasGeoJson = useRef();
  const [lat, lng] = center;

  const handleOnClick = useCallback(e => {
    const { lngLat } = e;
    const turfPoint = point([lngLat.lng, lngLat.lat]);
    const { current: data } = areasGeoJson;

    const selectedSaa = data.features.find(feature => booleanPointInPolygon(turfPoint, feature));
    return onClick(selectedSaa);
  }, [onClick]);

  const renderSaas = useCallback(() => {
    const polygonsGeoJson = featureCollection(areas.map(polygon => {
      const geom = polygon.polygon.coordinates;
      return turfPolygon(geom, polygon);
    }));
    areasGeoJson.current = polygonsGeoJson;

    return (
      <PolygonLayer
        geojson={polygonsGeoJson}
        isFilled
        isStroked
        id="saa-source"
      />
    );
  }, [areas, areasGeoJson]);

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
        latitude={lat}
        longitude={lng}
        zoom={zoom}
        onClick={handleOnClick}
      >
        {renderSaas()}
        {renderWarehouses()}
      </Maps>
    </Col>
  );
};

export default MapWrapper;
