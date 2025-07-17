import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Placemark, Polyline, TrafficControl, Map as YMap, YMaps } from 'react-yandex-maps';

import _, { isEmpty } from 'lodash';

import courierMarker from '@shared/assets/markers/locals_courier.png';
import clientMarker from '@shared/assets/markers/locals_customer.png';
import warehouseMarker from '@shared/assets/markers/locals_shop.png';
import { ENVIRONMENT } from '@shared/config';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import { TAG_COLORS } from '@shared/shared/constants';

const START_POINT = { lat: 41, lon: 29 };
const ICON_SIZE = [58, 58];
const ICON_OFFSET = [-29, -58];
const COURIER_ROUTES_OPTIONS = {
  balloonCloseButton: false,
  strokeColor: TAG_COLORS.default,
  strokeWidth: 4,
  strokeOpacity: 1,
};

const Map = () => {
  const mapRef = useRef();
  const [yMaps, setYMaps] = useState(null);

  const data = useSelector(financeOrderDetailSelector.getData);

  const courierLocation = _.get(data, 'courier.courier.location.coordinates') || [START_POINT.lon, START_POINT.lat];
  const warehouseLocation = _.get(data, 'warehouse.location.coordinates') || [START_POINT.lon, START_POINT.lat];
  const clientLocation = _.get(data, 'deliveryInformation.address.location.coordinates') || START_POINT;
  const courierRoutes = _.get(data, 'courierRoutes.routeData.route');

  const reversedCourierLocation = [...courierLocation].reverse();
  const reversedWarehouse = [...warehouseLocation].reverse();

  const courierRouteCoordinates = courierRoutes?.map(({ coordinates = [] }) => {
    const [longitude, latitude] = coordinates;
    return [latitude, longitude];
  });

  const setMapObject = ymaps => setYMaps(ymaps);

  const calculateBounds = useCallback(() => {
    const locationsArr = [[...reversedWarehouse], [...reversedCourierLocation], [clientLocation.lat, clientLocation.lon]];

    const min = [];
    const max = [];

    locationsArr.forEach(([lat, lon]) => {
      if (!min[0] || lat < min[0]) {
        min[0] = lat;
      }
      if (!min[1] || lon < min[1]) {
        min[1] = lon;
      }
      if (!max[0] || lat > max[0]) {
        max[0] = lat;
      }
      if (!max[1] || lon > max[1]) {
        max[1] = lon;
      }
    });

    return [min, max];
  }, [reversedWarehouse, clientLocation, reversedCourierLocation]);

  useEffect(() => {
    if (mapRef.current && yMaps) {
      const containerSize = mapRef.current.container.getSize();

      const mapBounds = yMaps.util.bounds.getCenterAndZoom(
        calculateBounds(),
        containerSize,
        null,
      );

      mapRef.current.setCenter(
        mapBounds.center,
        mapBounds.zoom,
      );
    }
  }, [yMaps, calculateBounds]);

  return (
    <YMaps
      query={{
        lang: 'tr_TR',
        apikey: ENVIRONMENT.YANDEX_JS_KEY,
        load: 'util.bounds',
      }}
    >
      <YMap
        width="100%"
        height="100%"
        state={{
          zoom: 11,
          center: [START_POINT.lat, START_POINT.lon],
        }}
        instanceRef={ref => {
          mapRef.current = ref;
        }}
        onLoad={setMapObject}
      >
        <TrafficControl />
        {
          courierLocation ? (
            <Placemark
              geometry={reversedCourierLocation}
              options={{
                iconLayout: 'default#image',
                iconImageHref: courierMarker,
                iconImageSize: ICON_SIZE,
                iconImageOffset: ICON_OFFSET,
              }}
            />
          ) : (
            <Placemark
              geometry={reversedWarehouse}
              options={{
                iconLayout: 'default#image',
                iconImageHref: warehouseMarker,
                iconImageSize: ICON_SIZE,
                iconImageOffset: ICON_OFFSET,
              }}
            />
          )
        }
        <Placemark
          geometry={[clientLocation.lat, clientLocation.lon]}
          options={{
            iconLayout: 'default#image',
            iconImageHref: clientMarker,
            iconImageSize: ICON_SIZE,
            iconImageOffset: ICON_OFFSET,
          }}
        />
        {
          !isEmpty(courierRouteCoordinates) && <Polyline geometry={courierRouteCoordinates} options={COURIER_ROUTES_OPTIONS} />
        }
      </YMap>
    </YMaps>
  );
};

export { Map };
