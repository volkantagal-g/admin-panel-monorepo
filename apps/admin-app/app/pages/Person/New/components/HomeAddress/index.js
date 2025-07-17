import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { Placemark } from 'react-yandex-maps';

import { YandexMaps } from '@shared/components/YMaps/Map';
import { InputWrapper } from '@shared/components/UI/Form';
import { ANT_SPACING_24, DEFAULT_ROW_SPACING, HOME_ADDRESS_PLACEMARK_OPTIONS } from '../../constants';
import useStyles from './styles';

function HomeAddress({
  values = {},
  handleChange = () => null,
  setFieldValue = () => null,
  errors = {},
  touched = {},
  isPending = false,
}) {
  const classes = useStyles();
  const { t } = useTranslation('personPage');

  const handleDragEnd = param => {
    const [lat, lon] = get(param, 'originalEvent.target.geometry._coordinates', []);
    const coordinates = [lon, lat];
    setFieldValue('homeAddress.location.coordinates', coordinates);
    return false;
  };

  return (
    <Card title={t('HOME_ADDRESS.TITLE')}>
      <Row className={classes.mapWrapper}>
        <YandexMaps
          isShowSearchControl
          state={{ center: values.homeAddress.mapOptions.center, zoom: values.homeAddress.mapOptions.zoom }}
        >
          <Placemark
            geometry={values.homeAddress.mapOptions.center}
            options={HOME_ADDRESS_PLACEMARK_OPTIONS}
            onDragEnd={handleDragEnd}
          />
        </YandexMaps>
      </Row>
      <Row gutter={DEFAULT_ROW_SPACING} align="bottom" className={classes.marginTop}>
        <Col span={ANT_SPACING_24}>
          <InputWrapper
            inputKey="homeAddress.description"
            label={t('HOME_ADDRESS.DESCRIPTION')}
            value={values.homeAddress.description}
            hasError={get(errors, 'homeAddress.description')}
            isTouched={get(touched, 'homeAddress.description')}
            handleChange={handleChange}
            mode="textarea"
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default HomeAddress;
