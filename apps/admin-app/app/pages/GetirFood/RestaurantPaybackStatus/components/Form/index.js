import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Form, Row, Col } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { REQUEST_TYPE_OPTIONS, FORMS } from './constants';

const StatusForm = () => {
  const { t } = useTranslation('foodRestaurantPaybackStatus');
  const [requestType, setRequestType] = useState();

  const handleRequestTypeChange = value => {
    setRequestType(value);
  };

  const getCurrentForm = () => {
    if (requestType === undefined) return null;
    const CurrentForm = FORMS[requestType];
    return <CurrentForm />;
  };

  return (
    <AntCard>
      <Row>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            colon={false}
            label={t('REQUEST_TYPE')}
          >
            <Select
              placeholder={t('REQUEST_TYPE_PLACEHOLDER')}
              value={requestType}
              onChange={handleRequestTypeChange}
              options={convertConstantValuesToSelectOptions(REQUEST_TYPE_OPTIONS)}
            />
          </Form.Item>
          {getCurrentForm()}
        </Col>
      </Row>
    </AntCard>
  );
};

export default StatusForm;
