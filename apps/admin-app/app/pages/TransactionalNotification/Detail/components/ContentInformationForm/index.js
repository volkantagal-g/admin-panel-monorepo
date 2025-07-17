import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Form, Image, Input, Row, Select, Space, Tooltip } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/TransactionalNotification/Detail/formHelpers';
import { convertPhoneLanguageOptions, toSnakeCase } from '@app/pages/TransactionalNotification/utils';
import { getUser, getUserCountries } from '@shared/redux/selectors/auth';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';
import ImageUploader from '@shared/components/UI/ImageUploader';
import { Creators } from '@app/pages/TransactionalNotification/Detail/redux/actions';
import { getNotificationImagesSelector } from '@app/pages/TransactionalNotification/Detail/redux/selectors';

const ContentInformationForm = ({ form, formFooter, isFormEditable }) => {
  const { t } = useTranslation('transactionalNotificationPage');
  const dispatch = useDispatch();
  const isImageLoading = useSelector(getNotificationImagesSelector.getIsPending);

  return (
    <AntCard bordered={false} footer={formFooter} title={<CardHeader isFormEditable={isFormEditable} />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['phoneLanguages']}>
            {({ getFieldValue, setFieldsValue }) => {
              return (getFieldValue('phoneLanguages')?.map(lang => {
                const phoneLanguages = getFieldValue('phoneLanguages');
                const imageUrl = getFieldValue(['picURL', lang]);
                return (
                  <Col md={8} xs={12}>
                    <Card title={<TransactionalNotificationCardHeader title="Transactional Notification" lang={lang} />} bordered>
                      <Form.Item name={['picURL', lang]} preserve={false}>
                        <>
                          <Image
                            src={getFieldValue(['picURL', lang]) || PLACEHOLDER_IMAGE}
                            className="w-100"
                          />
                          {imageUrl && (
                          <Button
                            size="small"
                            className="w-100"
                            type="primary"
                            disabled={isImageLoading || !isFormEditable}
                            danger
                            onClick={() => {
                              form.setFields([{ name: ['picURL', lang], value: null }]);
                              form.setFieldsValue({ phoneLanguages: form.getFieldValue('phoneLanguages') });
                            }}
                          >{t('REMOVE_IMAGE')}
                          </Button>
                          )}
                          <ImageUploader
                            isAppliedToOtherLanguangesProp={false}
                            disabled={isImageLoading || !isFormEditable}
                            onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                              const setImageField = ({ phoneLang, cdnUrl }) => {
                                form.setFields([{ name: ['picURL', phoneLang], value: cdnUrl }]);
                              };

                              const onUploadSuccess = ({ cdnUrl }) => {
                                if (isAppliedToOtherLanguanges) {
                                  phoneLanguages.forEach(phoneLanguage => {
                                    setImageField({ phoneLang: phoneLanguage, cdnUrl });
                                  });
                                }
                                else {
                                  setImageField({ phoneLang: lang, cdnUrl });
                                }
                              };

                              dispatch(Creators.getS3SignedImageUrlRequest({
                                loadedImage,
                                file,
                                isAppliedToOtherLanguanges,
                                fileLang: lang,
                                onUploadSuccess,
                              }));
                            }}
                          />
                        </>
                      </Form.Item>
                      <div className="mt-2">
                        <Form.Item
                          preserve={false}
                          rules={rules.onlyRequired}
                          name={['contentList', lang, 'title']}
                          className="w-100 d-inline"
                          label={t('TITLE')}
                        >
                          <Row>
                            <Col xs={24} lg={24}>
                              <Row>
                                <Col xs={12} lg={12}>
                                  <Form.Item name={['placeholderTextTitle', lang]}>
                                    <Input disabled={!isFormEditable} placeholder={t('PLACEHOLDER')} />
                                  </Form.Item>
                                </Col>
                                <Col xs={12} lg={12}>
                                  <Tooltip placement="top" title={t('PLACEHOLDER_TOOLTIP_HEADER')}>
                                    <Button
                                      disabled={!isFormEditable}
                                      onClick={() => {
                                        const title = ['contentList', lang, 'title'];
                                        const placeholderText = ['placeholderTextTitle', lang];
                                        const placeholder = getFieldValue(placeholderText) !== undefined ? toSnakeCase(getFieldValue(placeholderText)) : '';
                                        const placeholderStr = `${getFieldValue(title) ?? ''} {{${placeholder}}} `;
                                        setFieldsValue({ contentList: { [lang]: { title: placeholderStr } } });
                                      }}
                                    >
                                      {t('ADD_PLACEHOLDER')}
                                    </Button>
                                  </Tooltip>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col xs={24} lg={24}>
                              <Input
                                disabled={!isFormEditable}
                                onChange={event => {
                                  const { value } = event.target;
                                  setFieldsValue({ contentList: { [lang]: { title: value } } });
                                }}
                                value={`${getFieldValue(['contentList', lang, 'title'])}` &&
                                `${getFieldValue(['contentList', lang, 'title'])}` !== 'undefined' ?
                                  `${getFieldValue(['contentList', lang, 'title'])}`
                                  : ''}
                              />
                            </Col>
                          </Row>
                        </Form.Item>
                      </div>
                      <div className="mt-2">
                        <Form.Item
                          preserve={false}
                          rules={rules.onlyRequired}
                          name={['contentList', lang, 'body']}
                          className="w-100 d-inline"
                          label={t('MESSAGE')}
                        >
                          <Row>
                            <Col xs={24} lg={24}>
                              <Row>
                                <Col xs={12} lg={12}>
                                  <Form.Item name={['placeholderTextBody', lang]}>
                                    <Input disabled={!isFormEditable} placeholder={t('PLACEHOLDER')} />
                                  </Form.Item>
                                </Col>
                                <Col xs={12} lg={12}>
                                  <Tooltip placement="top" title={t('PLACEHOLDER_TOOLTIP_MESSAGE')}>
                                    <Button
                                      disabled={!isFormEditable}
                                      onClick={() => {
                                        const body = ['contentList', lang, 'body'];
                                        const placeholderText = ['placeholderTextBody', lang];
                                        const placeholder = getFieldValue(placeholderText) !== undefined ? toSnakeCase(getFieldValue(placeholderText)) : '';
                                        const placeholderStr = `${getFieldValue(body) ?? ''} {{${placeholder}}} `;
                                        setFieldsValue({ contentList: { [lang]: { body: placeholderStr } } });
                                      }}
                                    >
                                      {t('ADD_PLACEHOLDER')}
                                    </Button>
                                  </Tooltip>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col xs={24} lg={24}>
                              <Input.TextArea
                                disabled={!isFormEditable}
                                rows={5}
                                suffix={lang.toUpperCase()}
                                onChange={event => {
                                  const { value } = event.target;
                                  setFieldsValue({ contentList: { [lang]: { body: value } } });
                                }}
                                value={`${getFieldValue(['contentList', lang, 'body'])}` &&
                                `${getFieldValue(['contentList', lang, 'body'])}` !== 'undefined' ?
                                  `${getFieldValue(['contentList', lang, 'body'])}`
                                  : ''}
                              />
                            </Col>
                          </Row>
                        </Form.Item>
                      </div>
                    </Card>
                  </Col>
                );
              })
              );
            }}
          </Form.Item>
        </Row>
      </Space>
    </AntCard>
  );
};

const CardHeader = ({ isFormEditable }) => {
  const { t } = useTranslation('transactionalNotificationPage');
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
            disabled={!isFormEditable}
          />
        </Form.Item>
      </Col>
    </>
  );
};

const TransactionalNotificationCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

export default memo(ContentInformationForm);
