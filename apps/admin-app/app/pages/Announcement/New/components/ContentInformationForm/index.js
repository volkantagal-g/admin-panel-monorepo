import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Form, Image, Input, Row, Select } from 'antd';
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
import { Creators } from '@app/pages/Announcement/New/redux/actions';
import { POSITIVE_BUTTON_INACTIVE_ACTION } from '@app/pages/Announcement/New/components/ContentInformationForm/constants';
import { convertPhoneLanguageOptions } from '@app/pages/Announcement/utils';
import { fileUploadSelector } from '@app/pages/Announcement/New/redux/selectors';
import { FILE_UPLOAD_STATE_KEY } from '../../../constants';

// Future Note : It's obiusly unneccessary but we are following a legacy/cripled backend flow
// So one day , when we refine the be payload this prefix can remove.
const contentFieldNamePrefix = 'promo';

const ContentInformationForm = ({ form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isImageLoading = useSelector(fileUploadSelector.isAnnouncementContentImagePending);
  const classes = useStyles();

  return (
    <AntCard bordered={false} title={<CardHeader t={t} />} footer={<CardFooter t={t} />}>
      <Row gutter={24}>
        <Form.Item noStyle dependencies={['phoneLanguages', 'domainType', 'picURL', 'type']} label={t('APP_LANGUAGES_TITLE')}>
          {({ getFieldValue }) => {
            const phoneLanguages = getFieldValue('phoneLanguages');
            return (phoneLanguages?.map(lang => (
              <Col lg={8} key={lang}>
                <Card title={<AnnouncementCardHeader title={t('ANNOUNCEMENT')} lang={lang} />} bordered>
                  <Form.Item name={[contentFieldNamePrefix, 'picURL', lang]} preserve={false}>
                    <>
                      <Image
                        src={getFieldValue([contentFieldNamePrefix, 'picURL', lang]) || PLACEHOLDER_IMAGE}
                        className="w-100"
                      />

                      <ImageUploader
                        isAppliedToOtherLanguangesProp={false}
                        disabled={isImageLoading}
                        onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                          const setImageField = ({ phoneLang, cdnUrl }) => {
                            form.setFields([{ name: ['promo', 'picURL', phoneLang], value: cdnUrl }]);
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

                          dispatch(Creators.uploadFilesToS3Request({
                            content: {
                              loadedImage,
                              file,
                              isAppliedToOtherLanguanges,
                              fileLang: lang,
                            },
                            onUploadSuccess,
                            fileStateKey: FILE_UPLOAD_STATE_KEY.ANNOUNCEMENT_CONTENT_IMAGE,

                          }));
                        }}
                      />
                    </>
                  </Form.Item>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      preserve={false}
                      name={[contentFieldNamePrefix, 'titleV2', lang]}
                      className="w-100 d-inline "
                      label={t('TITLE')}
                    >
                      <Input suffix={lang.toUpperCase()} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      preserve={false}
                      name={[contentFieldNamePrefix, 'descriptionV2', lang]}
                      className="w-100 d-inline "
                      label={t('DESCRIPTION')}
                    >
                      <Input.TextArea rows={2} suffix={lang.toUpperCase()} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      preserve={false}
                      name={[contentFieldNamePrefix, 'promoContentSectionTitle', lang]}
                      className="w-100 d-inline "
                      label={t('CONTENT_SECTION_TITLE')}
                    >
                      <Input suffix={lang.toUpperCase()} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      preserve={false}
                      rules={rules.onlyRequired}
                      name={[contentFieldNamePrefix, 'promoContentHTML', lang]}
                      className="w-100 d-inline"
                      label={t('CONTENT')}
                    >
                      <ReactQuill theme="snow" className={classes.textEditor} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      preserve={false}
                      name={[contentFieldNamePrefix, 'button', 'text', lang]}
                      className="w-100 d-inline"
                      label={t('BUTTON')}
                    >
                      <Input suffix={lang.toUpperCase()} />
                    </Form.Item>

                    <ClientAppActions
                      form={form}
                      targetServiceId={getFieldValue('promoTarget')}
                      ownerServiceId={getFieldValue('promoTarget')}
                      targetServiceFieldName="promoTarget"
                      isActionTypeRequired={false}
                      inactiveActions={POSITIVE_BUTTON_INACTIVE_ACTION}
                      parentObjLevels={[contentFieldNamePrefix, 'button', 'action']}
                      Creators={Creators}
                    />

                  </div>
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

const CardHeader = ({ t }) => {
  return (
    <>
      <Col lg={16}>{t('CONTENT_INFORMATION')}</Col>
      <Col lg={8} className="align-center">
        <Form.Item name="phoneLanguages" rules={rules.onlyRequired}>
          <Select
            className="mt-4"
            placeholder={t('APP_LANGUAGES')}
            showArrow
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

const CardFooter = ({ t }) => {
  return (
    <Button htmlType="Submit" className="float-right">{t('SAVE')}</Button>
  );
};

const AnnouncementCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col lg={12}>{title}</Col>
      <Col lg={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

export default memo(ContentInformationForm);
