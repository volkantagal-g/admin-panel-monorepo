import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Input, Row, Select, Checkbox, InputNumber, Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { StopOutlined } from '@ant-design/icons';

import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import AntCard from '@shared/components/UI/AntCard';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { rules } from '@shared/utils/marketing/formUtils';
import { notificationDetailStatuses, notificationTypes } from '@app/pages/PushNotification/constantValues';
import {
  NOTIFICATION_PROCESS_STATUS,
  NOTIFICATION_OPTION_TYPES,
  NOTIFICATION_STATUS,
  NOTIF_CENTER_HOURLY_TTL, AI_MARKETING_UNSUPPORTED_DOMAIN_LIST,
} from '@app/pages/PushNotification/constants';
// import { PromoSelect } from '@app/pages/PushNotification/Detail/components/GeneralInformationForm/PromoSelect';
import { responsibleDepartment } from '@shared/shared/constantValues';
import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import NotificationTagSelect from '@shared/containers/Marketing/Select/NotificationTagSelect';
import { GETIR_JOB_DOMAIN_TYPE } from '@shared/shared/constants';

const convertNotificationTypeValuesToOptions = notificationTypeOptions => {
  return Object.entries(notificationTypeOptions).map(([value, label]) => {
    return {
      disabled: parseInt(value, 10) === NOTIFICATION_OPTION_TYPES.AI,
      value: parseInt(value, 10),
      label: label[getLangKey()] || label,
    };
  });
};

const GeneralInformationForm = ({ form, isFormEditable, notificationId }) => {
  const { t } = useTranslation('marketing');
  const { onlyRequired, responsibleDepartmentRule } = rules;
  const processStatus = form.getFieldValue('processStatus');
  const isNotifCenterActive = form.getFieldValue('showNotifCenter');
  const deletionDateOfAllNotifEvents = form.getFieldValue('deletionDateOfAllNotifEvents');

  const dispatch = useDispatch();

  return (
    <Badge.Ribbon text={<Ribbon />} color={form.getFieldValue('status') === NOTIFICATION_STATUS.ACTIVE ? 'green' : 'cyan'}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="status"
              label={t('STATUS')}
              rules={onlyRequired}
            >
              <Select disabled={!isFormEditable} options={convertConstantValuesToSelectOptions(notificationDetailStatuses)} allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <TargetDomainSelect
              filteredDomains={form.getFieldValue('notificationType') === NOTIFICATION_OPTION_TYPES.AI ? AI_MARKETING_UNSUPPORTED_DOMAIN_LIST : []}
              fieldName="domainType"
              rules={rules.onlyRequired}
              disabled={!isFormEditable}
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item noStyle hasFeedback name="customTag" className="d-inline">
              <Input placeholder={t('CUSTOM_LABEL')} disabled={!isFormEditable || form.getFieldValue('notificationType') === NOTIFICATION_OPTION_TYPES.AI} />
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
              <Select disabled={!isFormEditable} options={convertConstantValuesToSelectOptions(responsibleDepartment)} allowClear />
            </Form.Item>
          </Col>
          <Form.Item noStyle dependencies={['domainType']}>
            {({ getFieldValue }) => {
              const domainType = getFieldValue('domainType');
              return domainType === GETIR_JOB_DOMAIN_TYPE ? (
                <Col md={12} xs={24}>
                  <NotificationTagSelect disabled={!isFormEditable} inline fieldName="notificationCategory" />
                </Col>
              ) : null;
            }}
          </Form.Item>

        </Row>

        <Row gutter={24} className="mt-4 mt-sm-0">
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="notificationType"
              label={t('NOTIFICATION_TYPE')}
              rules={onlyRequired}
              dependencies={['domainType']}
            >
              <Select
                options={convertNotificationTypeValuesToOptions(notificationTypes)}
                disabled={!isFormEditable || form.getFieldValue('notificationType') === NOTIFICATION_OPTION_TYPES.AI}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item noStyle dependencies={['notificationType', 'domainType']}>
              {({ getFieldsValue }) => {
                const { notificationType, domainType } = getFieldsValue(['domainType', 'notificationType']);
                return (notificationType === NOTIFICATION_OPTION_TYPES.PROMO || notificationType === NOTIFICATION_OPTION_TYPES.AI) ? (
                  <PromotionSelect
                    form={form}
                    fieldName="promoId"
                    targetServiceId={domainType}
                    inline
                    disabled={!isFormEditable || form.getFieldValue('notificationType') === NOTIFICATION_OPTION_TYPES.AI}
                  />
                ) : null;
              }}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item noStyle dependencies={['domainType']}>
          {({ getFieldValue }) => {
            const domainType = getFieldValue('domainType');
            return domainType === GETIR_JOB_DOMAIN_TYPE ? (
              <>
                <Row gutter={24}>
                  <Col lg={5}>
                    <Form.Item name="showNotifCenter" label={t('SHOW_IN_NOTIFICATION_CENTER')} valuePropName="checked">
                      <Checkbox disabled={!isFormEditable} />
                    </Form.Item>
                  </Col>

                  {(!isFormEditable && isNotifCenterActive &&
                  (processStatus === NOTIFICATION_PROCESS_STATUS.COMPLETED || processStatus === NOTIFICATION_PROCESS_STATUS.FINISHED
                    || processStatus === NOTIFICATION_PROCESS_STATUS.CANCEL)) && (
                    <Col lg={7}>
                      <Popconfirm
                        placement="topLeft"
                        title={t('ARE_YOU_SURE_REMOVE_NOTIF_FROM_NOTIF_CENTER')}
                        onConfirm={() => {
                          dispatch(Creators.deleteNotifEventsRequest({ notificationId }));
                        }}
                        okText={t('YES')}
                        cancelText={t('CANCEL')}
                      >
                        <Button type="danger" danger icon={<StopOutlined />} className="float-right">
                          {t('DELETE_FROM_NOTIF_CENTER')}
                        </Button>
                      </Popconfirm>
                    </Col>
                  )}

                  {deletionDateOfAllNotifEvents && (
                  <Col lg={7} className="text-right pt-2">
                    <span className="text-warning">
                      <b>
                        {t('DELETED_FROM_NOTIF_CENTER')} - {moment(deletionDateOfAllNotifEvents).format('DD.MM.YYYY HH:mm')}
                      </b>
                    </span>
                  </Col>
                  )}

                </Row>

                <Row gutter={24}>
                  <Col lg={12}>
                    <Form.Item noStyle dependencies={['showNotifCenter']}>
                      {() => {
                        const showNotifCenter = getFieldValue('showNotifCenter');
                        return showNotifCenter ? (
                          <Form.Item name="ttl" label={t('TIME_TO_LIVE_HOUR')} initialValue={NOTIF_CENTER_HOURLY_TTL.DEFAULT} rules={rules.onlyRequired}>
                            <InputNumber
                              disabled={!isFormEditable}
                              controls
                              className="w-100"
                              min={NOTIF_CENTER_HOURLY_TTL.MIN}
                              max={NOTIF_CENTER_HOURLY_TTL.MAX}
                            />
                          </Form.Item>
                        ) : null;
                      }}
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : null;
          }}
        </Form.Item>
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
