import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Image, Input, Row, Select } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toString, get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import ImageUploader from '@shared/components/UI/ImageUploader';
import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';
import { Creators } from '@app/pages/PushNotification/New/redux/actions';
// import { getPushNotificationImagesSelector } from '@app/pages/PushNotification/New/redux/selectors';
import { NOTIFICATION_IMAGE_VALIDATION } from '@app/pages/PushNotification/constants';
import { getS3SignedImageUrlSelector } from '@app/pages/PushNotification/New/redux/selectors';
import { notificationDomainType } from '@shared/shared/constantValues';

const ContentInformationForm = ({ form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const { maxWidth, minWidth, minHeight, imageRatios, maxImageSizeInMB } = NOTIFICATION_IMAGE_VALIDATION;
  const isImageUploading = useSelector(getS3SignedImageUrlSelector.getIsPending);

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
              suffixIcon={<FlagOutlined />}
              options={phoneLanguageOptions(getSelectedCountryLanguages())}
              mode="multiple"
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </div>
    );
  }, [t]);

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Row gutter={24} className="py-3">
        <Form.Item
          noStyle
          dependencies={['phoneLanguages', 'domainType']}
          label={t('APP_LANGUAGES_TITLE')}
        >
          {({ getFieldValue, getFieldsValue, setFields }) => {
            const { domainType, phoneLanguages } = getFieldsValue(['domainType', 'phoneLanguages']);
            return (phoneLanguages?.map(lang => {
              const initialTitle = get(notificationDomainType[domainType], lang, notificationDomainType[domainType]?.en);
              setFields([{ name: ['contents', lang, 'title'], value: initialTitle }]);
              return (
                <Col lg={8} key={lang}>
                  <Card title={<NotificationCardHeader title="Notification" lang={lang} />} bordered>

                    <Form.Item name={['contents', lang, 'imageName']}>
                      <Image
                        src={getFieldValue(['contents', lang, 'imageUrl']) || PLACEHOLDER_IMAGE}
                        className="w-100"
                        loading
                        preview={false}
                      />
                      <ImageUploader
                        maxImageSizeInMB={maxImageSizeInMB}
                        validImageRatios={imageRatios}
                        maxWidth={maxWidth}
                        isAppliedToOtherLanguangesProp={false}
                        minWidth={minWidth}
                        minHeight={minHeight}
                        disabled={isImageUploading}
                        onOkayClick={(loadedImage, file, isAppliedToOtherLanguages) => {
                          const fileName = `${uuidv4()}.${file.type.split('/')[1]}`;
                          const afterUpload = ({ cdnUrl }) => {
                            imageUploadCallback(cdnUrl, isAppliedToOtherLanguages, phoneLanguages, lang, fileName);
                          };
                          dispatch(Creators.getS3SignedImageUrlRequest({ fileName, loadedImage, afterUpload }));
                        }}
                      />
                    </Form.Item>

                    <div className="mt-2">
                      <Form.Item
                        rules={rules.titleRule}
                        preserve={false}
                        name={['contents', lang, 'title']}
                        className="w-100 d-inline "
                        label={t('NOTIF_TITLE')}
                      >
                        <Input suffix={lang.toUpperCase()} />
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
                        <Input.TextArea rows={5} suffix={lang.toUpperCase()} />
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
    </AntCard>
  );
};

export default memo(ContentInformationForm);

const NotificationCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col xs={20} md={12}>{title}</Col>
      <Col xs={4} md={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};
