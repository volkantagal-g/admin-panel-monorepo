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
import { Creators } from '@app/pages/Popup/Detail/redux/actions';
import {
  NEGATIVE_BUTTON_INACTIVE_ACTION,
  POSITIVE_BUTTON_INACTIVE_ACTION,
} from '@app/pages/Popup/Detail/components/ContentInformationForm/constants';
import { getPopupImagesSelector } from '@app/pages/Popup/Detail/redux/selectors';

import { convertPhoneLanguageOptions } from '@app/pages/Popup/utils';
import { POPUP_TYPE } from '@app/pages/Popup/constants';
import ClientAppActions from '@shared/containers/Marketing/ClientAppActions';

const ContentInformationForm = ({ form, isFormEditable, setIsFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isImageLoading = useSelector(getPopupImagesSelector.getIsPending);
  const filterShopsObjLevel = ['positiveButton', 'action', 'data', 'filterShopsList'];
  return (
    <AntCard
      bordered={false}
      title={<CardHeader isFormEditable={isFormEditable} t={t} />}
      footer={<FormFooter isFormEditable={isFormEditable} setIsFormEditable={setIsFormEditable} t={t} />}
    >
      <Row gutter={24}>
        <Form.Item noStyle dependencies={['phoneLanguages', 'domainType', 'picURL', 'type', filterShopsObjLevel]} label={t('APP_LANGUAGES_TITLE')}>
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

            const targetDomainType = getFieldValue('domainType');
            const phoneLanguages = getFieldValue('phoneLanguages');

            return (phoneLanguages?.map(lang => {
              const imageUrl = getFieldValue(['picURL', lang]);
              return (
                <Col lg={8} key={lang}>
                  <Card title={<PopupCardHeader title="Popup" lang={lang} />} bordered>
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
                              form.setFields([{ name: ['picName', lang], value: null }]);
                              form.setFieldsValue({ phoneLanguages: form.getFieldValue('phoneLanguages') });
                            }}
                          >{t('REMOVE_IMAGE')}
                          </Button>
                        )}
                        <ImageUploader
                          isAppliedToOtherLanguangesProp={false}
                          disabled={isImageLoading || !isFormEditable || popupType === POPUP_TYPE.REFER_A_FRIEND}
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
                        className="w-100 d-inline"
                        label={t('POPUP_TITLE')}
                      >
                        <Input
                          suffix={lang.toUpperCase()}
                          disabled={!isFormEditable || popupType === POPUP_TYPE.REFER_A_FRIEND}
                        />
                      </Form.Item>
                    </div>

                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        rules={popupType === POPUP_TYPE.REFER_A_FRIEND ? null : rules.onlyRequired}
                        name={['description', lang]}
                        className="w-100 d-inline"
                        label={t('POPUP_DESCRIPTION')}
                      >
                        <Input.TextArea
                          rows={5}
                          suffix={lang.toUpperCase()}
                          disabled={!isFormEditable || popupType === POPUP_TYPE.REFER_A_FRIEND}
                        />
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
                        <Input suffix={lang.toUpperCase()} disabled={!isFormEditable} />
                      </Form.Item>
                      <ClientAppActions
                        form={form}
                        disabled={!isFormEditable}
                        isActionTypeRequired={false}
                        targetServiceId={targetDomainType}
                        ownerServiceId={targetDomainType}
                        targetServiceFieldName="domainType"
                        inactiveActions={POSITIVE_BUTTON_INACTIVE_ACTION}
                        parentObjLevels={['positiveButton', 'action']}
                        Creators={Creators}
                      />
                    </div>

                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        rules={rules.onlyRequired}
                        name={['negativeButton', 'text', lang]}
                        className="w-100 d-inline"
                        label={t('NEGATIVE_BUTTON')}
                      >
                        <Input suffix={lang.toUpperCase()} disabled={!isFormEditable} />
                      </Form.Item>

                      <ClientAppActions
                        form={form}
                        targetServiceId={getFieldValue('domainType')}
                        ownerServiceId={getFieldValue('domainType')}
                        inactiveActions={NEGATIVE_BUTTON_INACTIVE_ACTION}
                        parentObjLevels={['negativeButton', 'action']}
                        disabled
                      />
                    </div>

                  </Card>
                </Col>
              );
            })
            );
          }}
        </Form.Item>
      </Row>
    </AntCard>
  );
};

export default memo(ContentInformationForm);

const PopupCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col lg={12}>{title}</Col>
      <Col lg={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const CardHeader = ({ isFormEditable, t }) => {
  return (
    <>
      <Col lg={16} data-testid="content_information_header-title">{t('CONTENT_INFORMATION')}</Col>
      <Col lg={8} className="align-center">
        <Form.Item name="phoneLanguages" rules={rules.onlyRequired}>
          <Select
            data-testid="phoneLanguages-select"
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

const FormFooter = ({ isFormEditable, setIsFormEditable, t }) => {
  return (
    <Row justify="end" gutter={24}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                onClick={() => {
                  setIsFormEditable(false);
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button
              data-test="edit-btn"
              size="small"
              htmlType="button"
              onClick={() => {
                setIsFormEditable(true);
              }}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};
