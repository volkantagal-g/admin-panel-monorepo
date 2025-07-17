import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Input, Row, Space, Select } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import { convertPhoneLanguageOptions } from '@app/pages/Announcement/utils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form/helpers';
import { Languages } from '@app/pages/CourierCommunication/NotificationList/New/constants';
import { getInitialLanguageValues } from '@app/pages/CourierCommunication/NotificationList/Detail/components/ContentInformation/utils';

const CardHeader = ({ isDisabled, initialLanguageValues }) => {
  const { t } = useTranslation('courierCommunication');
  const languageOptions = getSelectedCountryLanguages();

  return (
    <>
      <Col md={16} xs={16}>{t('CONTENT_INFORMATION')}</Col>
      <Col lg={8} className="align-center">
        <Form.Item initialValue={initialLanguageValues} name="notificationLanguages" rules={rules.requiredWithoutType}>
          <Select
            className="mt-4"
            placeholder={t('LANGUAGE')}
            showArrow
            suffixIcon={<FlagOutlined />}
            options={convertPhoneLanguageOptions(languageOptions)}
            mode="multiple"
            autoComplete="off"
            disabled={isDisabled}
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

const ContentInformationForm = ({ handleOnChange, value, isDisabled }) => {
  const { t } = useTranslation('courierCommunication');

  const handleNonApplicableLangages = allSelectedLang => {
    const nonApplicable = {};
    const applicableLangauge = new Set(allSelectedLang);
    const nonApplicableLangauge = Languages.filter(lang => !applicableLangauge.has(lang));
    nonApplicableLangauge.forEach(lang => {
      nonApplicable[lang] = 'N/A';
    });
    return nonApplicable;
  };

  const handleTitleChange = (e, lang, allSelectedLang) => {
    const nonApplicationTitle = handleNonApplicableLangages(allSelectedLang);
    const titleValue = {
      ...value,
      title: {
        ...value.title,
        [lang]: e.target.value,
        ...nonApplicationTitle,
      },
    };
    handleOnChange('notification', titleValue);
  };

  const handleMessageChange = (e, lang, allSelectedLang) => {
    const nonApplicableMessage = handleNonApplicableLangages(allSelectedLang);
    const messageValue = {
      ...value,
      message: {
        ...value.message,
        [lang]: e.target.value,
        ...nonApplicableMessage,
      },
    };
    handleOnChange('notification', messageValue);
  };

  return (
    <AntCard bordered={false} title={<CardHeader isDisabled={isDisabled} initialLanguageValues={getInitialLanguageValues(value)} />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['notificationLanguages']}>
            {({ getFieldValue }) => {
              return (getFieldValue('notificationLanguages')?.map(lang => (
                <Col md={8} xs={12} key={`lang-${lang}`}>
                  <Card title={<TransactionalNotificationCardHeader title="Notification" lang={lang} />} bordered>
                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        name={['notification', 'title', lang]}
                        className="w-100 d-inline"
                        label={t('TITLE')}
                        required
                        rules={rules.requiredWithoutType}
                      >
                        <Row className="mt-2">
                          <Col xs={24} lg={24}>
                            <Input
                              onChange={e => {
                                handleTitleChange(e, lang, getFieldValue('notificationLanguages'));
                              }}
                              value={value.title[`${lang}`]}
                              disabled={isDisabled}
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                    </div>
                    <div className="mt-2">
                      <Form.Item
                        preserve={false}
                        name={['notification', 'message', lang]}
                        className="w-100 d-inline"
                        label={t('MESSAGE')}
                        required
                        rules={rules.requiredWithoutType}
                      >
                        <Row className="mt-2">
                          <Col xs={24} lg={24}>
                            <Input.TextArea
                              rows={5}
                              suffix={lang.toUpperCase()}
                              onChange={e => {
                                handleMessageChange(e, lang, getFieldValue('notificationLanguages'));
                              }}
                              value={value.message[`${lang}`]}
                              disabled={isDisabled}
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
