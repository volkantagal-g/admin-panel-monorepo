import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/CommunicationServiceCredentials/Detail/formHelpers';
import { convertPhoneLanguageOptions, getLanguages } from '@app/pages/CommunicationServiceCredentials/utils';

const Header = ({ isFormEditable }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');
  const languageOptions = getLanguages();

  return (
    <>
      <Col md={16} xs={16} data-testid="content_information_header-title" />
      <Col md={8} xs={8} className="align-center">
        <Form.Item name="phoneLanguages" rules={rules.onlyRequired}>
          <Select
            className="mt-4"
            placeholder={t('APP_LANGUAGES')}
            showArrow
            suffixIcon={<FlagOutlined />}
            options={convertPhoneLanguageOptions(languageOptions)}
            mode="multiple"
            autoComplete="off"
            disabled={!isFormEditable}
          />
        </Form.Item>
      </Col>
    </>
  );
};

const CardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const TitleInformation = ({ isFormEditable }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');

  return (
    <AntCard bordered={false} title={<Header isFormEditable={isFormEditable} />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['phoneLanguages']}>
            {({ getFieldValue }) => {
              return (getFieldValue('phoneLanguages')?.map(lang => (
                <Col md={8} xs={12}>
                  <Card title={<CardHeader lang={lang} />} bordered>
                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        rules={rules.onlyRequired}
                        name={['titleList', lang, 'text']}
                        className="w-100 d-inline"
                        label={t('TEXT')}
                      >
                        <Input.TextArea rows={1} suffix={lang.toUpperCase()} disabled={!isFormEditable} />
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

export default memo(TitleInformation);
