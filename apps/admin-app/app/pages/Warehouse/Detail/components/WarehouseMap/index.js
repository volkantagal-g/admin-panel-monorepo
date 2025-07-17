import { Col } from 'antd';

import { useEffect, useState } from 'react';

import { Maps, DraggableMarker } from '@shared/components/GIS/Maps';

const WarehouseMap = ({ coordinates, handleDragEnd, isDraggable = false }) => {
  const [defaultMapState, setDefaultMapState] = useState(null);

  useEffect(() => {
    if (coordinates && coordinates.length) {
      setDefaultMapState({
        center: [
          coordinates[1],
          coordinates[0],
        ],
        zoom: 11,
      });
    }
  }, [coordinates]);

  return (
    <Col span={24}>
      { defaultMapState && (
        <Maps
          center={defaultMapState.center}
          flyOnCenterChange
          currentZoom={defaultMapState.zoom}
          style={{ width: '100%', height: '400px' }}
        >
          <DraggableMarker center={defaultMapState.center} isDraggable={isDraggable} onDragEnd={handleDragEnd} />
        </Maps>
      )}
    </Col>
  );
};

export default WarehouseMap;
