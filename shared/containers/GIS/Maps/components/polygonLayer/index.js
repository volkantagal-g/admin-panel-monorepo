import { Layer, Source } from 'react-map-gl';

import { FILL_POLYGON_STYLE, STROKE_STYLE } from './constants';

const PolygonLayer = ({
  geojson = [],
  isFilled = false,
  isStroked = false,
  fillStyle = null,
  strokeStyle = null,
}) => {
  return (
    <Source type="geojson" data={geojson}>
      {isFilled ? <Layer {...fillStyle || FILL_POLYGON_STYLE} /> : undefined}
      {isStroked ? <Layer {...strokeStyle || STROKE_STYLE} /> : undefined}
    </Source>
  );
};

export default PolygonLayer;
