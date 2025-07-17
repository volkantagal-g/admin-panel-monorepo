import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Input, Row, Select, Alert, Space, Button, Image } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { convertPhoneLanguageOptions, filterSenderBySelectedDomain } from '@app/pages/Email/utils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { Creators } from '@app/pages/Email/New/redux/actions';
import { rules } from '@app/pages/Email/New/formHelpers';
import { SENGRID_URL } from '@app/pages/Email/constants';
import { previewImageSelector, senderMailConfigSelector } from '@app/pages/Email/New/redux/selectors';

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
            mode="multiple"
            suffixIcon={<FlagOutlined />}
            options={convertPhoneLanguageOptions(languageOptions)}
            autoComplete="off"
          />
        </Form.Item>
      </Col>
    </>
  );
};

const EmailCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const PreviewImage = ({ lang }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const [gettingImage, setGettingImage] = useState(false);

  const previewImage = useSelector(previewImageSelector.getData)?.thumbnailUrl;
  const previewImageName = useSelector(previewImageSelector.getData)?.name;
  const previewImageIsPending = useSelector(previewImageSelector.getIsPending);

  const designIdObjLevel = ['contents', lang, 'designId'];

  return (
    <Form.Item noStyle dependencies={[designIdObjLevel, 'domainType']}>
      {({ getFieldValue }) => {
        const designId = getFieldValue(designIdObjLevel);
        const domainType = getFieldValue('domainType');
        return (
          <>
            <div className="mt-2">
              <Button
                type="primary"
                disabled={!designId || previewImageIsPending || !domainType}
                onClick={() => {
                  setGettingImage(true);
                  dispatch(Creators.getPreviewImageRequest({ designId, domainType }));
                }}
              >{gettingImage ? t('RELOAD_PREVIEW_IMAGE') : t('SHOW_PREVIEW_IMAGE')}
              </Button>
            </div>
            {
              gettingImage &&
              (
                <div className="mt-2">
                  <Image src={previewImage} alt={previewImageName} />
                </div>
              )
            }
          </>
        );
      }}
    </Form.Item>
  );
};

const ContentInformationForm = () => {
  const { t } = useTranslation('marketing');

  const senderMail = useSelector(senderMailConfigSelector.getSenderMail)?.value;
  const senderMailIsPending = useSelector(senderMailConfigSelector.isSenderMailPending);
  const senderName = useSelector(senderMailConfigSelector.getSenderName)?.value;
  const senderNameIsPending = useSelector(senderMailConfigSelector.isSenderNamePending);

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Col md={24}>
            <Alert
              message={t('ADD_EMAIL_TEMPLATE')}
              description={SENGRID_URL}
              type="warning"
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['phoneLanguages', 'domainType']}>
            {({ getFieldValue }) => {
              const domainType = getFieldValue('domainType');
              return (getFieldValue('phoneLanguages')?.map(lang => (
                <Col md={8} xs={12}>
                  <Card title={<EmailCardHeader title="E-Mail" lang={lang} />} bordered>
                    <div className="mt-2">
                      <Form.Item
                        rules={rules.onlyRequired}
                        preserve={false}
                        name={['contents', lang, 'designId']}
                        className="w-100 d-inline "
                        label={t('EMAIL_TEMPLATE_ID')}
                        hasFeedback
                      >
                        <Input suffix={lang.toUpperCase()} allowClear />
                      </Form.Item>
                    </div>

                    <div className="mt-2">
                      <Form.Item
                        rules={rules.onlyRequired}
                        preserve={false}
                        name={['contents', lang, 'senderEmail']}
                        className="w-100 d-inline "
                        label={t('SENDER_EMAIL')}
                      >
                        <Select options={filterSenderBySelectedDomain(senderMail, domainType)} allowClear disabled={senderMailIsPending} />
                      </Form.Item>
                    </div>

                    <div className="mt-2">
                      <Form.Item
                        rules={rules.onlyRequired}
                        preserve={false}
                        hasFeedback
                        name={['contents', lang, 'senderName']}
                        className="w-100 d-inline "
                        label={t('SENDER_NAME')}
                      >
                        <Select options={filterSenderBySelectedDomain(senderName, domainType)} allowClear disabled={senderNameIsPending} />
                      </Form.Item>
                    </div>

                    <PreviewImage lang={lang} />
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
