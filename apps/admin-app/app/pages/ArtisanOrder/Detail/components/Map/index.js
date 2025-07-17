import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Map as YMap,
  Placemark,
  YMaps,
  TrafficControl,
  Polyline,
} from 'react-yandex-maps';
import { isEmpty } from 'lodash';

import { ENVIRONMENT } from '@shared/config';
import shopMarker from '@shared/assets/markers/locals_shop.png';
import courierMarker from '@shared/assets/markers/locals_courier.png';
import clientMarker from '@shared/assets/markers/locals_customer.png';
import inactiveShopMarker from '@shared/assets/markers/inactiveShop.png';
import inactiveClientMarker from '@shared/assets/markers/inactiveClient.png';
import returnClientMarker from '@shared/assets/markers/returnClient.png';
import inactiveReturnClientMarker from '@shared/assets/markers/returnInactiveClient.png';
import returnShopMarker from '@shared/assets/markers/returnShop.png';
import inactiveReturnShopMarker from '@shared/assets/markers/returnInactiveShop.png';
import foodClientMarker from '@shared/assets/markers/marker_food_order_primary.png';
import foodRestaurantMarker from '@shared/assets/markers/marker_restaurant.png';
import { getArtisanCourierByIdSelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';
import {
  activeIconImageSize,
  inactiveIconImageSize,
  activeIconImageOffset,
  inactiveIconImageOffset,
  activeBalloonContentOffset,
  inactiveBalloonContentOffset,
  activeReturnIconImageOffset,
  defaultLocation,
  getTasksBetweenPickupAndDelivery,
  PICKUP,
  DELIVERY,
} from '../../util';
import { GETIR_FOOD_DOMAIN_TYPE } from '@shared/shared/constants';

const OrderDetailMap = ({
  orderDetailId,
  returnId,
  orderRoutes,
  returnRoutes,
  deliveryAddress,
  shopLoc,
  courierReturnTasks,
  returnCourier,
  courier,
  shop,
  isOrderCanShuffle,
  courierOrderTasks,
}) => {
  const defaultState = {
    center: defaultLocation,
    zoom: 11,
  };

  const artisanCourier = useSelector(getArtisanCourierByIdSelector.getData);
  const { t } = useTranslation('artisanOrderPage');

  const mapRef = useRef();
  const [yMaps, setYMaps] = useState(null);
  const [courierPlacemark, setCourierPlacemark] = useState(null);

  const setMapObject = ymaps => setYMaps(ymaps);

  const getBalloonContentSequenceText = useCallback((orderId, type) => {
    if (courierOrderTasks?.length > 0) {
      const tasks = getTasksBetweenPickupAndDelivery(courierOrderTasks, orderDetailId);
      return (tasks.findIndex(task => task.orderId === orderId && task.type === type) + 1 ?? '');
    }
    return '';
  }, [courierOrderTasks, orderDetailId]);

  const route = useMemo(() => {
    if (orderRoutes?.route?.length >= 1 && returnRoutes?.route?.length >= 1) {
      const mergedArr = orderRoutes.route.concat(returnRoutes.route);
      const sortedArr = mergedArr.sort(
        (a, b) => new Date(a.time) - new Date(b.time),
      );
      return sortedArr;
    }
    if (orderRoutes?.route?.length >= 1) {
      return orderRoutes?.route;
    }
    if (returnRoutes?.route?.length >= 1) {
      return returnRoutes.route;
    }
    return [];
  }, [orderRoutes, returnRoutes]);

  const allRoutes = useMemo(() => {
    const routes = [];
    route.forEach(point => {
      if ((point.coordinates[1] && point.coordinates[0])) {
        routes.push([point.coordinates[1], point.coordinates[0]]);
      }
    });
    return routes;
  }, [route]);

  const getDashedPolyline = (id, points, color) => {
    const dashedPolyline = (
      <Polyline
        key={`polyline_${id}#${points}`}
        geometry={points}
        options={{
          balloonCloseButton: false,
          strokeColor: color,
          strokeWidth: 4,
          strokeOpacity: 1,
          strokeStyle: {
            style: 'dash',
            offset: 10,
          },
        }}
      />
    );
    return dashedPolyline;
  };

  const getNormalPolyline = (id, points, color) => {
    const normalPolyline = (
      <Polyline
        key={`polyline_${id}#${points}`}
        geometry={points}
        options={{
          balloonCloseButton: false,
          strokeColor: color,
          strokeWidth: 4,
          strokeOpacity: 1,
        }}
      />
    );
    return normalPolyline;
  };

  const polylines = useMemo(() => {
    const coordinates = [];
    let prevIndex = 0;
    const isSingleOrderRoute = route.every(({ orderId }) => orderId === orderDetailId);
    const isSingleReturnRoute = route.every(routeElem => routeElem.returnId === returnId);
    const isMultiOrderRoute = route.every(({ orderId }) => orderId);
    const isMultiReturnRoute = route.every(routeElem => routeElem.returnId);
    const isEachOrderNotEqualOrderDetailId = route.every(({ orderId }) => orderId !== orderDetailId);

    if (isSingleOrderRoute) {
      const points = allRoutes.filter(n => n);
      coordinates.push(getNormalPolyline(orderDetailId, points, '#5D3EBC'));
    }
    else if (isSingleReturnRoute) {
      const points = allRoutes.filter(n => n);
      coordinates.push(getNormalPolyline(returnId, points, '#C71585'));
    }
    else if (isMultiOrderRoute) {
      route.forEach((item, index) => {
        if (isEachOrderNotEqualOrderDetailId) {
          const points = allRoutes.filter(n => n);
          coordinates.push(getDashedPolyline(orderDetailId, points, '#5D3EBC'));
        }
        else if (route[index - 1] && route[index - 1].orderId !== item.orderId && item.orderId === orderDetailId) {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          prevIndex = index - 1;
          coordinates.push(getDashedPolyline(item.orderId, points, '#5D3EBC'));
        }
        else if (route[index - 1] && route[index - 1].orderId !== item.orderId) {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          prevIndex = index - 1;
          coordinates.push(getNormalPolyline(item.orderId, points, '#5D3EBC'));
        }
        else if (item.orderId === orderDetailId) {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          coordinates.push(getNormalPolyline(orderDetailId, points, '#5D3EBC'));
        }
        else {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          coordinates.push(getDashedPolyline(orderDetailId, points, '#5D3EBC'));
        }
      });
    }
    else if (isMultiReturnRoute) {
      route.forEach((item, index) => {
        if (route[index - 1] && route[index - 1].returnId !== item.returnId) {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          prevIndex = index - 1;
          coordinates.push(getDashedPolyline(item.returnId, points, '#C71585'));
        }
        else if (item.returnId === returnId) {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          coordinates.push(getNormalPolyline(returnId, points, '#C71585'));
        }
        else {
          const points = allRoutes.filter(n => n).slice(prevIndex, index);
          coordinates.push(getDashedPolyline(returnId, points, '#C71585'));
        }
      });
    }
    else {
      route.forEach((item, index) => {
        if (item.returnId) {
          if (index === route.length - 1) {
            const points = allRoutes.filter(n => n).slice(index - 1);
            coordinates.push(
              item.returnId === returnId
                ? getNormalPolyline(item.returnId, points, '#C71585')
                : getDashedPolyline(item.returnId, points, '#C71585'),
            );
          }
          else if (route[index - 1] && route[index - 1]?.orderId) {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            prevIndex = index - 1;
            if (route[index - 1]?.orderId === orderDetailId) {
              coordinates.push(
                getNormalPolyline(item.returnId, points, '#5D3EBC'),
              );
            }
            else {
              coordinates.push(
                getDashedPolyline(item.returnId, points, '#5D3EBC'),
              );
            }
          }
          else if (
            route[index - 1] &&
            route[index - 1]?.returnId &&
            route[index - 1]?.returnId !== item.returnId
          ) {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            prevIndex = index - 1;
            coordinates.push(
              getDashedPolyline(item.returnId, points, '#C71585'),
            );
          }
          else if (item.returnId === returnId) {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            coordinates.push(
              getNormalPolyline(item.returnId, points, '#C71585'),
            );
          }
          else {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            coordinates.push(
              getDashedPolyline(item.returnId, points, '#C71585'),
            );
          }
        }
        else if (item.orderId) {
          if (index === route.length - 1) {
            const points = allRoutes.filter(n => n).slice(index - 1);
            coordinates.push(
              item.orderId === orderDetailId
                ? getNormalPolyline(item.orderId, points, '#5D3EBC')
                : getDashedPolyline(item.orderId, points, '#5D3EBC'),
            );
          }
          else if (route[index - 1] && route[index - 1]?.returnId) {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            prevIndex = index - 1;
            if (route[index - 1]?.returnId === returnId) {
              coordinates.push(
                getNormalPolyline(item.returnId, points, '#C71585'),
              );
            }
            else {
              coordinates.push(
                getDashedPolyline(item.returnId, points, '#C71585'),
              );
            }
          }
          else if (
            route[index - 1] &&
            route[index - 1]?.orderId &&
            route[index - 1]?.orderId !== item.orderId
          ) {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            prevIndex = index - 1;
            coordinates.push(
              getDashedPolyline(item.orderId, points, '#5D3EBC'),
            );
          }
          else if (item.orderId === orderDetailId) {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            coordinates.push(
              getNormalPolyline(item.orderId, points, '#5D3EBC'),
            );
          }
          else {
            const points = allRoutes.filter(n => n).slice(prevIndex, index);
            coordinates.push(
              getDashedPolyline(item.orderId, points, '#5D3EBC'),
            );
          }
        }
      });
    }
    return coordinates;
  }, [allRoutes, orderDetailId, returnId, route]);

  const clientPlacemarkObject = useMemo(() => {
    const clientPlacemark = [];
    if (!courierOrderTasks?.length) {
      clientPlacemark.push({
        options: {
          iconLayout: 'default#image',
          iconImageHref: clientMarker,
          iconImageSize: activeIconImageSize,
          iconImageOffset: activeIconImageOffset,
        },
        deliveryLocation: deliveryAddress ? [deliveryAddress.location.coordinates[1], deliveryAddress.location.coordinates[0]] : [41, 26],
        key: 1,
      });
    }
    if (courierOrderTasks?.length > 0) {
      courierOrderTasks.forEach(({ orderId, domainType, location, type }, index) => {
        if (type === DELIVERY) {
          const inactiveClientMarkerHref = (domainType === GETIR_FOOD_DOMAIN_TYPE) ? foodClientMarker : inactiveClientMarker;
          clientPlacemark.push({
            options: {
              iconLayout: 'default#image',
              iconImageHref: orderId === orderDetailId ? clientMarker : inactiveClientMarkerHref,
              iconImageSize: orderId === orderDetailId ? activeIconImageSize : inactiveIconImageSize,
              iconImageOffset: orderId === orderDetailId ? activeIconImageOffset : inactiveIconImageOffset,
              balloonOffset: orderId === orderDetailId ? activeBalloonContentOffset : inactiveBalloonContentOffset,
              hideIconOnBalloonOpen: false,
            },
            properties: {
              balloonContentBody: [
                `<div>
                    <b>${t('YANDEX_MAP_ORDER')}:</b>
                      <span">${orderId}</span></br>
                    <b>${t('YANDEX_MAP_SEQUENCE')}:${getBalloonContentSequenceText(orderId, DELIVERY)}</b>
                  </div>`,
              ],
            },
            deliveryLocation: [location.lat, location.lon],
            key: `orderClient_${index}`,
          });
        }
      });
    }
    if (courierReturnTasks?.length > 0) {
      courierReturnTasks.forEach(batchedReturn => {
        if (batchedReturn.type === PICKUP) {
          clientPlacemark.push({
            options: {
              iconLayout: 'default#image',
              iconImageHref: batchedReturn.returnId === returnId ? returnClientMarker : inactiveReturnClientMarker,
              iconImageSize: batchedReturn.returnId === returnId ? activeIconImageSize : inactiveIconImageSize,
              iconImageOffset: activeReturnIconImageOffset,
            },
            deliveryLocation: [batchedReturn.location.lat, batchedReturn.location.lon],
            key: `returnClient_${batchedReturn.batchIndex}`,
          });
        }
      });
    }

    return clientPlacemark;
  }, [courierOrderTasks, courierReturnTasks, deliveryAddress, orderDetailId, t, getBalloonContentSequenceText, returnId]);

  const shopPlacemarkObject = useMemo(() => {
    const shopPlacemark = [];
    if (!courierOrderTasks?.length) {
      const shopLocation = shop ? [shop?.location?.lat, shop?.location?.lon] : defaultLocation;
      shopPlacemark.push({
        options: {
          iconLayout: 'default#image',
          iconImageHref: shopMarker,
          iconImageSize: activeIconImageSize,
          iconImageOffset: activeIconImageOffset,
        },
        shopLocation: shopLoc ? [shopLoc.lat, shopLoc.lon] : shopLocation,
        key: 1,
      });
    }
    if (courierOrderTasks?.length > 0) {
      courierOrderTasks.forEach(({ orderId, domainType, location, type }, index) => {
        if (type === PICKUP) {
          const inactiveShopMarkerHref = domainType === GETIR_FOOD_DOMAIN_TYPE ? foodRestaurantMarker : inactiveShopMarker;
          const isMatched = orderId === orderDetailId;

          shopPlacemark.push({
            options: {
              iconLayout: 'default#image',
              iconImageHref: isMatched ? shopMarker : inactiveShopMarkerHref,
              iconImageSize: isMatched ? activeIconImageSize : inactiveIconImageSize,
              iconImageOffset: isMatched ? activeIconImageOffset : inactiveIconImageOffset,
              balloonOffset: isMatched ? activeBalloonContentOffset : inactiveBalloonContentOffset,
              hideIconOnBalloonOpen: false,
            },
            properties: {
              balloonContentBody: [
                `<div>
                    <b>${t('YANDEX_MAP_ORDER')}:</b>
                      <span>${orderId}</span></br>
                    <b>${t('YANDEX_MAP_SEQUENCE')}:${getBalloonContentSequenceText(orderId, PICKUP)}</b>
                  </div>`,
              ],
            },
            shopLocation: [location.lat, location.lon],
            key: `orderShop_${index}`,
          });
        }
      });
    }
    if (courierReturnTasks?.length > 0) {
      courierReturnTasks.forEach(batchedReturn => {
        const isMatched = batchedReturn.returnId === returnId;
        if (batchedReturn.type === DELIVERY) {
          shopPlacemark.push({
            options: {
              iconLayout: 'default#image',
              iconImageHref: isMatched ? returnShopMarker : inactiveReturnShopMarker,
              iconImageSize: isMatched ? activeIconImageSize : inactiveIconImageSize,
              iconImageOffset: activeReturnIconImageOffset,
            },
            shopLocation: [batchedReturn.location.lat, batchedReturn.location.lon],
            key: `returnShop_${batchedReturn.batchIndex}`,
          });
        }
      });
    }
    return shopPlacemark;
  }, [courierOrderTasks, courierReturnTasks, shop, shopLoc, orderDetailId, t, getBalloonContentSequenceText, returnId]);

  const getAllLocations = useMemo(() => {
    const allLocations = [];
    if (shopPlacemarkObject.length > 0) {
      shopPlacemarkObject.forEach(placemark => {
        allLocations.push(placemark.shopLocation);
      });
    }
    if (clientPlacemarkObject.length > 0) {
      clientPlacemarkObject.forEach(placemark => {
        allLocations.push(placemark.deliveryLocation);
      });
    }

    return allLocations;
  }, [clientPlacemarkObject, shopPlacemarkObject]);

  const calculateBounds = useMemo(() => {
    const min = [];
    const max = [];

    getAllLocations.forEach(([lat, lon]) => {
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
  }, [getAllLocations]);

  const getCenterAndZoom = useMemo(() => {
    if (mapRef.current && yMaps) {
      const containerSize = mapRef.current.container.getSize();
      return yMaps.util.bounds.getCenterAndZoom(
        calculateBounds,
        containerSize,
        null,
      );
    }
    return {};
  }, [calculateBounds, yMaps]);

  useEffect(() => {
    if (returnCourier?.lat && returnCourier?.lon) {
      setCourierPlacemark([returnCourier?.lat, returnCourier?.lon]);
    }
    else if (isOrderCanShuffle && !isEmpty(artisanCourier)) {
      setCourierPlacemark([artisanCourier?.lat, artisanCourier?.lon]);
    }
    else if (courier?.lat && courier?.lon) {
      setCourierPlacemark([courier?.lat, courier?.lon]);
    }
  }, [courier, isOrderCanShuffle, artisanCourier, orderDetailId, returnCourier, returnId, shopLoc]);

  useEffect(() => {
    if (yMaps && mapRef.current && shopLoc && deliveryAddress) {
      mapRef.current.setCenter(getCenterAndZoom.center, getCenterAndZoom.zoom);
    }
  }, [deliveryAddress, getCenterAndZoom, shopLoc, yMaps]);

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
          ...defaultState,
          center: getCenterAndZoom.center || defaultLocation,
        }}
        instanceRef={ref => {
          mapRef.current = ref;
        }}
        onLoad={setMapObject}
        modules={['geoObject.addon.balloon']}
      >
        <TrafficControl />
        {polylines}
        { courierPlacemark && (
          <Placemark
            geometry={courierPlacemark}
            options={{
              iconLayout: 'default#image',
              iconImageHref: courierMarker,
              iconImageSize: activeIconImageSize,
              iconImageOffset: activeIconImageOffset,
            }}
          />
        )}
        {clientPlacemarkObject.length > 0 &&
          clientPlacemarkObject.map(placemark => (
            <Placemark
              key={placemark?.key}
              geometry={placemark?.deliveryLocation}
              options={placemark?.options}
              properties={placemark?.properties}
            />
          ))}
        {shopPlacemarkObject.length > 0 &&
          shopPlacemarkObject.map(placemark => (
            <Placemark
              key={placemark?.key}
              geometry={placemark?.shopLocation}
              options={placemark?.options}
              properties={placemark?.properties}
            />
          ))}
      </YMap>
    </YMaps>
  );
};

export default OrderDetailMap;
