import { FeatureGroup, GeoJSON } from 'react-leaflet';
import { useRef } from 'react';
import { uniqueId } from 'lodash';

const GeoJsonLayer = ({
  geoJson = [],
  style = null,
  isInteractive = true,
  onClick = () => {},
}) => {
  const geoJsonFeatureGroupRef = useRef();

  const defaultStyle = {
    fillColor: '#777777',
    color: '#000000',
    fillOpacity: 0.5,
    strokeWidth: 2,
  };

  const setStyle = () => {
    return (style || defaultStyle);
  };

  const onEachFeatureGeoJson = (feature, layer) => {
    layer.on('click', e => {
      return onClick(e);
    });
  };

  return (
    <FeatureGroup ref={geoJsonFeatureGroupRef}>
      <GeoJSON
        key={uniqueId()}
        data={geoJson}
        style={setStyle()}
        onEachFeature={onEachFeatureGeoJson}
        interactive={isInteractive}
      />
    </FeatureGroup>
  );
};

export default GeoJsonLayer;
