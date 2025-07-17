import { LayersControl, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Leaflet from 'leaflet';
// TODO if react updated 18, update this package to 'react-leaflet-google-v2'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

import { ATTRIBUTIONS, TILE_LAYERS } from '@shared/components/GIS/Maps/utils/constants';
import { ENVIRONMENT } from '@shared/config';

const BaseLayers = ({ showZoom = true }) => {
  const map = useMap();
  const { t } = useTranslation('gisMap');
  const key = ENVIRONMENT.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapTypes = {
    road: 'roadmap',
    traffic: 'traffic',
    hybrid: 'hybrid',
    satellite: 'satellite',
  };

  useEffect(() => {
    if (showZoom) {
      Leaflet.control.zoominfo().addTo(map);
    }
  }, [map, showZoom]);

  return (
    <LayersControl position="bottomright">
      <LayersControl.BaseLayer checked name={t(`BASE_LAYER_NAMES.${TILE_LAYERS.OSM.NAME}`)}>
        <TileLayer
          attribution={ATTRIBUTIONS.OSM}
          url={TILE_LAYERS.OSM.URL}
          maxZoom={TILE_LAYERS.OSM.MAX_ZOOM}
          minZoom={TILE_LAYERS.OSM.MIN_ZOOM}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={t(`BASE_LAYER_NAMES.${TILE_LAYERS.GOOGLE_ROAD.NAME}`)}>
        <ReactLeafletGoogleLayer
          apiKey={key}
          type={mapTypes.road}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={t(`BASE_LAYER_NAMES.${TILE_LAYERS.GOOGLE_TRAFFIC.NAME}`)}>
        <ReactLeafletGoogleLayer
          apiKey={key}
          googleMapsAddLayers={[{ name: 'TrafficLayer' }]}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={t(`BASE_LAYER_NAMES.${TILE_LAYERS.GOOGLE_HYBRID.NAME}`)}>
        <ReactLeafletGoogleLayer
          apiKey={key}
          type={mapTypes.hybrid}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={t(`BASE_LAYER_NAMES.${TILE_LAYERS.GOOGLE_SATELLITE.NAME}`)}>
        <ReactLeafletGoogleLayer
          apiKey={key}
          type={mapTypes.satellite}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={t(`BASE_LAYER_NAMES.${TILE_LAYERS.ESRI_SATELLITE.NAME}`)}>
        <TileLayer
          attribution={ATTRIBUTIONS.ESRI_SATELLITE}
          url={TILE_LAYERS.ESRI_SATELLITE.URL}
          maxZoom={TILE_LAYERS.ESRI_SATELLITE.MAX_ZOOM}
          minZoom={TILE_LAYERS.ESRI_SATELLITE.MIN_ZOOM}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default BaseLayers;
