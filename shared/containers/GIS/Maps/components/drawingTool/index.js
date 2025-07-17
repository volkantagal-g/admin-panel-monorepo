import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { useEffect } from 'react';
import { useControl, useMap } from 'react-map-gl';

const DrawingTool = ({
  position = 'top-right',
  drawPolyline = false,
  drawPolygon = false,
  drawPoint = false,
  thrash = false,
  displayControlsDefault = false, // It is controls combine / uncombine buttons
  onCreate = () => {},
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const mapRef = useMap();
  useControl(
    () => new MapboxDraw(
      {
        controls: {
          polygon: drawPolygon,
          line_string: drawPolyline,
          point: drawPoint,
          trash: thrash,
        },
        displayControlsDefault,
      },
    ),
    { position },
  );

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on('draw.create', onCreate);
      map.on('draw.update', onUpdate);
      map.on('draw.delete', onDelete);
    }
  });
  return null;
};

export default DrawingTool;
