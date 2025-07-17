import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Select, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { QuestionCircleOutlined } from '@ant-design/icons';

import { rules } from '@app/pages/CommunicationServiceCredentials/Detail/formHelpers';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { configSelector } from '@app/pages/CommunicationServiceCredentials/Detail/redux/selectors';
import { Creators } from '@app/pages/CommunicationServiceCredentials/Detail/redux/actions';
import { getLangKey } from '@shared/i18n';
import { statuses } from '@app/pages/CommunicationServiceCredentials/constantValues';
import SelectCallbackProperties from '@shared/containers/Select/CallbackProperty';
import { CALLBACK_TYPES, SERVICE_TYPES } from '@shared/containers/Select/CallbackProperty/constants';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const EmailInformations = ({ isFormEditable, serviceType }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');
  const dispatch = useDispatch();

  const permissions = useSelector(configSelector.getConfig)?.permissions;
  const providers = useSelector(configSelector.getConfig)?.providers;
  const senderAccounts = useSelector(configSelector.getConfig)?.senderAccounts;
  const isConfigPending = useSelector(configSelector.isPending);

  useEffect(() => {
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey(), serviceType }));
  }, [dispatch, serviceType]);

  return (
    <>
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            hasFeedback
            name="isActive"
            label={t('STATUS')}
            rules={rules.onlyRequired}
          >
            <Select disabled={!isFormEditable} options={convertConstantValuesToSelectOptions(statuses)} allowClear />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('VERSION')} rules={rules.onlyRequired} hasFeedback name="version">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('NAME')} rules={rules.onlyRequired} hasFeedback name="name">
            <Input disabled={!isFormEditable} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('TEAM_NAME')} rules={rules.onlyRequired} hasFeedback name="teamName">
            <Input disabled={!isFormEditable} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('TRIBE_NAME')} rules={rules.onlyRequired} hasFeedback name="tribeName">
            <Input disabled={!isFormEditable} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('FROM')} rules={rules.onlyRequired} hasFeedback name="from">
            <Input disabled={!isFormEditable} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('FROM_NAME')} rules={rules.onlyRequired} hasFeedback name="fromName">
            <Input disabled={!isFormEditable} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            label={(
              <Tooltip title={t('PATTERN_WARNING')}>
                {t('TO_PATTERNS')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
              </Tooltip>
            )}
            hasFeedback
            name="toPatterns"
            rules={rules.onlyRequired}
          >
            <Select mode="tags" disabled={!isFormEditable} allowClear />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item hasFeedback name="permissions" label={t('PERMISSIONS')} rules={rules.requiredArray}>
            <Select
              mode="multiple"
              loading={isConfigPending}
              disabled={isConfigPending || !isFormEditable}
              options={convertConstantValuesToSelectOptions(permissions, false)}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item hasFeedback name="provider" label={t('PROVIDER')} rules={rules.onlyRequired}>
            <Select
              loading={isConfigPending}
              disabled={isConfigPending || !isFormEditable}
              options={convertConstantValuesToSelectOptions(providers, false)}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('PURPOSE')} rules={rules.onlyRequired} hasFeedback name="purpose">
            <Input disabled={!isFormEditable} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item hasFeedback name="senderAccount" label={t('SENDER_ACCOUNT')} rules={rules.onlyRequired}>
            <Select
              loading={isConfigPending}
              disabled={isConfigPending || !isFormEditable}
              options={convertConstantValuesToSelectOptions(senderAccounts, false)}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <TargetDomainSelect fieldName="domainType" label={t('TARGET_SERVICE')} rules={rules.onlyRequired} disabled={!isFormEditable} />
        </Col>
      </Row>

      <SelectCallbackProperties callbackType={CALLBACK_TYPES.STATUS} serviceType={SERVICE_TYPES.EMAIL} />
    </>
  );
};

export default memo(EmailInformations);
