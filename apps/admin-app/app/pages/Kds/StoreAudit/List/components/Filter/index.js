import { useState } from 'react';
import { Row, Col, Typography, Collapse, Space, DatePicker, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import SelectCity from '@shared/containers/Select/City';
import SelectWarehouseType from '@shared/components/Select/WarehouseType';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectQualityDepartmentPeople from '@shared/containers/Select/QualityDepartmentPeople';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import SelectAuditFormType from '@app/pages/Kds/components/SelectAuditFormType';

import { getLocalDateFormat } from '@shared/utils/localization';
import useStyles from './styles';
import { SelectWrapper } from '@shared/components/UI/Form';
import { convertConstantValuesToSelectOptions } from '@app/pages/Kds/utils';
import { ResponsibleDomainTypesEnum, StoreAuditStatuses } from '@app/pages/Kds/constant';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const Filter = ({ filters, handleSubmit, isPending }) => {
  const { t } = useTranslation('storeAuditPage');
  const classes = useStyles();

  const selectedCountry = getSelectedCountry();
  const countryCode = get(selectedCountry, 'code.alpha2', '');

  const [auditDate, setAuditDate] = useState(filters.auditDate);
  const [completionDate, setCompletionDate] = useState(filters.completionDate);
  const [sentToFranchiseDate, setSentToFranchiseDate] = useState(filters.sentToFranchiseDate);
  const [franchiseIds, setFranchiseIds] = useState(filters.franchiseIds);
  const [warehouseIds, setWarehouseIds] = useState(filters.warehouseIds);
  const [auditorIds, setAuditorIds] = useState(filters.auditorIds);
  const [domainTypes, setDomainTypes] = useState(filters.domainTypes);
  const [statuses, setStatuses] = useState(filters.statuses);
  const [warehouseTypes, setWarehouseTypes] = useState(filters.warehouseTypes);
  const [cities, setCities] = useState(filters.cities);
  const [auditFormTypes, setAuditFormTypes] = useState(filters.auditFormTypes);

  const handleSubmitClick = () => {
    handleSubmit({
      auditDate,
      completionDate,
      sentToFranchiseDate,
      warehouseIds,
      franchiseIds,
      auditorIds,
      domainTypes,
      statuses,
      warehouseTypes,
      cities,
      auditFormTypes,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col sm={24} md={12}>
                  <Text>{t('LIST.AUDIT_DATE')}</Text>
                  <RangePicker
                    value={auditDate}
                    className={classes.rangePicker}
                    onChange={value => setAuditDate(value)}
                    format={getLocalDateFormat()}
                    allowClear
                    disabled={isPending}
                  />
                </Col>
                <Col sm={24} md={12}>
                  <Text>{t('LIST.COMPLETION_DATE')}</Text>
                  <RangePicker
                    className={classes.rangePicker}
                    onChange={value => setCompletionDate(value)}
                    format={getLocalDateFormat()}
                    allowClear
                    disabled={isPending}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col sm={24} md={12}>
                  <Text>{t('LIST.SENT_TO_FRANCHISE_DATE')}</Text>
                  <RangePicker
                    className={classes.rangePicker}
                    onChange={value => setSentToFranchiseDate(value)}
                    format={getLocalDateFormat()}
                    allowClear
                    disabled={isPending}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('LIST.AUDITOR')}</Text>
                  <SelectQualityDepartmentPeople
                    placeholder={t('FILTER')}
                    onChange={value => setAuditorIds(value && [value])}
                    allowClear
                    disabled={isPending}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('FRANCHISE')}</Text>
                  <SelectFranchise
                    isMultiple
                    placeholder={t('FILTER')}
                    onChange={value => setFranchiseIds(value)}
                    showArrow={false}
                    disabled={isPending}
                  />
                </Col>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('WAREHOUSE')}</Text>
                  <SelectWarehouse
                    isMultiple
                    isDisabled={isPending}
                    onChange={value => setWarehouseIds(value)}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('WAREHOUSE_TYPE')}</Text>
                  <SelectWarehouseType
                    className={classes.selectWrapper}
                    onChange={values => setWarehouseTypes(values)}
                    mode="multiple"
                    isDisabled={isPending}
                  />
                </Col>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('DOMAIN_TYPE')}</Text>
                  <SelectWrapper
                    placeholder={t('FILTER')}
                    className={classes.selectWrapper}
                    selectKey="domainType"
                    mode="multiple"
                    shouldMapOptionsData
                    onChangeCallback={value => setDomainTypes(value)}
                    optionsData={convertConstantValuesToSelectOptions(ResponsibleDomainTypesEnum, countryCode)}
                    disabled={isPending}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('STATUS')}</Text>
                  <SelectWrapper
                    placeholder={t('FILTER')}
                    className={classes.selectWrapper}
                    selectKey="status"
                    optionsData={convertConstantValuesToSelectOptions(StoreAuditStatuses)}
                    shouldMapOptionsData
                    onChangeCallback={value => setStatuses(value)}
                    mode="multiple"
                    disabled={isPending}
                  />
                </Col>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('CITY')}</Text>
                  <SelectCity
                    value={cities}
                    onChange={value => setCities(value)}
                    mode="multiple"
                    showArrow={false}
                    isDisabled={isPending}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={12} sm={24} md={12}>
                  <Text>{t('LIST.AUDIT_FORM_TYPE')}</Text>
                  <SelectAuditFormType
                    isMultiple
                    onChangeCallback={value => setAuditFormTypes(value)}
                    disabled={isPending}
                  />
                </Col>
              </Row>
              <Row className={classes.submitButtonContainer}>
                <Button
                  type="primary"
                  onClick={handleSubmitClick}
                  disabled={isPending}
                >
                  {t('BRING')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
