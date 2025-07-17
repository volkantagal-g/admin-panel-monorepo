import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography, Button,
  Select,
  Form,
} from 'antd';

import { useTranslation } from 'react-i18next';

import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectFranchise from '@shared/containers/Select/Franchise';
import Cities from '@shared/containers/Select/City';

import useStyles from './styles';
import { marketVehicleTags, vehicleStatus } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { vehicleListSelector } from '@app/pages/Fleet/Vehicle/List/redux/selector';
import { getVehicleTypeOptions } from '../../utils';
import SelectWarehouseType from '@shared/components/Select/WarehouseType';
import SelectDomainType from '@shared/containers/Select/DomainType';

const { Panel } = Collapse;
const { Text } = Typography;

function Filter({ handleSubmit }) {
  const [selectedWarehouseTypes, setSelectedWarehouseTypes] = useState([]);
  const [selectedDomainTypes, setSelectedDomainTypes] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation(['marketVehicle']);
  const vehicleStatusSelectOptions = convertConstantValuesToSelectOptions(vehicleStatus);
  const tagOptions = convertConstantValuesToSelectOptions(marketVehicleTags, false);
  const vehicleType = useSelector(vehicleListSelector?.getVehicleTypeData);
  const isPending = useSelector(vehicleListSelector?.getIsPending);
  const vehicleTypeOptions = getVehicleTypeOptions(vehicleType?.vehicleConstraints);

  const [form] = Form.useForm();

  const handleWarehouseTypeChange = type => {
    setSelectedWarehouseTypes(type);
  };

  const handleFormSubmission = () => {
    handleSubmit({
      warehouseIds: form.getFieldValue('selectedWarehouse'),
      franchiseIds: form.getFieldValue('selectedFranchise'),
      statuses: form.getFieldValue('selectedStatuses'),
      plate: form.getFieldValue('plate'),
      vehicleConstraintId: form.getFieldValue('selectedVehicleConstraintId'),
      cities: form.getFieldValue('selectedCities'),
      tag: form.getFieldValue('selectedTag'),
    });
  };

  const ref = useRef();

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const { activeElement } = document;
      const isDropdownOpen = activeElement.closest('.ant-select-single, .ant-select-open, .ant-dropdown-open');
      if (!isDropdownOpen) {
        ref.current.submit();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Form ref={ref} form={form} onFinish={handleFormSubmission}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header={t('marketVehicle:MARKET_VECHILE_FILTER')} key="1">
              <Space direction="vertical" className={classes.filterWrapper}>
                <Row gutter={[8, 8]}>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:DOMAIN_TYPES')}</Text>
                    <Form.Item className={classes.formItem}>
                      <SelectDomainType
                        mode="multiple"
                        value={selectedDomainTypes}
                        onChange={setSelectedDomainTypes}
                        showArrow
                        className={classes.domainTypeSelect}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:WAREHOUSE_TYPES')}</Text>
                    <Form.Item className={classes.formItem}>
                      <SelectWarehouseType
                        value={selectedWarehouseTypes}
                        mode="multiple"
                        showArrow
                        onChange={handleWarehouseTypeChange}
                        className={classes.selectWarehouseType}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:WAREHOUSE')}</Text>
                    <Form.Item className={classes.formItem} name="selectedWarehouse">
                      <SelectWarehouse
                        warehouseTypes={selectedWarehouseTypes}
                        domainTypes={selectedDomainTypes}
                        isFilteredByWarehouseTypes
                        isMultiple
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:FRANCHISE')}</Text>
                    <Form.Item className={classes.formItem} name="selectedFranchise">
                      <SelectFranchise
                        isMultiple
                        datatestid="franchiseMarketVehicle"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:PLATE_ENGINE_NUMBER')}</Text>
                    <Form.Item
                      className={classes.formItem}
                      name="plate"
                    >
                      <Input
                        data-testid="plateVehicleWarehouse"
                        placeholder={t('marketVehicle:PLATE_ENGINE_NUMBER')}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:VEHICLE_TYPE')}</Text>
                    <Form.Item
                      className={classes.formItem}
                      name="selectedVehicleConstraintId"
                    >
                      <Select
                        virtual={false}
                        data-testid="vehicleType"
                        showArrow
                        allowClear
                        options={vehicleTypeOptions}
                        placeholder={t('marketVehicle:SELECT_VEHICLE_TYPE')}
                        className={classes.wrapper}
                      />
                    </Form.Item>

                  </Col>
                </Row>
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:STATUS')}</Text>
                    <Form.Item
                      className={classes.formItem}
                      name="selectedStatuses"
                    >
                      <Select
                        data-testid="statusMarketVehicle"
                        showArrow
                        allowClear
                        options={vehicleStatusSelectOptions}
                        placeholder={t('marketVehicle:STATUS')}
                        className={classes.wrapper}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:CITY')}</Text>
                    <Form.Item
                      className={classes.formItem}
                      name="selectedCities"
                      value={form.getFieldValue('selectedCities')}
                    >
                      <Cities
                        mode="multiple"
                        showArrow
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={24} md={12}>
                    <Text>{t('marketVehicle:TAGS')}</Text>
                    <Form.Item
                      className={classes.formItem}
                      name="selectedTag"
                    >
                      <Select
                        showArrow
                        allowClear
                        options={tagOptions}
                        placeholder={t('marketVehicle:TAGS')}
                        className={classes.wrapper}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Col>
                  <div className={classes.submitButtonContainer}>
                    <Form.Item className={classes.formItem}>
                      <Button
                        data-testid="bringVehicle"
                        htmlType="submit"
                        size="medium"
                        loading={isPending}
                        variant="contained"
                        type="primary"
                      > {t('global:BRING')}
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Space>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
