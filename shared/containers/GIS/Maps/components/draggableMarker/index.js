import { Marker } from 'react-map-gl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CENTER_OF_TURKEY } from '../../utils/constants';

const DraggableMarker = ({
  latitude = CENTER_OF_TURKEY[0],
  longitude = CENTER_OF_TURKEY[1],
  isDraggable = true,
  onDragEnd = () => {},
  onDragStart = () => {},
  onDrag = () => {},
  onClick = () => {},
  color = '#3FB1CE',
  offset = null,
}) => {
  const prevPositionRef = useRef();
  const [newPosition, setNewPosition] = useState();
  const [marker, setMarker] = useState({ lng: longitude, lat: latitude });

  const onMarkerDragStart = useCallback(e => {
    onDragStart(({ ...e, onDragStart: e.lngLat }));
  }, [onDragStart]);

  const onMarkerDragging = useCallback(e => {
    onDrag(({ ...e, onDrag: e.lngLat }));
    setMarker(e.lngLat);
  }, [onDrag]);

  const onMarkerClick = useCallback(e => onClick(e), [onClick]);

  const onMarkerDragEnd = useCallback(e => {
    const afterDrag = e.lngLat;
    setNewPosition(afterDrag);
    return (onDragEnd({
      ...e,
      beforeDrag: prevPositionRef.current || {
        lng: longitude,
        lat: latitude,
      },
      afterDrag,
    }));
  }, [latitude, longitude, onDragEnd]);

  useEffect(() => {
    prevPositionRef.current = newPosition;
  }, [newPosition]);

  return (
    <Marker
      draggable={isDraggable}
      onDrag={onMarkerDragging}
      onDragStart={onMarkerDragStart}
      onDragEnd={onMarkerDragEnd}
      onClick={onMarkerClick}
      longitude={marker.lng}
      latitude={marker.lat}
      color={color}
      offset={offset}
    />
  );
};
export default DraggableMarker;
