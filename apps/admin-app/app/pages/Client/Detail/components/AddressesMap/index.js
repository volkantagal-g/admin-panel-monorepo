import { memo, useRef, useState, useMemo } from 'react';
import { Button, Col, Collapse, Divider, Modal, Row, Spin } from 'antd';
import { Map, Placemark, YMaps, TrafficControl } from 'react-yandex-maps';

import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { ENVIRONMENT } from '@shared/config';
import clientAddressMarker from '@shared/assets/markers/marker_home.png';
import downloadMarker from '@shared/assets/markers/marker_download.png';
import { DEFAULT_MAP_COORDINATES_REVERSED, DEFAULT_MAP_ZOOM } from '@shared/shared/constants';

import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_ADDRESS_MAP_COMPONENT_COLLAPSE_';

const getReversedPointCoordinates = oldCoordinates => {
  return [oldCoordinates?.[1], oldCoordinates?.[0]];
};

const AddressesMap = ({ t, client = {} }) => {
  const mapRef = useRef();
  const classes = useStyles();
  const [listModalVisible, setListModalVisible] = useState(false);

  const {
    addressList = [],
    location,
    firstLocation,
  } = client;

  const firstAddress = addressList?.[0];

  const defaultState = useMemo(() => {
    const hasFirstAddressLocation = !!firstAddress?.location?.coordinates?.[1];
    const hasClientLocation = !!location?.coordinates?.[1];
    let center = DEFAULT_MAP_COORDINATES_REVERSED;
    if (hasFirstAddressLocation) {
      center = getReversedPointCoordinates(firstAddress.location.coordinates);
    }
    else if (hasClientLocation) {
      center = getReversedPointCoordinates(location.coordinates);
    }
    return {
      center,
      zoom: DEFAULT_MAP_ZOOM,
    };
  }, [firstAddress, location]);

  const showListModal = () => setListModalVisible(true);
  const closeListModal = () => setListModalVisible(false);

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t('global:ADDRESS')}
        key={`${COLLAPSE_KEY_PREFIX}2`}
        extra={<Button size="small" onClick={showListModal}>{t('LIST')}</Button>}
      >
        <Spin spinning={!location}>
          <ErrorBoundary>
            <YMaps
              query={{
                lang: 'tr_TR',
                apikey: ENVIRONMENT.YANDEX_JS_KEY,
              }}
            >
              <Map
                width="100%"
                height="300px"
                state={defaultState}
                instanceRef={ref => {
                  mapRef.current = ref;
                }}
                modules={['ObjectManager', 'package.full']}
              >
                <TrafficControl />
                {addressList?.map(address => (
                  <Placemark
                    key={address?._id}
                    geometry={getReversedPointCoordinates(address?.location?.coordinates)}
                    properties={{
                      hintContent: address?.address,
                      balloonContentBody: address?.address,
                    }}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: clientAddressMarker,
                      iconImageSize: [58, 58],
                      iconImageOffset: [-29, -58],
                      openBalloonOnClick: true,
                      openHintOnHover: true,
                    }}
                  />
                ))}
                {
                  firstLocation?.coordinates?.[1] && (
                    <Placemark
                      key="CLIENT_FIRST_LOCATION_MARKER"
                      geometry={getReversedPointCoordinates(firstLocation.coordinates)}
                      properties={{
                        hintContent: t('FIRST_LOCATION'),
                        balloonContentBody: t('FIRST_LOCATION'),
                      }}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: downloadMarker,
                        iconImageSize: [58, 58],
                        iconImageOffset: [-29, -58],
                        openBalloonOnClick: true,
                        openHintOnHover: true,
                      }}
                    />
                  )
                }
              </Map>
            </YMaps>
          </ErrorBoundary>
        </Spin>
        <Modal visible={listModalVisible} onCancel={closeListModal} footer={false}>
          {addressList.map((address, idx) => {
            return (
              <>
                <Row>
                  <Col>
                    <strong>{address?.name}:&nbsp;</strong>
                    {address?.address}
                  </Col>
                </Row>

                {(idx !== addressList.length - 1) && (
                  <Divider className={classes.addressDivider} />
                )}
              </>
            );
          })}
        </Modal>
      </Panel>
    </Collapse>
  );
};

export default memo(AddressesMap);
