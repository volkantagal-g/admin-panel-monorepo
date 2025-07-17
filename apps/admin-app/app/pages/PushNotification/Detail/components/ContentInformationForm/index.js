import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Image, Input, Row, Select, Button } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import ImageUploader from '@shared/components/UI/ImageUploader';
import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';
import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import { NOTIFICATION_IMAGE_VALIDATION, NOTIFICATION_OPTION_TYPES } from '@app/pages/PushNotification/constants';
import { getS3SignedImageUrlSelector } from '@app/pages/PushNotification/Detail/redux/selectors';

const ContentInformationForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const { maxWidth, minWidth, minHeight, imageRatios, maxImageSizeInMB } = NOTIFICATION_IMAGE_VALIDATION;
  const isImageUploading = useSelector(getS3SignedImageUrlSelector.getIsPending);

  const isContentAreaEditDisabled = isImageUploading || !isFormEditable || form.getFieldValue('notificationType') === NOTIFICATION_OPTION_TYPES.AI;

  const phoneLanguageOptions = countryLanguages => {
    return countryLanguages.map(item => {
      return {
        value: toString(item.toLowerCase()),
        label: item,
      };
    });
  };

  const imageUploadCallback = (cdnUrl, isAppliedToOtherLanguages, phoneLanguages, lang, fileName) => {
    if (isAppliedToOtherLanguages) {
      phoneLanguages?.forEach(phoneLang => {
        form.setFields([
          { name: ['contents', phoneLang, 'imageUrl'], value: cdnUrl },
          { name: ['contents', phoneLang, 'imageName'], value: fileName },
        ]);
      });
    }
    else {
      form.setFields([
        { name: ['contents', lang, 'imageUrl'], value: cdnUrl },
        { name: ['contents', lang, 'imageName'], value: fileName },
      ]);
    }
  };

  const CardHeader = useCallback(() => {
    return (
      <div className="w-100 d-block d-md-flex align-items-center">
        <Col md={16} xs={24}>{t('PUSH_CONTENT_INFORMATION')}</Col>
        <Col md={8} xs={24} className="align-center">
          <Form.Item name="phoneLanguages" rules={rules.phoneLanguageRule}>
            <Select
              className="mt-4"
              placeholder={t('APP_LANGUAGES')}
              showArrow
              disabled={isContentAreaEditDisabled}
              suffixIcon={<FlagOutlined />}
              options={phoneLanguageOptions(getSelectedCountryLanguages())}
              mode="multiple"
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </div>
    );
  }, [isContentAreaEditDisabled, t]);

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Row gutter={24} className="py-3">
        <Form.Item
          noStyle
          dependencies={['phoneLanguages', 'domainType']}
          label={t('APP_LANGUAGES_TITLE')}
        >
          {({ getFieldValue, setFields }) => {
            const phoneLanguages = getFieldValue('phoneLanguages');
            return phoneLanguages?.map(lang => {
              // Set default title depends on domain type
              // TODO: Commented since it caused the notif title not to be changed; will be checked again later.
              /* const initialTitle = get(notificationDomainType[domainType],lang,notificationDomainType[domainType]?.en);
              setFields([{ name: ['contents', lang, 'title'],value: initialTitle }]); */
              const imageUrl = getFieldValue(['contents', lang, 'imageUrl']);
              return (
                <Col md={8} key={lang}>
                  <Card title={<NotificationCardHeader title="Notification" lang={lang} />} bordered>

                    <Form.Item name={['contents', lang, 'imageName']}>
                      <Image
                        src={imageUrl || PLACEHOLDER_IMAGE}
                        className="w-100"
                        preview={false}
                      />
                      {imageUrl && (
                        <Button
                          size="small"
                          className="w-100"
                          type="primary"
                          disabled={isContentAreaEditDisabled}
                          onClick={() => {
                            setFields([
                              { name: ['contents', lang, 'imageUrl'], value: null },
                              { name: ['contents', lang, 'imageName'], value: null },
                            ]);
                            form.setFieldsValue({ phoneLanguages: form.getFieldValue('phoneLanguages') });
                          }}
                        >{t('REMOVE_IMAGE')}
                        </Button>
                      )}

                    </Form.Item>

                    <ImageUploader
                      maxImageSizeInMB={maxImageSizeInMB}
                      validImageRatios={imageRatios}
                      maxWidth={maxWidth}
                      minWidth={minWidth}
                      minHeight={minHeight}
                      disabled={isContentAreaEditDisabled}
                      isAppliedToOtherLanguangesProp={false}
                      onOkayClick={(loadedImage, file, isAppliedToOtherLanguages) => {
                        const fileName = `${uuidv4()}.${file.type.split('/')[1]}`;
                        const afterUpload = ({ cdnUrl }) => {
                          imageUploadCallback(cdnUrl, isAppliedToOtherLanguages, phoneLanguages, lang, fileName);
                          form.setFieldsValue({ phoneLanguages: form.getFieldValue('phoneLanguages') });
                        };
                        dispatch(Creators.getS3SignedImageUrlRequest({ fileName, loadedImage, afterUpload }));
                      }}
                    />

                    <div className="mt-2">
                      <Form.Item
                        rules={rules.titleRule}
                        preserve={false}
                        name={['contents', lang, 'title']}
                        className="w-100 d-inline "
                        label={t('NOTIF_TITLE')}
                      >
                        <Input disabled={isContentAreaEditDisabled} suffix={lang.toUpperCase()} />
                      </Form.Item>
                    </div>

                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        rules={rules.messageRule}
                        name={['contents', lang, 'message']}
                        className="w-100 d-inline"
                        label={t('NOTIF_DESCRIPTION')}
                      >
                        <Input.TextArea disabled={isContentAreaEditDisabled} rows={5} suffix={lang.toUpperCase()} />
                      </Form.Item>
                    </div>

                  </Card>
                </Col>
              );
            });
          }}
        </Form.Item>
      </Row>
    </AntCard>
  );
};

const NotificationCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col xs={20} md={12}>{title}</Col>
      <Col xs={4} md={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

export default memo(ContentInformationForm);
