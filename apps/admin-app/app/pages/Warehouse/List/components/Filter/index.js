import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography, Button,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import SelectWarehouseType from '@shared/components/Select/WarehouseType';
import SelectWarehouseState from '@shared/components/Select/WarehouseState';
import SelectCity from '@shared/containers/Select/City';
import SelectDomainType from '@shared/containers/Select/DomainType';

import useStyles from './styles';
import SelectWarehouseStatus from '@shared/components/Select/WarehouseStatus';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES } from '@shared/shared/constantValues';

const { Text } = Typography;
const { Panel } = Collapse;

function Filter({ filters, handleSubmit, isPending }) {
  const [selectedDomainTypes, setSelectedDomainTypes] = useState(filters.domainTypes);
  const [selectedCities, setSelectedCities] = useState(filters.cities);
  const [selectedWarehouseStatus, setSelectedWarehouseStatus] = useState(filters.statuses);
  const [selectedWarehouseState, setSelectedWarehouseState] = useState(filters.states);
  const [selectedWarehouseTypes, setSelectedWarehouseTypes] = useState(filters.warehouseTypes);
  const [name, setName] = useState(filters.name);
  const [SAPReferenceCodes, setSAPReferenceCodes] = useState(filters.SAPReferenceCodes);

  const { t } = useTranslation(['global', 'warehousePage']);

  const classes = useStyles();

  const countryCode = useSelector(getSelectedCountryV2)?.code?.alpha2;

  const handleDomainTypeChange = domainTypes => {
    setSelectedDomainTypes(domainTypes);
  };

  const handleCityChange = cities => {
    setSelectedCities(cities);
  };

  const handleWarehouseStateChange = state => {
    setSelectedWarehouseState(state);
  };

  const handleWarehouseStatusChange = status => {
    setSelectedWarehouseStatus(status);
  };

  const handleWarehouseTypeChange = type => {
    setSelectedWarehouseTypes(type);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleSAPReferenceCodesChange = event => {
    if (event.target.value) {
      setSAPReferenceCodes([event.target.value]);
    }
    else {
      setSAPReferenceCodes([]);
    }
  };

  const submitButtonClick = () => {
    handleSubmit({
      domainTypes: selectedDomainTypes,
      cities: selectedCities,
      states: selectedWarehouseState,
      statuses: selectedWarehouseStatus,
      warehouseTypes: selectedWarehouseTypes,
      name,
      SAPReferenceCodes,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('DOMAIN_TYPE')}</Text>
                  <SelectDomainType
                    mode="multiple"
                    value={selectedDomainTypes}
                    isDisabled={isPending}
                    onChange={handleDomainTypeChange}
                    showArrow={false}
                    className={classes.domainTypeSelect}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('CITY')}</Text>
                  <SelectCity
                    mode="multiple"
                    values={selectedCities}
                    onChange={handleCityChange}
                    showArrow={false}
                    isDisabled={isPending}
                    className={classes.selection}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('ACTIVENESS')}</Text>
                  <SelectWarehouseState
                    mode="multiple"
                    value={selectedWarehouseState}
                    onChange={handleWarehouseStateChange}
                    showArrow={false}
                    isDisabled={isPending}
                    className={classes.selection}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('STATUS')}</Text>
                  <SelectWarehouseStatus
                    value={selectedWarehouseStatus}
                    onChange={handleWarehouseStatusChange}
                    mode="multiple"
                    placeholder={t('STATUS')}
                    showArrow={false}
                    isClearable
                    isDisabled={isPending}
                    className={classes.selection}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('warehousePage:WAREHOUSE_TYPE')}</Text>
                  <SelectWarehouseType
                    value={selectedWarehouseTypes}
                    mode="multiple"
                    showArrow={false}
                    isDisabled={isPending}
                    onChange={handleWarehouseTypeChange}
                    className={classes.selectWarehouseType}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('NAME')}</Text>
                  <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder={t('NAME')}
                    disabled={isPending}
                  />
                </Col>
              </Row>
              {SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES.includes(countryCode) && (
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('warehousePage:SAP_REFERENCE_CODE')}</Text>
                  <Input
                    value={SAPReferenceCodes}
                    onChange={handleSAPReferenceCodesChange}
                    placeholder={t('warehousePage:SAP_REFERENCE_CODE')}
                    disabled={isPending}
                  />
                </Col>
              </Row>
              )}
              <Col>
                <div className={classes.submitButtonContainer}>
                  <Button
                    size="medium"
                    variant="contained"
                    type="primary"
                    disabled={isPending}
                    onClick={submitButtonClick}
                  > {t('BRING')}
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
