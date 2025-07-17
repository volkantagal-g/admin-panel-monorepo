import { Marker } from 'react-leaflet';
import { useRef, useMemo } from 'react';

const DraggableMarker = ({ center, isDraggable, onDragEnd }) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onDragEnd(marker.getLatLng());
        }
      },
    }),
    [onDragEnd],
  );

  return (
    <Marker
      draggable={isDraggable}
      eventHandlers={eventHandlers}
      position={center}
      ref={markerRef}
    />
  );
};
export default DraggableMarker;
