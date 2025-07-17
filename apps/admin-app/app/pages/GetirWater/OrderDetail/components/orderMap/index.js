import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { ENVIRONMENT } from '@shared/config';
import shopMarker from '@shared/assets/markers/shop.png';
import clientAddressMarker from '@shared/assets/markers/marker_home.png';

import { orderDetailSelector } from '../../redux/selectors';

import useStyles from './styles';

const OrderMap = () => {
  const mapRef = useRef();
  const classes = useStyles();
  const { t } = useTranslation('waterOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData) || {};

  const vendorLat = _.get(orderDetail, 'vendorLat', 0);
  const vendorLong = _.get(orderDetail, 'vendorLong', 0);

  const deliveryLat = _.get(orderDetail, 'deliveryLat', 0);
  const deliveryLong = _.get(orderDetail, 'deliveryLong', 0);

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
              state={{ center: [vendorLat, vendorLong], zoom: 11 }}
              instanceRef={ref => {
                mapRef.current = ref;
              }}
            >
              <Placemark
                geometry={[deliveryLat, deliveryLong]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: clientAddressMarker,
                  iconImageSize: [71, 74],
                  iconImageOffset: [-29, -58],
                  draggable: false,
                }}
              />
              <Placemark
                geometry={[vendorLat, vendorLong]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: shopMarker,
                  iconImageSize: [58, 58],
                  iconImageOffset: [-29, -58],
                }}
              />
            </Map>
          </YMaps>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default OrderMap;
