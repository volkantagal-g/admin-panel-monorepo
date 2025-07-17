import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/Sms/New/formHelpers';
import { convertPhoneLanguageOptions } from '@app/pages/Sms/utils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

const CardHeader = () => {
  const { t } = useTranslation('marketing');
  const languageOptions = getSelectedCountryLanguages();

  return (
    <>
      <Col md={16} xs={16}>{t('CONTENT_INFORMATION')}</Col>
      <Col md={8} xs={8} className="align-center">
        <Form.Item name="phoneLanguages" rules={rules.onlyRequired}>
          <Select
            className="mt-4"
            placeholder={t('PHONE_LANGUAGE')}
            showArrow
            suffixIcon={<FlagOutlined />}
            options={convertPhoneLanguageOptions(languageOptions)}
            mode="multiple"
            autoComplete="off"
          />
        </Form.Item>
      </Col>
    </>
  );
};

const SmsCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const ContentInformationForm = () => {
  const { t } = useTranslation('marketing');

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['phoneLanguages']}>
            {({ getFieldValue }) => {
              return (getFieldValue('phoneLanguages')?.map(lang => (
                <Col md={8} xs={12} key={lang}>
                  <Card title={<SmsCardHeader title="Sms" lang={lang} />} bordered>
                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        rules={rules.onlyRequired}
                        name={['contents', lang, 'message']}
                        className="w-100 d-inline"
                        label={t('SMS_CONTENT')}
                      >
                        <Input.TextArea rows={5} suffix={lang.toUpperCase()} />
                      </Form.Item>
                    </div>
                  </Card>
                </Col>
              ))
              );
            }}
          </Form.Item>
        </Row>
      </Space>
    </AntCard>
  );
};

export default memo(ContentInformationForm);
