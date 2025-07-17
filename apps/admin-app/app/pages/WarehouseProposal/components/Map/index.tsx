import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Placemark } from 'react-yandex-maps';

import { get } from 'lodash';

import { DEFAULT_MAP_COORDINATES, DEFAULT_MAP_ZOOM } from '@shared/shared/constants';

import AntCard from '@shared/components/UI/AntCard';
import { YandexMaps } from '@shared/components/YMaps/Map';
import useStyles from './styles';

interface Location {
  coordinates: [number, number];
}

interface GetDefaultMapStateProps {
  location: Location | null;
}

interface MapState {
  center: [number, number];
  zoom: number;
  controls: string[];
}

export const getDefaultMapState = ({ location }: GetDefaultMapStateProps): MapState => {
  const tempCoordinates = get(location, 'coordinates', DEFAULT_MAP_COORDINATES);
  return {
    center: [tempCoordinates[1], tempCoordinates[0]],
    zoom: DEFAULT_MAP_ZOOM,
    controls: [],
  };
};

interface MapProps {
  data: Location | null;
  handleChange: (field: string, value: string | boolean | number) => void;
  isDisabled: boolean;
}

const Map: React.FC<MapProps> = ({ data: propertyLocation, handleChange, isDisabled }) => {
  const classes = useStyles();
  const { t } = useTranslation('warehouseProposalPage');

  const [defaultMapState, setDefaultMapState] = useState<MapState>(getDefaultMapState({ location: propertyLocation }));

  useEffect(() => {
    setDefaultMapState(getDefaultMapState({ location: propertyLocation }));
  }, [propertyLocation]);

  const handleDragEnd = (param: { originalEvent: { target: { geometry: { _coordinates: number[] } } } }) => {
    const [lat, lon] = get(param, 'originalEvent.target.geometry._coordinates', []);
    handleChange('location.lat', lat);
    handleChange('location.lon', lon);
  };

  return (
    <AntCard
      bordered={false}
      title={t('PROPERTY_LOCATION')}
    >
      <Row gutter={[4, 4]} className={classes.mapContainer}>
        <Col lg={24} xs={24}>
          <YandexMaps
            state={defaultMapState}
          >
            <Placemark
              geometry={defaultMapState.center}
              options={{ draggable: !isDisabled }}
              onDragEnd={handleDragEnd}
            />
          </YandexMaps>
        </Col>
      </Row>
    </AntCard>
  );
};

export default Map;
