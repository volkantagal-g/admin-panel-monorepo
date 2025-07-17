import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Form, Input, Row, Select, Space, Tooltip } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/TransactionalSms/New/formHelpers';
import { convertPhoneLanguageOptions, toSnakeCase } from '@app/pages/TransactionalSms/utils';
import { getUser, getUserCountries } from '@shared/redux/selectors/auth';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';

const CardHeader = () => {
  const { t } = useTranslation('transactionalSmsPage');
  const user = getUser();
  const allCountries = useSelector(countriesSelector.getData);
  const userCountries = getUserCountries();

  const countries = user.hasGlobalAccess ? allCountries : userCountries;
  const languageOptions = Array.from(new Set(countries.map(item => item.defaultLanguageCode)));

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

const TransactionalSmsCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const ContentInformationForm = () => {
  const { t } = useTranslation('transactionalSmsPage');

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['phoneLanguages']}>
            {({ getFieldValue, setFieldsValue }) => {
              return (getFieldValue('phoneLanguages')?.map(lang => (
                <Col md={8} xs={12}>
                  <Card title={<TransactionalSmsCardHeader title="Transactional Sms" lang={lang} />} bordered>
                    <div className="mt-2">
                      <Row>
                        <Col xs={24} lg={24}>
                          <Row>
                            <Col xs={12} lg={12}>
                              <Form.Item name={['placeholderText', lang]} rules={[]}>
                                <Input placeholder={t('PLACEHOLDER')} />
                              </Form.Item>
                            </Col>
                            <Col xs={12} lg={12}>
                              <Tooltip placement="top" title={t('PLACEHOLDER_TOOLTIP')}>
                                <Button
                                  onClick={() => {
                                    const message = ['contentList', lang, 'message'];
                                    const placeholderText = ['placeholderText', lang];
                                    const placeholder = getFieldValue(placeholderText) !== undefined ? toSnakeCase(getFieldValue(placeholderText)) : '';
                                    const placeholderStr = `${getFieldValue(message) ?? ''} {{${placeholder}}} `;
                                    setFieldsValue({ contentList: { [lang]: { message: placeholderStr } } });
                                  }}
                                >
                                  {t('ADD_PLACEHOLDER')}
                                </Button>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Form.Item
                        preserve={false}
                        rules={rules.onlyRequired}
                        name={['contentList', lang, 'message']}
                        className="w-100 d-inline"
                        label={t('MESSAGE')}
                      >
                        <Row className="mt-2">
                          <Col xs={24} lg={24}>
                            <Input.TextArea
                              rows={5}
                              suffix={lang.toUpperCase()}
                              onChange={event => {
                                const { value } = event.target;
                                setFieldsValue({ contentList: { [lang]: { message: value } } });
                              }}
                              value={`${getFieldValue(['contentList', lang, 'message'])}` &&
                              `${getFieldValue(['contentList', lang, 'message'])}` !== 'undefined' ?
                                `${getFieldValue(['contentList', lang, 'message'])}`
                                : ''}
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                    </div>
                  </Card>
                </Col>
              )));
            }}
          </Form.Item>
        </Row>
      </Space>
    </AntCard>
  );
};

export default memo(ContentInformationForm);
