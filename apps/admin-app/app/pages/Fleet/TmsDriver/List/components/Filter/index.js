import { Row, Col, Collapse, Typography, Button, Select, Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  convertedCourierStatusOptions,
  convertedYesOrNoOptions,
  convertedActivenessOptions,
} from '@app/pages/Courier/List/utils';
import { DEFAULT_ACTIVE_KEY, LIST_PAGE_VALID_COURIER_STATUSES } from '@app/pages/Fleet/TmsDriver/List/constants';

const Filter = ({ filters, handleSubmit, isPending }) => {
  const { t } = useTranslation('courierPage');

  const [name, setName] = useState(filters.name);
  const [statuses, setStatuses] = useState(filters.statuses);
  const [isActivated, setIsActivated] = useState(filters.isActivated);
  const [isLoggedIn, setIsLoggedIn] = useState(filters.isLoggedIn);

  const handleStatusesChange = value => {
    setStatuses(value);
  };

  const handleActivenessChange = value => {
    setIsActivated(value);
  };

  const handleLoggedInChange = value => {
    setIsLoggedIn(value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleFilterButtonClick = () => {
    handleSubmit({ statuses, isActivated, isLoggedIn, name });
  };

  return (
    <Collapse defaultActiveKey={DEFAULT_ACTIVE_KEY}>
      <Collapse.Panel header={t('FILTER')} key={DEFAULT_ACTIVE_KEY}>
        <Row gutter={[24, 12]}>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('DRIVER_NAME')}</Typography.Text>
            <Input
              className="w-100"
              value={name}
              onChange={handleNameChange}
              disabled={isPending}
              allowClear
            />
          </Col>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('STATUS')}</Typography.Text>
            <Select
              className="w-100"
              mode="multiple"
              showSearch={false}
              value={statuses}
              onChange={handleStatusesChange}
              disabled={isPending}
              options={convertedCourierStatusOptions.filter(opt => LIST_PAGE_VALID_COURIER_STATUSES.includes(opt.value))}
              allowClear
            />
          </Col>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('ACTIVENESS')}</Typography.Text>
            <Select
              className="w-100"
              value={isActivated}
              onChange={handleActivenessChange}
              disabled={isPending}
              options={convertedActivenessOptions}
              allowClear
            />
          </Col>
          <Col xs={24} lg={12}>
            <Typography.Text>{t('IS_LOGGED_IN')}</Typography.Text>
            <Select
              className="w-100"
              value={isLoggedIn}
              onChange={handleLoggedInChange}
              disabled={isPending}
              options={convertedYesOrNoOptions}
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
