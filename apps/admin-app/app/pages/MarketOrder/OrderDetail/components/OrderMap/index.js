import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Map,
  Placemark,
  Polyline,
  TrafficControl,
  TypeSelector,
  YMaps,
} from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';

import classNames from 'classnames';

import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { ENVIRONMENT } from '@shared/config';
import { orderDetailSelector } from '../../redux/selectors';

import useStyles from './styles';
import { GETIR_DOMAIN_TYPES, TAG_COLORS } from '@shared/shared/constants';
import {
  g10OrderMarkersByStatus,
  g30OrderMarkersByStatus,
  getWarehouseMarker,
  markerZIndexes,
} from './markers';
import { getCourierMarker } from './markers/courier';
import { Space } from '@shared/components/GUI';

const OrderMap = () => {
  const mapRef = useRef();
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);

  const {
    status,
    domainType,
    courier,
    warehouse,
    courierRoutes = [],
    reach,
    delivery,
  } = orderDetail;
  const [lng, lat] = get(delivery, 'address.location.coordinates', [0, 0]);
  const [courierLng, courierLat] = get(
    courier,
    'courier.location.coordinates',
    [0, 0],
  );
  const [warehouseLng, warehouseLat] = get(
    warehouse,
    'location.coordinates',
    [0, 0],
  );
  const [reachLon, reachLat] = reach?.location?.coordinates || [];
  const warehouseMarker = getWarehouseMarker(warehouse?.warehouse);

  const courierRouteCoordinates = courierRoutes?.map(({ coordinates = [] }) => {
    const [longitude, latitude] = coordinates;
    return [latitude, longitude];
  });

  const courierCoordinates = useMemo(() => {
    let coordinates = [courierLat, courierLng];
    if (reachLon && reachLat) {
      coordinates = [reachLat, reachLon];
    }
    return coordinates;
  }, [reachLon, reachLat, courierLat, courierLng]);

  const iconLayout = 'default#image';
  const iconImageSize = [26, 26];
  const iconImageOffset = [-15, -26];
  const polylineOptions = {
    balloonCloseButton: false,
    strokeColor: TAG_COLORS.default,
    strokeWidth: 4,
    strokeOpacity: 1,
  };

  const placeMarkConfig = {
    place: {
      coordinates: [lat, lng],
      options: {
        iconLayout,
        iconImageHref:
          domainType === GETIR_DOMAIN_TYPES.GETIR10
            ? g10OrderMarkersByStatus?.[status]
            : g30OrderMarkersByStatus?.[status],
        iconImageSize,
        iconImageOffset,
        draggable: false,
        visible: true,
        zIndex: markerZIndexes.orderMarker,
      },
    },
    courier: {
      coordinates: courierCoordinates,
      options: {
        iconLayout,
        iconImageHref: getCourierMarker(courier?.courier, reach?.location),
        iconImageSize,
        iconImageOffset,
        draggable: false,
        visible: true,
        zIndex: markerZIndexes.courier,
      },
    },
    warehouse: {
      coordinates: [warehouseLat, warehouseLng],
      options: {
        iconLayout: 'default#image',
        iconImageHref: warehouseMarker,
        iconImageSize,
        iconImageOffset,
        zIndex: markerZIndexes.warehouse,
      },
    },
  };

  return (
    <Space
      className={classNames(classes.mapWrapper, 'p-1')}
      dataTestId="order-map"
      title={t('MAP')}
    >
      <ErrorBoundary>
        <YMaps
          query={{
            lang: 'tr_TR',
            apikey: ENVIRONMENT.YANDEX_JS_KEY,
          }}
        >
          <Map
            width="100%"
            height="100%"
            state={{ center: [lat, lng], zoom: 14 }}
            instanceRef={ref => {
              mapRef.current = ref;
            }}
          >
            <TrafficControl />
            <TypeSelector />
            {Object.values(placeMarkConfig).map(({ coordinates, options }) => (
              <Placemark
                key={coordinates}
                geometry={coordinates}
                options={options}
              />
            ))}
            {!isEmpty(courierRouteCoordinates) && (
              <Polyline
                geometry={courierRouteCoordinates}
                options={polylineOptions}
              />
            )}
          </Map>
        </YMaps>
      </ErrorBoundary>
    </Space>
  );
};

export default OrderMap;
