import { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';

// This will be moved to new container
import DefaultBalloonContent from '@shared/components/GIS/Maps/components/balloonContent';

import { getWarehouseMarkerIcon } from './helper';
import useStyles from './styles';

const WarehouseLayer = ({
  warehouses = [],
  isDraggable = false,
}) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const classes = useStyles();

  const renderPopups = () => {
    return (
      popupInfo && (
        <Popup
          className={classes.popup}
          maxWidth="350px"
          key={popupInfo._id}
          anchor="top"
          longitude={Number(popupInfo.location.coordinates[0])}
          latitude={Number(popupInfo.location.coordinates[1])}
          onClose={() => setPopupInfo(null)}
        >
          <DefaultBalloonContent warehouse={popupInfo} />
        </Popup>
      )
    );
  };

  return (
    <>
      { warehouses.map(warehouse => {
        const iconSrc = getWarehouseMarkerIcon(warehouse);
        return (
          <Marker
            key={warehouse._id}
            longitude={warehouse.location.coordinates[0]}
            latitude={warehouse.location.coordinates[1]}
            draggable={isDraggable}
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(warehouse);
            }}
          >
            <img
              src={iconSrc}
              width={20}
              height={20}
              alt="markers-icon"
            />
          </Marker>
        );
      })}
      {renderPopups()}
    </>
  );
};

export default WarehouseLayer;
