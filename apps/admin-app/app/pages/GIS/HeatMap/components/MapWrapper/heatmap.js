import { useEffect, useRef } from 'react';
import { FeatureGroup } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import 'leaflet.heat';

const HeatMapLayer = ({ data }) => {
  const layerRef = useRef(Leaflet.featureGroup());

  const currentLayer = layerRef.current;

  useEffect(() => {
    const heatMapStyle = {
      radius: 18,
      gradient: {
        0.3: '#5ebb06',
        0.5: '#7eff00',
        0.7: '#ffea00',
        0.8: '#ffbb00',
        0.85: '#ff9100',
        0.9: '#ff6200',
        0.95: '#ff2200',
        1: 'brown',
      },
      minOpacity: 0.3,
      maxZoom: 20,
      blur: 10,
    };
    const points = data
      ? data.map(p => {
        return [p.lat, p.lon, p.count]; // [lat, lng, intensity]
      })
      : [];
    const heatMap = Leaflet.heatLayer(points, heatMapStyle);
    currentLayer.addLayer(heatMap);
    return () => {
      currentLayer.clearLayers();
    };
  }, [data, currentLayer]);

  return (
    <FeatureGroup ref={layerRef} />
  );
};

export default HeatMapLayer;
