import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { rules } from '@app/pages/CommunicationServiceCredentials/New/formHelpers';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { configSelector } from '@app/pages/CommunicationServiceCredentials/New/redux/selectors';
import { Creators } from '@app/pages/CommunicationServiceCredentials/New/redux/actions';
import { getLangKey } from '@shared/i18n';
import { statuses } from '@app/pages/CommunicationServiceCredentials/constantValues';
import SelectCallbackProperties from '@shared/containers/Select/CallbackProperty';
import { CALLBACK_TYPES, SERVICE_TYPES } from '@shared/containers/Select/CallbackProperty/constants';
import SegmentDataFeedFlag from '@shared/containers/Select/SegmentDataFeed';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import NotifSoundTypeSelect from '@shared/containers/Marketing/Select/NotifSoundTypeSelect';

const NotificationInformations = ({ disabled, serviceType }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');
  const dispatch = useDispatch();

  const permissions = useSelector(configSelector.getConfig)?.permissions;
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
            <Select disabled={disabled} options={convertConstantValuesToSelectOptions(statuses)} allowClear />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col lg={24}>
          <NotifSoundTypeSelect fieldName="notificationSound" label={t('NOTIFICATION_SOUND_TYPE_SELECT')} />
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
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <TargetDomainSelect fieldName="domainType" label={t('TARGET_SERVICE')} rules={rules.onlyRequired} />
        </Col>
      </Row>
      <SelectCallbackProperties callbackType={CALLBACK_TYPES.STATUS} disabled={disabled} serviceType={SERVICE_TYPES.NOTIF} />
      <SegmentDataFeedFlag />
    </>
  );
};

export default memo(NotificationInformations);
