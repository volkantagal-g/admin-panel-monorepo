import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';

import AntCard from '@shared/components/UI/AntCard';
import { YandexMaps } from '@shared/components/YMaps/Map';
import { getDefaultMapState } from '../../utils';
import { COURIER_LOCATION_PLACEMARK_OPTIONS } from '../../constants';
import useStyles from './styles';

const Map = ({ data: courierLocation, isPending }) => {
  const classes = useStyles();
  const { t } = useTranslation('courierPage');

  const [defaultMapState, setDefaultMapState] = useState(getDefaultMapState({ location: courierLocation }));

  useEffect(() => {
    setDefaultMapState(getDefaultMapState({ location: courierLocation }));
  }, [courierLocation]);

  return (
    <AntCard
      bordered={false}
      title={t('COURIER_LOCATION')}
    >
      <Row gutter={[4, 4]} className={classes.mapContainer}>
        <Col lg={24} xs={24}>
          <YandexMaps
            state={defaultMapState}
          >
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

Map.defaultProps = {
  data: {},
  isPending: false,
};

Map.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    acc: PropTypes.number,
    isLoggedIn: PropTypes.instanceOf(Date),
  }),
  isPending: PropTypes.bool,
};

export default Map;
