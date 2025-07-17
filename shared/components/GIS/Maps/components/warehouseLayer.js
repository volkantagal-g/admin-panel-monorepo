import { FeatureGroup, GeoJSON } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import * as Leaflet from 'leaflet';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import { uniqueId } from 'lodash';
import { featureCollection, point } from '@turf/turf';

import { getWarehouseMarkerIcon } from '@shared/components/GIS/Maps/utils/helper';
import DefaultBalloonContent from './balloonContent';
import useStyles from '../styles';

const WarehouseLayer = ({
  warehouses = [],
  isDraggable = false,
  iconImageSize = [14, 14],
  iconImageOffset = null,
  popupOffset = [0, 0],
  tooltipOffset = [0, 0],
  tooltipDirection = 'top',
  iconShadowSize = [14, 14],
  iconShadowOffset = null,
  isShowingLabel = false,
}) => {
  const geoJsonFeatureGroupRef = useRef();
  const [geoJson, setGeoJson] = useState(featureCollection([]));
  const classes = useStyles();

  const pointToLayer = (feature, latlng) => {
    const props = feature.properties;
    const iconPath = getWarehouseMarkerIcon(props);
    const customIcon = Leaflet.icon({
      iconUrl: iconPath,
      iconSize: iconImageSize,
      iconAnchor: iconImageOffset,
      popupAnchor: popupOffset,
      shadowUrl: shadow,
      shadowSize: iconShadowSize,
      shadowAnchor: iconShadowOffset,
    });
    return Leaflet.marker(latlng, {
      icon: customIcon,
      draggable: isDraggable,
    });
  };

  const onEachFeaturePoint = (feature, layer) => {
    const label = feature.properties.name;
    // ReactDOMServer.renderToString yerine basit HTML string kullanıyoruz
    const utils = `<div class="warehouse-balloon">
      <h3>${feature.properties.name || 'Warehouse'}</h3>
      <p>ID: ${feature.properties._id || 'N/A'}</p>
    </div>`;
    return (
      isShowingLabel ?
        layer.bindTooltip(label, {
          direction: tooltipDirection,
          offset: tooltipOffset,
          className: classes.tooltipWrapper,
        }) :
        layer.bindPopup(utils)
    );
  };
  useEffect(() => {
    const collection = featureCollection(warehouses.map(warehouse => {
      return point(warehouse.location.coordinates, warehouse);
    }));
    return setGeoJson(collection);
  }, [warehouses]);

  return (
    <FeatureGroup data-testid="gis-warehouse-layer" ref={geoJsonFeatureGroupRef}>
      <GeoJSON
        key={uniqueId()}
        data={geoJson}
        onEachFeature={onEachFeaturePoint}
        pointToLayer={pointToLayer}
      />
    </FeatureGroup>
  );
};

export default WarehouseLayer;
