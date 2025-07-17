import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Image, Input, Row, Select, Switch } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import useStyles from './styles';
import ClientAppActions from '@shared/containers/Marketing/ClientAppActions';
import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import ImageUploader from '@shared/components/UI/ImageUploader';
import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';
import { Creators } from '@app/pages/NotificationCenter/Detail/redux/actions';
import { POSITIVE_BUTTON_INACTIVE_ACTION } from '@app/pages/NotificationCenter/Detail/components/ContentInformationForm/constants';
import { convertPhoneLanguageOptions } from '@app/pages/NotificationCenter/utils';
import { fileUploadSelector } from '@app/pages/NotificationCenter/Detail/redux/selectors';
import { FILE_UPLOAD_STATE_KEY, CONTENT_FIELD_PREFIX, CONTENT_DETAIL_FIELD_NAME } from '@app/pages/NotificationCenter/constants';

const ContentInformationForm = ({ form, formFooter, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isImageLoading = useSelector(fileUploadSelector.isNotificationCenterContentImagePending);
  const classes = useStyles();

  return (
    <AntCard bordered={false} title={<CardHeader t={t} isFormEditable={isFormEditable} />} footer={formFooter}>
      <Row gutter={24}>
        <Form.Item noStyle dependencies={[[CONTENT_FIELD_PREFIX, 'languages'], 'domainType', 'picURL', 'type']} label={t('APP_LANGUAGES_TITLE')}>
          {({ getFieldValue }) => {
            const phoneLanguages = getFieldValue([CONTENT_FIELD_PREFIX, 'languages']);
            return (phoneLanguages?.map(lang => (
              <Col lg={8} key={lang}>
                <Card title={<NotificationCenterCardHeader title={t('ANNOUNCEMENT')} lang={lang} />} bordered>
                  <Form.Item name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'picURL']} preserve={false}>
                    <>
                      <Image
                        src={getFieldValue([...CONTENT_DETAIL_FIELD_NAME, lang, 'picURL']) || PLACEHOLDER_IMAGE}
                        className="w-100"
                      />

                      <ImageUploader
                        isAppliedToOtherLanguangesProp={false}
                        disabled={isImageLoading || !isFormEditable}
                        onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                          const setImageField = ({ phoneLang, cdnUrl, imageName }) => {
                            form.setFields([{ name: [...CONTENT_DETAIL_FIELD_NAME, phoneLang, 'picURL'], value: cdnUrl }]);
                            form.setFields([{ name: [...CONTENT_DETAIL_FIELD_NAME, phoneLang, 'picName'], value: imageName }]);
                          };

                          const onUploadSuccess = ({ cdnUrl, imageName }) => {
                            if (isAppliedToOtherLanguanges) {
                              phoneLanguages.forEach(phoneLanguage => {
                                setImageField({ phoneLang: phoneLanguage, cdnUrl, imageName });
                              });
                            }
                            else {
                              setImageField({ phoneLang: lang, cdnUrl, imageName });
                            }
                          };

                          dispatch(Creators.uploadFilesToS3Request({
                            content: {
                              loadedImage,
                              file,
                              isAppliedToOtherLanguanges,
                              fileLang: lang,
                              form,
                            },
                            onUploadSuccess,
                            fileStateKey: FILE_UPLOAD_STATE_KEY.NOTIFICATION_CENTER_CONTENT_IMAGE,

                          }));
                        }}
                      />
                    </>
                  </Form.Item>

                  <Form.Item
                    name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'picName']}
                    preserve={false}
                    className="my-0 d-none"
                  >
                    <input type="text" />
                  </Form.Item>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      preserve={false}
                      name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'title']}
                      className="w-100 d-inline "
                      label={t('TITLE')}
                    >
                      <Input suffix={lang.toUpperCase()} disabled={!isFormEditable} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      preserve={false}
                      name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'description']}
                      className="w-100 d-inline "
                      label={t('DESCRIPTION')}
                    >
                      <Input.TextArea rows={2} suffix={lang.toUpperCase()} disabled={!isFormEditable} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      preserve={false}
                      name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'sectionTitle']}
                      className="w-100 d-inline "
                      label={t('CONTENT_SECTION_TITLE')}
                    >
                      <Input suffix={lang.toUpperCase()} disabled={!isFormEditable} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      preserve={false}
                      rules={rules.onlyRequired}
                      name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'contentHtml']}
                      className="w-100 d-inline"
                      label={t('CONTENT')}
                    >
                      <ReactQuill theme="snow" className={classes.textEditor} readOnly={!isFormEditable} />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'buttonVisible']}
                    label={t('HAS_ACTION_BUTTON')}
                    valuePropName="checked"
                    className="mt-3 mb-0"
                  >
                    <Switch
                      disabled={!isFormEditable}
                      className="float-right"
                    />
                  </Form.Item>
                  <Form.Item dependencies={[[...CONTENT_DETAIL_FIELD_NAME, lang, 'buttonVisible']]}>
                    {() => {
                      const buttonVisibleValue = getFieldValue([...CONTENT_DETAIL_FIELD_NAME, lang, 'buttonVisible']);
                      if (buttonVisibleValue) {
                        return (
                          <div>
                            <Form.Item
                              preserve={false}
                              rules={rules.onlyRequired}
                              name={[...CONTENT_DETAIL_FIELD_NAME, lang, 'button', 'text']}
                              className="w-100 d-inline"
                              label={t('BUTTON')}
                            >
                              <Input suffix={lang.toUpperCase()} disabled={!isFormEditable} />
                            </Form.Item>

                            <ClientAppActions
                              form={form}
                              isActionTypeRequired
                              disabled={!isFormEditable}
                              targetServiceId={getFieldValue('domainType')}
                              ownerServiceId={getFieldValue('domainType')}
                              targetServiceFieldName="domainType"
                              inactiveActions={POSITIVE_BUTTON_INACTIVE_ACTION}
                              parentObjLevels={[...CONTENT_DETAIL_FIELD_NAME, lang, 'button', 'action']}
                              Creators={Creators}
                            />

                          </div>
                        );
                      }
                      return null;
                    }}

                  </Form.Item>
                </Card>
              </Col>
            ))
            );
          }}
        </Form.Item>
      </Row>
    </AntCard>
  );
};

const CardHeader = ({ t, isFormEditable }) => {
  return (
    <>
      <Col lg={16}>{t('CONTENT_INFORMATION')}</Col>
      <Col lg={8} className="align-center">
        <Form.Item name={[CONTENT_FIELD_PREFIX, 'languages']} rules={rules.onlyRequired}>
          <Select
            className="mt-4"
            placeholder={t('APP_LANGUAGES')}
            showArrow
            disabled={!isFormEditable}
            suffixIcon={<FlagOutlined />}
            options={convertPhoneLanguageOptions(getSelectedCountryLanguages())}
            mode="multiple"
            autoComplete="off"
          />
        </Form.Item>
      </Col>
    </>
  );
};

const NotificationCenterCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col lg={12}>{title}</Col>
      <Col lg={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

export default memo(ContentInformationForm);
