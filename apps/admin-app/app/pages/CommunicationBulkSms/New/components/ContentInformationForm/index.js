import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Space } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/CommunicationBulkSms/New/formHelpers';

const CardHeader = () => {
  const { t } = useTranslation('communicationBulkSmsPage');

  return (
    <Col md={16} xs={16}>{t('CONTENT_INFORMATION')}</Col>
  );
};
const ContentInformationForm = () => {
  const { t } = useTranslation('communicationBulkSmsPage');
  const { TextArea } = Input;

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item label={t('SMS_BODY')} rules={rules.onlyRequired} hasFeedback name="smsBody">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </AntCard>
  );
};

export default memo(ContentInformationForm);
