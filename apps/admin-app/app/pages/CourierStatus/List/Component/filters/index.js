import { Row, Col, Collapse, Typography, Button, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { alphabeticallySortByParam, convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { courierStatuses } from '@shared/shared/constantValues';
import WarehouseSelect from '@shared/containers/Select/Warehouse';
import { ALL_BUSY_OPTIONS, ALL_DOMAIN_OPTIONS, DEFAULT_ACTIVE_KEY } from '@app/pages/CourierStatus/List/constants';

const Filter = ({ filters, handleSubmit, isPending }) => {
  const { t } = useTranslation('courierStatusAndBusy', 'global');
  const [domains, setDomains] = useState(filters.domain || '');
  const [warehouse, setWarehouse] = useState();
  const [reason, setReason] = useState();
  const [status, setStatus] = useState();

  const handleDomains = values => {
    setDomains(values);
  };

  const handleWarehouse = value => {
    setWarehouse(value);
  };

  const handleReasonChange = value => {
    setReason(value);
  };

  const handleStatusChange = value => {
    setStatus(value);
  };

  const handleFilterButtonClick = () => {
    handleSubmit({ domains, warehouse, reason, status });
  };

  return (
    <Collapse defaultActiveKey={DEFAULT_ACTIVE_KEY}>
      <Collapse.Panel header={t('global:FILTER')} key={DEFAULT_ACTIVE_KEY}>
        <Row gutter={[24, 12]}>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('DOMAIN')}</Typography.Text>
            <Select
              className="w-100"
              mode="multiple"
              fieldName="domainType"
              options={alphabeticallySortByParam(ALL_DOMAIN_OPTIONS(t))}
              onChange={handleDomains}
              label=""
            />
          </Col>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('STATUS')}</Typography.Text>
            <Select
              className="w-100"
              onChange={handleStatusChange}
              disabled={isPending}
              options={convertConstantValuesToSelectOptions(courierStatuses)}
              allowClear
            />
          </Col>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('WAREHOUSE')}</Typography.Text>
            <WarehouseSelect
              isMultiple
              onChange={handleWarehouse}
            />
          </Col>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('BUSY_REASON')}</Typography.Text>
            <Select
              className="w-100"
              onChange={handleReasonChange}
              disabled={isPending}
              options={alphabeticallySortByParam(ALL_BUSY_OPTIONS(t))}
              allowClear
            />
          </Col>
        </Row>
        <Row justify="end" className="mt-2">
          <Button
            htmlType="button"
            disabled={isPending}
            onClick={handleFilterButtonClick}
            type="primary"
          >{t('BRING')}
          </Button>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Filter;
