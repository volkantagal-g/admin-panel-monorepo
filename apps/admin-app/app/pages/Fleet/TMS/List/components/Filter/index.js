import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography, Button,
  Select,
} from 'antd';

import { useTranslation } from 'react-i18next';

import { convertedActivenessOptions } from '@app/pages/Courier/List/utils';

import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;

function Filter({ handleSubmit }) {
  const [palletCapacity, setPalletCapacity] = useState(null);
  const [volumeCapacity, setVolumeCapacity] = useState(null);
  const [plate, setPlate] = useState('');
  const [dincerId, setDincerId] = useState(null);
  const [activeness, setActiveness] = useState();
  const [vehicleClass, setVehicleClass] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const classes = useStyles();
  const { t } = useTranslation(['marketVehicle', 'tmsPage']);

  const handlePlateChange = event => {
    setPlate(event.target.value);
  };

  const handleVolumeCapacity = event => {
    setVolumeCapacity(event.target.value);
  };

  const handlePalletCapacity = event => {
    setPalletCapacity(event.target.value);
  };

  const handleDincerId = event => {
    setDincerId(event.target.value);
  };

  const handleActivenessChange = value => {
    setActiveness(value);
  };

  const handleVehicleClassChange = event => {
    setVehicleClass(event.target.value);
  };

  const handleVehicleTypeChange = event => {
    setVehicleType(event.target.value);
  };

  const submitButtonClick = () => {
    handleSubmit({ plate, dincerId, palletCapacity, volumeCapacity, activeness, vehicleType, vehicleClass });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('marketVehicle:MARKET_VECHILE_FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('marketVehicle:PLATE')}</Text>
                  <Input
                    value={plate}
                    onChange={handlePlateChange}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('marketVehicle:DINCERID')}</Text>
                  <Input
                    value={dincerId}
                    onChange={handleDincerId}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col xs={24} lg={12}>
                  <Typography.Text>{t('ACTIVENESS')}</Typography.Text>
                  <Select
                    className="w-100"
                    value={activeness}
                    onChange={handleActivenessChange}
                    options={convertedActivenessOptions}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('marketVehicle:VEHICLE_TYPE')}</Text>
                  <Input
                    value={vehicleType}
                    onChange={handleVehicleTypeChange}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('tmsPage:VEHICLE_CLASS')}</Text>
                  <Input
                    value={vehicleClass}
                    onChange={handleVehicleClassChange}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('marketVehicle:PALLET_CAPACITY')}</Text>
                  <Input
                    type="number"
                    min={0}
                    value={palletCapacity}
                    onChange={handlePalletCapacity}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('marketVehicle:VOLUME_CAPACITY')}</Text>
                  <Input
                    type="number"
                    min={0}
                    value={volumeCapacity}
                    onChange={handleVolumeCapacity}
                  />
                </Col>
              </Row>
              <Col>
                <div className={classes.submitButtonContainer}>
                  <Button
                    data-testid="bringVehicle"
                    size="medium"
                    variant="contained"
                    type="primary"
                    onClick={submitButtonClick}
                  > {t('global:BRING')}
                  </Button>
                </div>
              </Col>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export default Filter;
