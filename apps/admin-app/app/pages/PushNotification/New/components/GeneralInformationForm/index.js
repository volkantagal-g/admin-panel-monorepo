import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Input, Row, Select, Checkbox, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import AntCard from '@shared/components/UI/AntCard';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { rules } from '@shared/utils/marketing/formUtils';
import { notificationTypes } from '@app/pages/PushNotification/constantValues';
import { NOTIFICATION_OPTION_TYPES, NOTIF_CENTER_HOURLY_TTL } from '@app/pages/PushNotification/constants';
import { responsibleDepartment } from '@shared/shared/constantValues';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import NotificationTagSelect from '@shared/containers/Marketing/Select/NotificationTagSelect';
import { GETIR_JOB_DOMAIN_TYPE } from '@shared/shared/constants';

const GeneralInformationForm = ({ form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const { onlyRequired, responsibleDepartmentRule } = rules;

  useEffect(() => {
    // Country code , from form initial values
    const targetCountry = form.getFieldValue('targetCountry');
    // Initialize city list for city selection
    dispatch(CommonCreators.getCitiesRequest({ countryId: targetCountry.value }));
  }, [dispatch, form]);

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <TargetDomainSelect fieldName="domainType" rules={rules.onlyRequired} />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item noStyle hasFeedback name="customTag" className="d-inline">
              <Input placeholder={t('CUSTOM_LABEL')} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="responsibleDepartment"
              label={t('RESPONSIBLE_DEPARTMENT')}
              rules={responsibleDepartmentRule}
            >
              <Select options={convertConstantValuesToSelectOptions(responsibleDepartment)} allowClear />
            </Form.Item>
          </Col>

          <Form.Item noStyle dependencies={['domainType']}>
            {({ getFieldValue }) => {
              const domainType = getFieldValue('domainType');
              return domainType === GETIR_JOB_DOMAIN_TYPE ? (
                <Col md={12} xs={24}>
                  <NotificationTagSelect inline fieldName="notificationCategory" />
                </Col>
              ) : null;
            }}
          </Form.Item>

        </Row>

        <Row gutter={24} className="mt-4 mt-sm-0">
          <Col md={12} xs={24}>
            <Form.Item hasFeedback name="notificationType" label={t('NOTIFICATION_TYPE')} rules={onlyRequired}>
              {/* Ai typed notifs created on another platform/panel */}
              <Select
                options={convertConstantValuesToSelectOptions(omit(notificationTypes, NOTIFICATION_OPTION_TYPES.AI))}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item noStyle dependencies={['notificationType', 'domainType']}>
              {({ getFieldsValue }) => {
                const { notificationType, domainType } = getFieldsValue(['domainType', 'notificationType']);
                return notificationType === NOTIFICATION_OPTION_TYPES.PROMO ? (
                  <PromotionSelect form={form} fieldName="promoId" targetServiceId={domainType} inline />
                ) : null;
              }}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item noStyle dependencies={['domainType']}>
          {({ getFieldValue }) => {
            const domainType = getFieldValue('domainType');
            return domainType === GETIR_JOB_DOMAIN_TYPE ? (
              <Row gutter={24}>
                <Col lg={24}>
                  <Form.Item name="showNotifCenter" label={t('SHOW_IN_NOTIFICATION_CENTER')} initialValue valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                </Col>
              </Row>
            ) : null;
          }}
        </Form.Item>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item noStyle dependencies={['showNotifCenter']}>
              {({ getFieldValue }) => {
                const showNotifCenter = getFieldValue('showNotifCenter');
                return showNotifCenter ? (
                  <Form.Item name="ttl" label={t('TIME_TO_LIVE_HOUR')} initialValue={NOTIF_CENTER_HOURLY_TTL.DEFAULT} rules={rules.onlyRequired}>
                    <InputNumber controls className="w-100" min={NOTIF_CENTER_HOURLY_TTL.MIN} max={NOTIF_CENTER_HOURLY_TTL.MAX} />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>
          </Col>
        </Row>

      </AntCard>
    </Badge.Ribbon>
  );
};

// Ux helper comp for user it's shows local time of selected country
const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
    </>
  );
};

export default memo(GeneralInformationForm);
