import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Placemark, YMaps, TrafficControl } from 'react-yandex-maps';
import { useSelector } from 'react-redux';

import { ENVIRONMENT } from '@shared/config';
import ErrorBoundary from '@shared/shared/ErrorBoundary';
import restaurantMarker from '@shared/assets/markers/marker_restaurant.png';
import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import { getFoodOrderClientIcon } from './mapMarkers';
import { getFoodOrderMarkerOptions } from './util';
import useStyles from './styles';

const OrderMap = () => {
  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { restaurant, deliveryAddress, status: orderStatus = '' } = orderDetail;

  const [clientPlacemark, setClientPlacemark] = useState(null);
  const [restaurantPlacemark, setRestaurantPlacemark] = useState(null);
  const [defaultMapState, setDefaultMapState] = useState({
    center: [41, 29],
    zoom: 13,
  });

  const restaurantMarkerOptions = getFoodOrderMarkerOptions(restaurantMarker);
  const clientMarkerOptions = useMemo(() => getFoodOrderMarkerOptions(getFoodOrderClientIcon(orderStatus)), [orderStatus]);

  useEffect(() => {
    if (restaurant?.location?.lat && restaurant?.location?.lon) {
      setRestaurantPlacemark([
        restaurant?.location?.lat,
        restaurant?.location?.lon,
      ]);
    }
  }, [restaurant, setRestaurantPlacemark]);

  useEffect(() => {
    if (deliveryAddress?.location?.coordinates?.length) {
      setClientPlacemark([
        deliveryAddress?.location?.coordinates[1],
        deliveryAddress?.location?.coordinates[0],
      ]);
      setDefaultMapState(state => ({
        ...state,
        center: [
          deliveryAddress?.location?.coordinates[1],
          deliveryAddress?.location?.coordinates[0],
        ],
      }));
    }
  }, [setClientPlacemark, deliveryAddress]);

  return (
    <>
      <div className={classes.titleContent}>
        <b className={classes.mapTitle}>{t('MAP')}</b>
      </div>
      <div className={classes.mapWrapper} data-testid="basket-minimap">
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
            >
              <TrafficControl />
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
