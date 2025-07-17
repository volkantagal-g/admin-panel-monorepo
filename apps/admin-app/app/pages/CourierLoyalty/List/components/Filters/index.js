import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography, Button,
  Select,
  DatePicker,
} from 'antd';

import { useTranslation } from 'react-i18next';

import SelectCity from '@shared/containers/Select/City/index';

import { loyaltyLevelOptions, performanceClassOptions } from '@app/pages/CourierLoyalty/List/constants';
import SelectWarehouse from '@shared/containers/Select/Warehouse';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import useStyles from './styles';
import { getDates } from '../../utils';

const { Panel } = Collapse;
const { Text } = Typography;
const { RangePicker } = DatePicker;

function Filter({ handleSubmit }) {
  const [courierID, setCourierID] = useState(null);
  const [levelGroup, setLevelGroup] = useState(null);
  const [performanceGroup, setPerformanceGroup] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedCityId, setSelectedCity] = useState();

  const classes = useStyles();
  const { t } = useTranslation(['courierLoyalty']);

  const handleCourierId = event => {
    setCourierID(event.target.value);
  };

  const submitButtonClick = () => {
    const { startDate, endDate } = getDates(dateRange);
    handleSubmit({
      courierId: courierID,
      levelGroup,
      performanceGroup,
      warehouseId: selectedWarehouse,
      cityId: selectedCityId,
      startDate,
      endDate,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('courierLoyalty:LOYALTY_FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierLoyalty:COURIER_ID')}</Text>
                  <Input
                    data-testid="courierID"
                    value={courierID}
                    onChange={handleCourierId}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierLoyalty:PERFORMANCE_CLASS')}</Text>
                  <Select
                    className="w-100"
                    data-testid="performanceClass"
                    showArrow
                    allowClear
                    options={convertConstantValuesToSelectOptions(performanceClassOptions(t))}
                    placeholder={t('courierLoyalty:PERFORMANCE_CLASS')}
                    onChange={setPerformanceGroup}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierLoyalty:LOYALTY_LEVEL')}</Text>
                  <Select
                    className="w-100"
                    data-testid="loyaltyLevel"
                    showArrow
                    allowClear
                    options={convertConstantValuesToSelectOptions(loyaltyLevelOptions(t))}
                    placeholder={t('courierLoyalty:LOYALTY_LEVEL')}
                    onChange={setLevelGroup}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierLoyalty:DATE_RANGE')}</Text>
                  <RangePicker
                    className="w-100"
                    onChange={setDateRange}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierLoyalty:CITY')}</Text>
                  <SelectCity
                    allowClear
                    mode="single"
                    value={selectedCityId}
                    onChange={setSelectedCity}
                    showArrow={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierLoyalty:WAREHOUSE')}</Text>
                  <SelectWarehouse
                    onChange={setSelectedWarehouse}
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
