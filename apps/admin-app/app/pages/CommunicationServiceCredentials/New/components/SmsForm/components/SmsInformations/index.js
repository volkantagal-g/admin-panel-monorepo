import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { rules } from '@app/pages/CommunicationServiceCredentials/New/formHelpers';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { configSelector, providerSelector } from '@app/pages/CommunicationServiceCredentials/New/redux/selectors';
import { Creators } from '@app/pages/CommunicationServiceCredentials/New/redux/actions';
import { getLangKey } from '@shared/i18n';
import { providersObj, statuses } from '@app/pages/CommunicationServiceCredentials/constantValues';
import { PROVIDER_TYPE } from '@app/pages/CommunicationServiceCredentials/constants';
import { convertAccountsToSelectOptions, convertHeadersToSelectOptions } from '@app/pages/CommunicationServiceCredentials/utils';
import SelectCallbackProperties from '@shared/containers/Select/CallbackProperty';
import { CALLBACK_TYPES, SERVICE_TYPES } from '@shared/containers/Select/CallbackProperty/constants';
import MixpanelDataFeedFlag from '@shared/containers/Select/CommunicationMixpanelDataFeed';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const SmsInformations = ({ form, disabled, serviceType }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');
  const dispatch = useDispatch();

  const permissions = useSelector(configSelector.getConfig)?.permissions;
  const accounts = useSelector(providerSelector.getProvider);
  const isConfigPending = useSelector(configSelector.isPending);

  const handleOnChange = dependentComponentName => {
    form.setFieldsValue({ [dependentComponentName]: null });
  };

  useEffect(() => {
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey(), serviceType }));
    Object.keys(PROVIDER_TYPE).forEach(key => {
      dispatch(Creators.getProviderRequest({ clientLanguage: getLangKey(), providerType: PROVIDER_TYPE[key] }));
    });
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
            <Select disabled={disabled} options={convertConstantValuesToSelectOptions(statuses)} allowClear />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('NAME')} rules={rules.onlyRequired} hasFeedback name="name">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('TEAM_NAME')} rules={rules.onlyRequired} hasFeedback name="teamName">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('TRIBE_NAME')} rules={rules.onlyRequired} hasFeedback name="tribeName">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            hasFeedback
            name="permissions"
            label={t('PERMISSIONS')}
            rules={rules.requiredArray}
          >
            <Select
              mode="multiple"
              loading={isConfigPending}
              disabled={isConfigPending || disabled}
              options={convertConstantValuesToSelectOptions(permissions, false)}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('PURPOSE')} rules={rules.onlyRequired} hasFeedback name="purpose">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      {Object.keys(providersObj).map(key => {
        const { label, name, dependentComponentName, dependentComponentLabel } = providersObj[key];
        const isProviderPending = accounts?.[name]?.isPending;
        const accountsData = accounts?.[name]?.data;
        return (
          <Row gutter={24}>
            <Col md={12} xs={12}>
              <Form.Item hasFeedback name={name} label={t(`${label}`)} rules={rules.onlyRequired}>
                <Select
                  onChange={() => {
                    handleOnChange(dependentComponentName);
                  }}
                  loading={isProviderPending}
                  disabled={isProviderPending || disabled}
                  options={convertAccountsToSelectOptions(accountsData)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Form.Item noStyle dependencies={[`${name}`]}>
              {({ getFieldValue }) => {
                const dependentComponentId = getFieldValue(`${name}`);
                const dependentComponentOptions = accounts?.[name]?.data?.find(({ id }) => id === dependentComponentId)?.headers;
                return (
                  dependentComponentName !== undefined ? (
                    <Col md={12} xs={12}>
                      <Form.Item name={dependentComponentName} label={t(dependentComponentLabel)} rules={rules.onlyRequired}>
                        <Select
                          loading={isProviderPending}
                          disabled={isProviderPending || disabled}
                          options={convertHeadersToSelectOptions(dependentComponentOptions)}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  ) : null
                );
              }}

            </Form.Item>
          </Row>
        );
      })}
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <TargetDomainSelect fieldName="domainType" label={t('TARGET_SERVICE')} rules={rules.onlyRequired} />
        </Col>
      </Row>
      <SelectCallbackProperties callbackType={CALLBACK_TYPES.STATUS} disabled={disabled} serviceType={SERVICE_TYPES.SMS} />
      <MixpanelDataFeedFlag />
    </>
  );
};

export default memo(SmsInformations);
