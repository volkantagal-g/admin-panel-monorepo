import { useSelector } from 'react-redux';

import { isMobile } from '@shared/utils/common';
import { YandexMaps } from '@shared/components/YMaps/Map';
import WarehouseMapMarker from '@shared/components/YMaps/Marker/Warehouse';
import CourierMarkers from '../CourierMarkers';
import Polygon from '../Polygon';
import { warehouseSelector } from '../../redux/selectors';
import { MAP_OPTIONS } from '../../constants';

const WarehouseLiveMap = () => {
  const warehouseData = useSelector(warehouseSelector.getData);
  const warehouseIsPending = useSelector(warehouseSelector.getIsPending);
  const reversedWarehouseCoordinate = warehouseData?.location?.coordinates ?
    [...warehouseData.location.coordinates].reverse() :
    MAP_OPTIONS.CENTER;

  const isDeviceMobile = isMobile();

  return (
    <YandexMaps
      isShowTrafficControl
      {...(!isDeviceMobile && {
        isShowZoomControl: true,
        zoomControlOptions: { float: 'right' },
      })}
      state={{
        center: reversedWarehouseCoordinate,
        zoom: MAP_OPTIONS.ZOOM_RATIO,
      }}
    >
      {
        !warehouseIsPending && (
          <WarehouseMapMarker
            warehouse={warehouseData}
            showDefaultBalloon={false}
            hintContentKey="name"
          />
        )
      }
      <CourierMarkers />
      <Polygon />
    </YandexMaps>
  );
};

export default WarehouseLiveMap;
