import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Input, Row, Space, Select, Image, Checkbox } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

import { convertPhoneLanguageOptions } from '@app/pages/Announcement/utils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import ImageUploader from '@shared/components/UI/ImageUploader';
import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/CourierCommunication/NotificationList/New/formHelper';
import { Languages } from '@app/pages/CourierCommunication/NotificationList/New/constants';
import useStyles from './style';

const CardHeader = () => {
  const { t } = useTranslation('courierCommunication');
  const languageOptions = getSelectedCountryLanguages();

  return (
    <>
      <Col md={16} xs={16}>{t('CONTENT_INFORMATION')}</Col>
      <Col lg={8} className="align-center">
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

const TransactionalNotificationCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const ContentInformationForm = ({ handleData }) => {
  const classes = useStyles();
  const { t } = useTranslation('courierCommunication');
  const [notification, setNotification] = useState({ title: {}, message: {}, image: {} });
  const [imageAll, setImageAll] = useState();
  const [language, setLanguage] = useState(false);

  const handleNonApplicableLanguages = allSelectedLang => {
    const nonApplicable = {};
    const applicableLangauge = new Set(allSelectedLang);
    const nonApplicableLangauge = Languages.filter(lang => !applicableLangauge.has(lang));
    nonApplicableLangauge.forEach(lang => {
      nonApplicable[lang] = 'N/A';
    });
    return nonApplicable;
  };

  const handleTitleChange = (e, lang, allSelectedLang) => {
    setNotification(prevNotification => {
      const nonApplicationTitle = handleNonApplicableLanguages(allSelectedLang);
      const titleValue = {
        ...prevNotification,
        title: {
          ...notification.title,
          [lang]: e.target.value,
          ...nonApplicationTitle,
        },
      };
      handleData(titleValue);
      return titleValue;
    });
  };

  const handleMessageChange = (e, lang, allSelectedLang) => {
    setNotification(prevNotification => {
      const nonApplicableMessage = handleNonApplicableLanguages(allSelectedLang);
      const messageValue = {
        ...prevNotification,
        message: {
          ...notification.message,
          [lang]: e.target.value,
          ...nonApplicableMessage,
        },
      };
      handleData(messageValue);
      return messageValue;
    });
  };

  const handleImageChange = (img, lang, allSelectedLang) => {
    if (language) {
      const applicableLanguage = new Set(allSelectedLang);
      const state = {};
      applicableLanguage.forEach(lng => {
        state[lng] = img;
      });
      setNotification(prevNotification => {
        const imageValue = {
          ...prevNotification,
          image: { all: img, ...state, language },
        };
        handleData(imageValue);
        return imageValue;
      });
      setImageAll(img);
    }
    else {
      setNotification(prevNotification => {
        const nonApplicableImage = handleNonApplicableLanguages(allSelectedLang);
        const imageValue = {
          ...prevNotification,
          image: {
            ...notification.image,
            [lang]: img,
            ...nonApplicableImage,
            language,
          },
        };
        handleData(imageValue);
        return imageValue;
      });
    }
  };

  const handleAllLanguage = e => {
    setLanguage(e.target.checked);
  };

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Checkbox className={classes.checkbox} defaultChecked={language} onChange={handleAllLanguage}>{t('UPLOAD_CHECKBOX')}</Checkbox>
        </Row>
        <Row gutter={24}>
          <Form.Item noStyle dependencies={['phoneLanguages']}>
            {({ getFieldValue }) => {
              return (getFieldValue('phoneLanguages')?.map(lang => (
                <Col key={lang} md={8} xs={12}>
                  <Card title={<TransactionalNotificationCardHeader title={t('NOTIFICATION')} lang={lang} />} bordered>
                    <Form.Item name={['picURL', lang]} preserve={false}>
                      <>
                        <Image
                          src={notification?.image[lang] || imageAll || PLACEHOLDER_IMAGE}
                          className="w-100"
                        />
                        <ImageUploader
                          isAppliedToOtherLanguagesCheckboxVisible
                          onOkayClick={loadedImage => {
                            handleImageChange(loadedImage, lang, getFieldValue('phoneLanguages'));
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
                        <Row className="mt-2">
                          <Col xs={24} lg={24}>
                            <Input
                              onChange={e => {
                                handleTitleChange(e, lang, getFieldValue('phoneLanguages'));
                              }}
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
                        <Row className="mt-2">
                          <Col xs={24} lg={24}>
                            <Input.TextArea
                              rows={5}
                              suffix={lang.toUpperCase()}
                              onChange={e => {
                                handleMessageChange(e, lang, getFieldValue('phoneLanguages'));
                              }}
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
