import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Row, Select, Input, Tooltip } from 'antd';
import { FlagOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import 'react-quill/dist/quill.snow.css';

import ClientAppActions from '@shared/containers/Marketing/ClientAppActions';
import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { Creators } from '@app/pages/Banner/Detail/redux/actions';
import { convertPhoneLanguageOptions } from '@app/pages/Banner/utils';
import { COMPONENT_TYPE, INACTIVE_ACTIONS } from '@app/pages/Banner/constants';
import ImageCarousel from '@app/pages/Banner/Detail/components/ContentInformationForm/components/ImageCarousel';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const contentFieldNamePrefix = 'contents';

const ContentInformationForm = ({ form, isFormEditable, formFooter }) => {
  const { t } = useTranslation('marketing');

  return (
    <AntCard bordered={false} title={<CardHeader t={t} isFormEditable={isFormEditable} />} footer={formFooter}>
      <Form.Item
        noStyle
        dependencies={['phoneLanguages', 'domainType', 'picURL', 'type', 'componentType']}
        label={t('APP_LANGUAGES_TITLE')}
      >

        {({ getFieldValue }) => {
          const componentType = getFieldValue('componentType');
          const phoneLanguages = getFieldValue('phoneLanguages');
          if (!componentType) {
            return (t('YOU_SHOULD_SELECT_COMPONENT_TYPE'));
          }
          return (
            <Row gutter={24}>

              {getFieldValue('phoneLanguages')?.map(lang => {
                return (
                  <Col lg={12} key={lang}>
                    <Card
                      label={(
                        <Tooltip title={`${t('TITLE')} (${lang.toUpperCase()})`}>
                          {t('PRIORITY')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                        </Tooltip>
                      )}
                      title={<BannerCardHeader title={t('BANNER')} lang={lang} />}
                      bordered
                      key={lang}
                      className="mt-3"
                    >
                      <Row>
                        <Col lg={24}>
                          <ImageCarousel
                            form={form}
                            lang={lang}
                            isFormEditable={isFormEditable}
                            componentType={componentType}
                            phoneLanguages={phoneLanguages}
                            contentFieldNamePrefix={contentFieldNamePrefix}
                          />
                          {(componentType === COMPONENT_TYPE.MAXI || componentType === COMPONENT_TYPE.DYNAMIC_CARD) && (
                            <Row className="mt-2">
                              <Col lg={24}>
                                <Form.Item
                                  className="d-inline"
                                  hasFeedback
                                  required={componentType === COMPONENT_TYPE.DYNAMIC_CARD}
                                  rules={componentType === COMPONENT_TYPE.DYNAMIC_CARD ? rules.onlyRequired : []}
                                  label={`${t('TITLE')} (${lang.toUpperCase()})`}
                                  name={[contentFieldNamePrefix, lang, 'title']}
                                >
                                  <Input
                                    placeholder={t('TITLE')}
                                    maxLength={30}
                                    disabled={!isFormEditable}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          )}
                          {componentType === COMPONENT_TYPE.MAXI && (
                            <>

                              <Row className="mt-2">
                                <Col lg={24}>
                                  <Form.Item
                                    className="d-inline"
                                    hasFeedback
                                    label={`${t('DESCRIPTION')} (${lang.toUpperCase()})`}
                                    name={[contentFieldNamePrefix, lang, 'description']}
                                  >
                                    <Input placeholder={t('DESCRIPTION')} maxLength={50} disabled={!isFormEditable} />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col lg={24}>
                                  <TargetDomainSelect
                                    label={t('BANNER_BADGE')}
                                    fieldName={[contentFieldNamePrefix, lang, 'badgeTarget']}
                                    inline={false}
                                    disabled={!isFormEditable}
                                    allowClear
                                  />
                                </Col>
                              </Row>
                            </>
                          )}
                          <Row>
                            <Col lg={24}>
                              <div className="mt-2">
                                <ClientAppActions
                                  form={form}
                                  isActionTypeRequired={false}
                                  targetServiceFieldName="domainType"
                                  inactiveActions={INACTIVE_ACTIONS}
                                  parentObjLevels={['action']}
                                  Creators={Creators}
                                  disabled={!isFormEditable}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        }}

      </Form.Item>
    </AntCard>
  );
};

const CardHeader = ({ t, isFormEditable }) => {
  return (
    <>
      <Col lg={16}>{t('CONTENT_INFORMATION')}</Col>
      <Col lg={8} className="align-center">
        <Form.Item name="phoneLanguages" rules={rules.onlyRequired}>
          <Select
            className="mt-4"
            disabled={!isFormEditable}
            placeholder={t('APP_LANGUAGES')}
            showArrow
            is
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

const BannerCardHeader = ({ title, lang }) => {
  const { t } = useTranslation('marketing');
  return (
    <Row className="w-100">
      <Col lg={12}>
        <Tooltip title={`${t('BANNER_IMAGE_SIZE_WARNING')}`}>
          {title} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
        </Tooltip>
      </Col>
      <Col lg={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

export default memo(ContentInformationForm);
