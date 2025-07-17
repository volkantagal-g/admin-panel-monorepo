import { useState, useEffect } from 'react';
import { Placemark } from 'react-yandex-maps';
import { get } from 'lodash';

import { getReversedCoordinate } from '@shared/utils/common';
import { getWarehouseMarkerIcon } from './utils';
import DefaultBalloonContent from './balloonContent';

const WarehouseMapMarker = ({
  warehouse,
  hintContentKey,
  zIndex = 10000000,
  isVisible = true,
  draggable = false,
  showDefaultBalloon = true,
  iconImageSize = [14, 14],
  iconImageOffset = [-7, -14],
  iconLayout = 'default#image',
  handleClick = () => {},
  ...otherProps
}) => {
  const [warehouseMarkerIconPath, setWarehouseMarkerIconPath] = useState('');

  useEffect(() => {
    const icon = getWarehouseMarkerIcon({ warehouse });
    setWarehouseMarkerIconPath(icon);
  }, [warehouse]);

  return (
    <Placemark
      {...otherProps}
      key={`marker_${warehouse._id}`}
      geometry={getReversedCoordinate(warehouse?.location?.coordinates)}
      onClick={(...args) => handleClick({ warehouse }, ...args)}
      options={{
        iconImageHref: warehouseMarkerIconPath,
        iconLayout,
        iconImageSize,
        iconImageOffset,
        draggable,
        isVisible,
        zIndex,
      }}
      modules={[
        ...(hintContentKey ? ['geoObject.addon.hint'] : []),
        ...(showDefaultBalloon ? ['geoObject.addon.balloon'] : []),
      ]}
      properties={{
        ...(
          /*
          TODO
            We need to find a way to assign a balloonContent without using the ReactDOMServer.renderToString function
            because renderToString is not an efficient (onClick etc. and many hooks cannot be used)
          */
          showDefaultBalloon ?
            { 
              balloonContent: `<div class="warehouse-balloon">
                <h3>${warehouse.name || 'Warehouse'}</h3>
                <p>ID: ${warehouse._id || 'N/A'}</p>
                <p>Location: ${warehouse.location?.coordinates?.join(', ') || 'N/A'}</p>
              </div>` 
            } :
            undefined
        ),
        ...(hintContentKey ? { hintContent: get(warehouse, hintContentKey) } : undefined),
      }}
    />
  );
};

export default WarehouseMapMarker;
