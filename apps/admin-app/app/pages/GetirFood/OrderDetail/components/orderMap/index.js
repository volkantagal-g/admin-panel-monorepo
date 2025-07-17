import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, Placemark, YMaps, TrafficControl, Polyline } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import MapBoxPolyline from '@mapbox/polyline';

import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { ENVIRONMENT } from '@shared/config';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import { courierRouteSelector, orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { getFoodOrderClientIcon, getFoodOrderCourierIcon } from '@app/pages/GetirFood/OrderDetail/components/orderMap/mapMarkers';
import { getFoodOrderMarkerOptions } from '@app/pages/GetirFood/OrderDetail/components/orderMap/util';
import restaurantMarker from '@shared/assets/markers/marker_restaurant.png';
import useStyles from './styles';
import { FOOD_DELIVERY, FOOD_ORDER_STATUS } from '@shared/shared/constants';

const OrderMap = () => {
  const { orderDetailId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('foodOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const orderRoutes = useSelector(courierRouteSelector.getData);
  const { courier, restaurant, deliveryAddress } = orderDetail;
  const orderStatus = get(orderDetail, 'status', '');
  const isGetirDelivery = orderDetail.deliveryType === FOOD_DELIVERY.GETIR;

  const [yMaps, setYMaps] = useState(null);
  const [clientPlacemark, setClientPlacemark] = useState(null);
  const [courierPlacemark, setCourierPlacemark] = useState(null);
  const [restaurantPlacemark, setRestaurantPlacemark] = useState(null);
  const [allRoutes, setAllRoutes] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [route, setRoute] = useState([]);
  const [defaultMapState, setDefaultMapState] = useState({
    center: [41, 29],
    zoom: 11,
  });

  const restaurantMarkerOptions = getFoodOrderMarkerOptions(restaurantMarker);
  const courierMarkerOptions = useMemo(() => getFoodOrderMarkerOptions(getFoodOrderCourierIcon(courier)), [courier]);
  const clientMarkerOptions = useMemo(() => getFoodOrderMarkerOptions(getFoodOrderClientIcon(orderStatus)), [orderStatus]);

  const setMapObject = ymaps => setYMaps(ymaps);

  useEffect(() => {
    if (restaurant?.location?.lat && restaurant?.location?.lon) {
      setRestaurantPlacemark([
        restaurant?.location?.lat,
        restaurant?.location?.lon,
      ]);

      if (orderStatus <= FOOD_ORDER_STATUS.VERIFYING || (!courier?.id && !courierPlacemark && orderStatus < FOOD_ORDER_STATUS.DELIVERED)) {
        setDefaultMapState(state => ({
          ...state,
          center: [
            restaurant?.location?.lat,
            restaurant?.location?.lon,
          ],
          zoom: 13,
        }));
      }
    }
  }, [restaurant, courierPlacemark, courier?.id, orderStatus]);

  useEffect(() => {
    if (courier?.id) {
      dispatch(
        Creators.getCourierRouteRequest({ foodOrderId: orderDetailId }),
      );
    }

    if (isGetirDelivery && courier?.lat && courier?.lon) {
      setCourierPlacemark([courier?.lat, courier?.lon]);
      if (orderStatus > FOOD_ORDER_STATUS.VERIFYING && orderStatus < FOOD_ORDER_STATUS.DELIVERED) {
        setDefaultMapState(state => ({
          ...state,
          center: [courier?.lat, courier?.lon],
          zoom: 15,
        }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courier?.id, dispatch, orderDetailId, orderStatus, isGetirDelivery]);

  useEffect(() => {
    if (deliveryAddress?.location?.coordinates?.length) {
      setClientPlacemark([
        deliveryAddress?.location?.coordinates[1],
        deliveryAddress?.location?.coordinates[0],
      ]);
      if (!isGetirDelivery || (orderStatus >= FOOD_ORDER_STATUS.DELIVERED)) {
        setDefaultMapState(state => ({
          ...state,
          center: [
            deliveryAddress?.location?.coordinates[1],
            deliveryAddress?.location?.coordinates[0],
          ],
          zoom: 13,
        }));
      }
    }
  }, [orderDetailId, deliveryAddress, orderStatus, courier?.id, isGetirDelivery]);

  useEffect(() => {
    if (orderRoutes?.route?.length >= 1) {
      setRoute(orderRoutes.route);
    }
    else if (orderRoutes?.encoded && orderRoutes?.locPrecision) {
      const routes = MapBoxPolyline.decode(orderRoutes?.encoded, orderRoutes?.locPrecision)?.map(item => ({ coordinates: [item[1], item[0]] }));
      setRoute(routes);
    }
  }, [orderRoutes, setRoute]);

  const getAllRoutes = useCallback(() => {
    const routes = [];
    route.forEach(item => {
      routes.push([item.coordinates[1], item.coordinates[0]]);
    });
    return routes;
  }, [route]);

  useEffect(() => {
    if (yMaps && route?.length >= 1) {
      setAllRoutes(getAllRoutes());
    }
  }, [route, yMaps, orderDetailId, getAllRoutes]);

  const getNormalPolyline = (id, points, color) => {
    return (
      <Polyline
        key={`polyline_${id}`}
        geometry={points}
        options={{
          balloonCloseButton: false,
          strokeColor: color,
          strokeWidth: 4,
          strokeOpacity: 1,
        }}
      />
    );
  };

  const getPolylines = useCallback(() => {
    const coordinates = [];
    const points = allRoutes.filter(n => n);
    coordinates.push(getNormalPolyline(orderDetailId, points, '#5D3EBC'));
    return coordinates;
  }, [allRoutes, orderDetailId]);

  useEffect(() => {
    if (yMaps && route?.length >= 1) {
      setPolylines(getPolylines());
    }
  }, [route, yMaps, allRoutes, orderDetailId, getPolylines]);

  return (
    <>
      <div className={classes.titleContent}>
        <b className={classes.mapTitle}>{t('MAP')}</b>
      </div>
      <div className={classes.mapWrapper}>
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
              state={defaultMapState}
              onLoad={setMapObject}
            >
              <TrafficControl />
              {!!polylines.length && polylines}
              {!!courierPlacemark && (
                <Placemark
                  geometry={courierPlacemark}
                  options={courierMarkerOptions}
                />
              )}
              {!!restaurantPlacemark && (
                <Placemark
                  geometry={restaurantPlacemark}
                  options={restaurantMarkerOptions}
                />
              )}
              {!!clientPlacemark && (
                <Placemark
                  geometry={clientPlacemark}
                  options={clientMarkerOptions}
                />
              )}
            </Map>
          </YMaps>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default OrderMap;
