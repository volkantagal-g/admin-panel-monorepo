import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Form, Row, Col } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { FORMS } from '@app/pages/ShopPaybackStatus/components/forms';
import { REQUEST_TYPE_OPTIONS } from '@app/pages/ShopPaybackStatus/constants';

const StatusForm = () => {
  const { t } = useTranslation('shopPaybackStatus');
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
