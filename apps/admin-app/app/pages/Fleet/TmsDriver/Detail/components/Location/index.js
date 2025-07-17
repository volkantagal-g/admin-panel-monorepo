import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Placemark } from 'react-yandex-maps';
import { Row, Col } from 'antd';

import useStyles from '@app/pages/Fleet/TmsDriver/Detail/components/Location/styles';

import AntCard from '@shared/components/UI/AntCard';
import { YandexMaps } from '@shared/components/YMaps/Map';
import { getDefaultMapState } from '@app/pages/Courier/Detail/utils';
import { COURIER_LOCATION_PLACEMARK_OPTIONS } from '@app/pages/Courier/Detail/constants';

const DriverLocation = ({ location, isPending }) => {
  const { t } = useTranslation('courierPage');
  const classes = useStyles();

  const [defaultMapState, setDefaultMapState] = useState(getDefaultMapState({ location }));

  useEffect(() => {
    setDefaultMapState(getDefaultMapState({ location }));
  }, [location]);

  return (
    <AntCard title={t('COURIER_LOCATION')} data-testid="driver-location-card">
      <Row gutter={[12, 6]} className={classes.mapContainer}>
        <Col xs={24}>
          <YandexMaps state={defaultMapState} data-testid="driver-location-map">
            <Placemark
              geometry={defaultMapState.center}
              options={{
                ...COURIER_LOCATION_PLACEMARK_OPTIONS,
                draggable: !isPending,
              }}
            />
          </YandexMaps>
        </Col>
      </Row>
    </AntCard>
  );
};

export default DriverLocation;
