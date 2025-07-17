import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Input, Row, Select, TimePicker, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { QuestionCircleOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import { responsibleDepartment } from '@shared/shared/constantValues';
import { rules } from '@app/pages/TransactionalNotification/New/formHelpers';
import { Creators } from '@app/pages/TransactionalNotification/New/redux/actions';
import { configSelector } from '@app/pages/TransactionalNotification/New/redux/selectors';
import SelectCallbackProperties from '@shared/containers/Select/CallbackProperty';
import { CALLBACK_TYPES, SERVICE_TYPES } from '@shared/containers/Select/CallbackProperty/constants';
import SelectCategory from '@shared/containers/Select/Category';
import SelectCommunicationConfig from '@shared/containers/Select/CommunicationConfig';
import LiveClock from '@shared/components/UI/LiveClock';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import NotifSoundTypeSelect from '@shared/containers/Marketing/Select/NotifSoundTypeSelect';

const GeneralInformationForm = () => {
  const { t } = useTranslation('transactionalNotificationPage');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey() }));
  }, [dispatch]);

  const configData = useSelector(configSelector.getConfig);
  const isConfigPending = useSelector(configSelector.isPending);
  const format = 'HH:mm';

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item label={t('NAME')} rules={rules.onlyRequired} hasFeedback name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item rules={rules.onlyRequired} hasFeedback name="description" className="d-inline">
              <Input placeholder={t('DESCRIPTION')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={24}>
            <NotifSoundTypeSelect fieldName="notificationSound" label={t('NOTIFICATION_SOUND_TYPE_SELECT')} />
          </Col>
        </Row>
        <SelectCommunicationConfig isConfigPending={isConfigPending} configData={configData} componentName="SENDER" />
        <SelectCommunicationConfig isConfigPending={isConfigPending} configData={configData} componentName="TYPE" />
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <TargetDomainSelect fieldName="domainType" label={t('TARGET_SERVICE')} rules={rules.onlyRequired} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="department"
              label={t('RESPONSIBLE_DEPARTMENT')}
              rules={rules.onlyRequired}
            >
              <Select options={convertConstantValuesToSelectOptions(responsibleDepartment)} allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              label={(
                <Tooltip title={t('MAX_PUSHING_DURATION_TOOLTIP')}>
                  {t('MAX_PUSHING_DURATION')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
              hasFeedback
              name="maxPushingDuration"
            >
              <TimePicker format={format} placeholder={t('MAX_PUSHING_DURATION_PLACEHOLDER')} showNow={false} className="w-100" />
            </Form.Item>
          </Col>
        </Row>
        <SelectCommunicationConfig isConfigPending={isConfigPending} configData={configData} componentName="INTERRUPTION_LEVELS" />
        <SelectCategory serviceType={SERVICE_TYPES.NOTIF} />
        <SelectCallbackProperties callbackType={CALLBACK_TYPES.DATA} serviceType={SERVICE_TYPES.NOTIF} />
        <SelectCallbackProperties callbackType={CALLBACK_TYPES.STATUS} serviceType={SERVICE_TYPES.NOTIF} />

      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
    </>
  );
};

export default memo(GeneralInformationForm);
