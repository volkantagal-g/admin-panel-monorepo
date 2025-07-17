import { FeatureGroup } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import { DraftControl } from 'react-leaflet-draft';

import 'leaflet-draw/dist/leaflet.draw.css';

const DrawingTool = ({
  setDrawFeatureCollection,
  position = 'topleft',
  editable = false,
  drawPolyline = false,
  drawPolygon = false,
  drawMarker = false,
  drawCircleMarker = false,
  drawCircle = false,
  drawRectangle = false,
  maxLayer = 1,
  onCreated = () => {},
  onEdited = () => {},
  onDeleted = () => {},
  onDrawStart = () => {},
  onDrawStop = () => {},
  onDrawVertex = () => {},
  onEditStart = () => {},
  onEditMove = () => {},
  onEditResize = () => {},
  onEditVertex = () => {},
  onEditStop = () => {},
  onDeleteStart = () => {},
  onDeleteStop = () => {},
  onToolbarOpened = () => {},
  onToolbarClosed = () => {},
  onMarkerContext = () => {},
}) => {
  const geoJsonFeatureGroupRef = useRef();

  useEffect(() => {
    setDrawFeatureCollection(geoJsonFeatureGroupRef.current);
  }, [setDrawFeatureCollection]);

  const handleOnCreated = e => {
    return onCreated(e);
  };

  const handleOnEdited = e => {
    return onEdited(e);
  };

  const handleOnDeleted = e => {
    return onDeleted(e);
  };

  const handleOnDrawStart = e => {
    return onDrawStart(e);
  };

  const handleOnDrawStop = e => {
    return onDrawStop(e);
  };

  const handleOnDrawVertex = e => {
    return onDrawVertex(e);
  };

  const handleOnEditStart = e => {
    return onEditStart(e);
  };

  const handleOnEditMove = e => {
    return onEditMove(e);
  };

  const handleOnEditResize = e => {
    return onEditResize(e);
  };

  const handleOnEditVertex = e => {
    return onEditVertex(e);
  };

  const handleOnEditStop = e => {
    return onEditStop(e);
  };

  const handleOnDeleteStart = e => {
    return onDeleteStart(e);
  };

  const handleOnDeleteStop = e => {
    return onDeleteStop(e);
  };

  const handleOnToolbarOpened = e => {
    return onToolbarOpened(e);
  };

  const handleOnToolbarClosed = e => {
    return onToolbarClosed(e);
  };

  const handleOnMarkerContext = e => {
    return onMarkerContext(e);
  };

  return (
    <FeatureGroup ref={geoJsonFeatureGroupRef}>
      <DraftControl
        position={position}
        edit={{ edit: editable }}
        draw={{
          polyline: drawPolyline,
          polygon: drawPolygon,
          marker: drawMarker,
          circlemarker: drawCircleMarker,
          circle: drawCircle,
          rectangle: drawRectangle,
        }}
        limitLayers={maxLayer}
        onCreated={e => handleOnCreated(e)}
        onEdited={e => handleOnEdited(e)}
        onDeleted={e => handleOnDeleted(e)}
        onDrawStart={e => handleOnDrawStart(e)}
        onDrawStop={e => handleOnDrawStop(e)}
        onDrawVertex={e => handleOnDrawVertex(e)}
        onEditStart={e => handleOnEditStart(e)}
        onEditMove={e => handleOnEditMove(e)}
        onEditResize={e => handleOnEditResize(e)}
        onEditVertex={e => handleOnEditVertex(e)}
        onEditStop={e => handleOnEditStop(e)}
        onDeleteStart={e => handleOnDeleteStart(e)}
        onDeleteStop={e => handleOnDeleteStop(e)}
        onToolbarOpened={e => handleOnToolbarOpened(e)}
        onToolbarClosed={e => handleOnToolbarClosed(e)}
        onMarkerContext={e => handleOnMarkerContext(e)}
      />
    </FeatureGroup>
  );
};

export default DrawingTool;
