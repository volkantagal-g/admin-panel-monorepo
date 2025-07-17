import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Input, Row, Select, TimePicker, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { QuestionCircleOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import { rules } from '@app/pages/TransactionalSms/Detail/formHelpers';
import { transactionalSmsDomainTypes } from '@app/pages/TransactionalSms/constantValues';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { convertDomainTypes } from '@app/pages/TransactionalSms/utils';
import { Creators } from '@app/pages/TransactionalSms/Detail/redux/actions';
import { configSelector } from '@app/pages/TransactionalSms/Detail/redux/selectors';
import SelectCallbackProperties from '@shared/containers/Select/CallbackProperty';
import { CALLBACK_TYPES, SERVICE_TYPES } from '@shared/containers/Select/CallbackProperty/constants';
import SelectCategory from '@shared/containers/Select/Category';
import CommunicationConfig from '@shared/containers/Select/CommunicationConfig';
import LiveClock from '@shared/components/UI/LiveClock';

const GeneralInformationForm = ({ isFormEditable }) => {
  const { t } = useTranslation('transactionalSmsPage');
  const dispatch = useDispatch();
  const format = 'HH:mm';

  useEffect(() => {
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey() }));
  }, [dispatch]);

  const activeDomainsFromConfig = useSelector(getConfigWithKeySelector.getData);
  const activeDomainsFromConfigIsPending = useSelector(getConfigWithKeySelector.getIsPending);
  const configData = useSelector(configSelector.getConfig);
  const isConfigPending = useSelector(configSelector.isPending);

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item label={t('NAME')} rules={rules.onlyRequired} hasFeedback name="name">
              <Input disabled={!isFormEditable} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item rules={rules.onlyRequired} hasFeedback name="description" className="d-inline">
              <Input disabled={!isFormEditable} placeholder={t('DESCRIPTION')} />
            </Form.Item>
          </Col>
        </Row>
        <CommunicationConfig
          configData={configData}
          isConfigPending={isConfigPending}
          isFormEditable={isFormEditable}
          componentName="TYPE"
          serviceType="SMS"
        />
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item hasFeedback name="targetService" label={t('TARGET_SERVICE')} rules={rules.onlyRequired}>
              <Select
                options={convertDomainTypes(
                  transactionalSmsDomainTypes,
                  activeDomainsFromConfig?.customValue?.[getSelectedCountry()?.code?.alpha2],
                )}
                disabled={activeDomainsFromConfigIsPending || !isFormEditable}
                loading={activeDomainsFromConfigIsPending}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <SelectCategory serviceType={SERVICE_TYPES.SMS} disabled={!isFormEditable} />
        <SelectCallbackProperties callbackType={CALLBACK_TYPES.DATA} disabled={!isFormEditable} serviceType={SERVICE_TYPES.SMS} />
        <SelectCallbackProperties callbackType={CALLBACK_TYPES.STATUS} disabled={!isFormEditable} serviceType={SERVICE_TYPES.SMS} />
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              label={(
                <Tooltip title={t('MAX_SENDING_DURATION_TOOLTIP')}>
                  {t('MAX_SENDING_DURATION')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
              hasFeedback
              name="maxSendingDuration"
            >
              <TimePicker disabled={!isFormEditable} format={format} placeholder={t('MAX_SENDING_DURATION_PLACEHOLDER')} showNow={false} className="w-100" />
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
      <Form.Item hasFeedback name="version" />
    </>
  );
};
export default memo(GeneralInformationForm);
