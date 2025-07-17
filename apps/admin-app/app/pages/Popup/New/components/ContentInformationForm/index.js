import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Form, Image, Input, Row, Select } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import ImageUploader from '@shared/components/UI/ImageUploader';
import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';
import { Creators } from '@app/pages/Popup/New/redux/actions';
import {
  NEGATIVE_BUTTON_INACTIVE_ACTION,
  POSITIVE_BUTTON_INACTIVE_ACTION,
} from '@app/pages/Popup/New/components/ContentInformationForm/constants';
import { getPopupImagesSelector } from '@app/pages/Popup/New/redux/selectors';
import ClientAppActions from '@shared/containers/Marketing/ClientAppActions';
import { POPUP_TYPE } from '@app/pages/Popup/constants';
import { convertPhoneLanguageOptions } from '@app/pages/Popup/utils';

const ContentInformationForm = ({ form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isImageLoading = useSelector(getPopupImagesSelector.getIsPending);
  return (
    <AntCard bordered={false} title={<CardHeader t={t} />} footer={<CardFooter t={t} />}>
      <Row gutter={24}>
        <Form.Item noStyle dependencies={['phoneLanguages', 'domainType', 'picURL', 'type']} label={t('APP_LANGUAGES_TITLE')}>
          {({ setFieldsValue, getFieldValue }) => {
            const popupType = getFieldValue('type');
            if (popupType === POPUP_TYPE.REFER_A_FRIEND) {
              const popupTitle = getFieldValue('title');
              const popupDescription = getFieldValue('description');
              const popupPicURL = getFieldValue('picURL');
              if (popupTitle || popupDescription || popupPicURL) {
                setFieldsValue({ title: null });
                setFieldsValue({ description: null });
                setFieldsValue({ picURL: null });
              }
            }
            const phoneLanguages = getFieldValue('phoneLanguages');
            return (phoneLanguages?.map(lang => (
              <Col lg={8} key={lang}>
                <Card title={<PopupCardHeader title="Popup" lang={lang} />} bordered>
                  <Form.Item name={['picURL', lang]} preserve={false}>
                    <>
                      <Image
                        src={getFieldValue(['picURL', lang]) || PLACEHOLDER_IMAGE}
                        className="w-100"
                      />

                      <ImageUploader
                        isAppliedToOtherLanguangesProp={false}
                        disabled={isImageLoading || popupType === POPUP_TYPE.REFER_A_FRIEND}
                        onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                          const setImageField = ({ phoneLang, cdnUrl, imageName }) => {
                            form.setFields([{ name: ['picURL', phoneLang], value: cdnUrl }]);
                            form.setFields([{ name: ['picName', phoneLang], value: imageName }]);
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
                      rules={popupType === POPUP_TYPE.REFER_A_FRIEND ? null : rules.onlyRequired}
                      preserve={false}
                      name={['title', lang]}
                      className="w-100 d-inline "
                      label={t('POPUP_TITLE')}
                    >
                      <Input suffix={lang.toUpperCase()} disabled={popupType === POPUP_TYPE.REFER_A_FRIEND} />
                    </Form.Item>
                  </div>

                  <Form.Item
                    rules={rules.onlyRequired}
                    name={['picName', lang]}
                    preserve={false}
                    className="my-0 d-none"
                  >
                    <input type="text" />
                  </Form.Item>

                  <div className="mt-2">
                    <Form.Item
                      preserve={false}
                      rules={popupType === POPUP_TYPE.REFER_A_FRIEND ? null : rules.onlyRequired}
                      name={['description', lang]}
                      className="w-100 d-inline"
                      label={t('POPUP_DESCRIPTION')}
                    >
                      <Input.TextArea rows={5} suffix={lang.toUpperCase()} disabled={popupType === POPUP_TYPE.REFER_A_FRIEND} />
                    </Form.Item>
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      preserve={false}
                      rules={rules.onlyRequired}
                      name={['positiveButton', 'text', lang]}
                      className="w-100 d-inline"
                      label={t('POSITIVE_BUTTON')}
                    >
                      <Input suffix={lang.toUpperCase()} />
                    </Form.Item>

                    <ClientAppActions
                      form={form}
                      targetServiceId={getFieldValue('domainType')}
                      ownerServiceId={getFieldValue('domainType')}
                      targetServiceFieldName="domainType"
                      inactiveActions={POSITIVE_BUTTON_INACTIVE_ACTION}
                      parentObjLevels={['positiveButton', 'action']}
                      Creators={Creators}
                    />
                  </div>

                  <div className="mt-2">
                    <Form.Item
                      rules={rules.onlyRequired}
                      name={['negativeButton', 'text', lang]}
                      className="w-100 d-inline"
                      label={t('NEGATIVE_BUTTON')}
                    >
                      <Input suffix={lang.toUpperCase()} />
                    </Form.Item>

                    <ClientAppActions
                      form={form}
                      disabled
                      targetServiceId={getFieldValue('domainType')}
                      ownerServiceId={getFieldValue('domainType')}
                      inactiveActions={NEGATIVE_BUTTON_INACTIVE_ACTION}
                      parentObjLevels={['negativeButton', 'action']}
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

const PopupCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col lg={12}>{title}</Col>
      <Col lg={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

export default memo(ContentInformationForm);
