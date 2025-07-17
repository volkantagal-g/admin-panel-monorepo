import { Tag, Button } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

import { Creators } from '@app/pages/CommunicationHistory/redux/actions';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import {
  COMMUNICATION_CHANNEL_TYPES,
  NOTIFICATION_TYPES,
  SMS_DELIVERY_STATUSES,
  EMAIL_FAIL_REASON,
  EMAIL_STATUS,
  EMAIL_TYPES,
} from '@app/pages/CommunicationHistory/constants';
import { smsDeliveryStatuses, emailStatuses, emailTypes } from '@app/pages/CommunicationHistory/constantValues';
import { getLangKey } from '@shared/i18n';

export const generateColumns = ({ t, communicationType, dispatch }) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;

  if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
    return [
      {
        title: t('NOTIFICATION_ID'),
        dataIndex: 'id',
        key: 'id',
        width: 200,
      },
      {
        title: t('CREATED_AT'),
        key: 'createdAt',
        width: 160,
        render: ({ createdAt }) => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
        sorter: true,
      },
      {
        title: t('CLIENT_ID'),
        dataIndex: 'clientId',
        key: 'clientId',
        width: 160,
        sorter: true,
      },
      {
        title: t('TEMPLATE_ID'),
        dataIndex: 'templateId',
        key: 'templateId',
        width: 160,
        sorter: true,
      },
      {
        title: t('NOTIFICATION_TYPE'),
        key: 'notificationType',
        width: 160,
        render: ({ notificationType }) => emailTypes[get(NOTIFICATION_TYPES, notificationType, '')]?.[getLangKey()],
        sorter: true,
      },
      {
        title: t('DEVICE_TYPE'),
        dataIndex: 'deviceType',
        key: 'deviceType',
        width: 160,
        sorter: true,
      },
      {
        title: t('CONFIGURATION_NAME'),
        dataIndex: 'configurationName',
        key: 'configurationName',
        width: 160,
        sorter: true,
      },
      {
        title: t('TITLE'),
        key: 'title',
        width: 160,
        render: ({ title, notificationType }) => {
          if (notificationType === NOTIFICATION_TYPES.CMPGN) {
            return title;
          }
          if (notificationType === NOTIFICATION_TYPES.TXN) {
            return t('TRANSACTIONAL_ITEM_TITLE_WARNING', { items: t('NOTIFICATIONS') });
          }
          return null;
        },
      },

      {
        title: t('BODY'),
        key: 'body',
        width: 200,
        render: ({ body, notificationType }) => {
          if (notificationType === NOTIFICATION_TYPES.CMPGN) {
            return body;
          }
          if (notificationType === NOTIFICATION_TYPES.TXN) {
            return t('TRANSACTIONAL_ITEM_BODY_WARNING', { items: t('NOTIFICATIONS') });
          }
          return null;
        },
      },
    ];
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
    return [
      {
        title: t('SMS_ID'),
        dataIndex: 'id',
        key: 'id',
        width: 200,
      },
      {
        title: t('SENDING_DATE'),
        key: 'sendingDate',
        width: 160,
        render: ({ sendingDate }) => moment.utc(sendingDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
        sorter: true,
      },
      {
        title: t('NUMBER'),
        dataIndex: 'number',
        key: 'number',
        width: 160,
      },
      {
        title: t('PROVIDER'),
        dataIndex: 'provider',
        key: 'provider',
        width: 160,
        sorter: true,
      },
      {
        title: t('BODY'),
        key: 'body',
        dataIndex: 'body',
        width: 200,
        sorter: true,
      },
      {
        title: t('CONFIG_NAME'),
        dataIndex: 'configurationName',
        key: 'configurationName',
        width: 160,
        sorter: true,
      },
      {
        title: t('DOMAIN_TYPE'),
        dataIndex: 'domainType',
        key: 'domainType',
        width: 160,
        sorter: true,
      },
      {
        title: t('SMS_TYPE'),
        dataIndex: 'smsType',
        key: 'smsType',
        width: 100,
        sorter: true,
      },
      {
        title: t('DELIVERY_STATUS'),
        key: 'deliveryStatus',
        width: 160,
        render: ({ deliveryStatus }) => {
          return (
            <Tag color={smsDeliveryStatuses[get(SMS_DELIVERY_STATUSES, deliveryStatus, '')]?.color}>
              {smsDeliveryStatuses[get(SMS_DELIVERY_STATUSES, deliveryStatus, '')]?.[getLangKey()]}
            </Tag>
          );
        },
        sorter: true,
      },
      {
        title: t('FAIL_REASON'),
        dataIndex: 'failReason',
        key: 'failReason',
        width: 100,
        sorter: true,
      },
    ];
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL) {
    return [
      {
        title: t('EMAIL_ID'),
        dataIndex: 'id',
        key: 'id',
        width: 200,
      },
      {
        title: t('CREATED_AT'),
        key: 'createdAt',
        width: 160,
        render: ({ createdAt }) => moment.utc(createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
        sorter: true,
      },
      {
        title: t('REPORT_ID'),
        dataIndex: 'reportId',
        key: 'reportId',
        width: 160,
        sorter: true,
      },
      {
        title: t('TEMPLATE_ID'),
        dataIndex: 'templateId',
        key: 'templateId',
        width: 160,
        sorter: true,
      },
      {
        title: t('RECIPIENT'),
        dataIndex: 'recipient',
        key: 'recipient',
        width: 160,
        sorter: true,
      },
      {
        title: t('CONFIGURATION_NAME'),
        dataIndex: 'configurationName',
        key: 'configurationName',
        width: 200,
        sorter: true,
      },
      {
        title: t('EMAIL_TYPE'),
        key: 'emailType',
        width: 120,
        render: ({ emailType }) => emailTypes[get(EMAIL_TYPES, emailType, '')]?.[getLangKey()],
        sorter: true,
      },
      {
        title: t('BODY'),
        key: 'action',
        width: 200,
        render: ({ id, emailType }) => {
          if (emailType === EMAIL_TYPES.CMPGN) {
            return (
              <Button
                size="small"
                onClick={() => {
                  dispatch(Creators.getSignedUrlRequest({ emailId: id }));
                  dispatch(Creators.setModalVisibilityRequest({ visibility: true }));
                }}
              >
                {t('GET_TEMPLATE_IMAGE')}
              </Button>
            );
          }
          return <> {t('TRANSACTIONAL_ITEM_BODY_WARNING', { items: t('MAILS') })} </>;
        },
      },
      {
        title: t('FAIL_REASON'),
        key: 'failReason',
        width: 150,
        render: ({ failReason }) => {
          return (
            <Tag color="red">
              {get(EMAIL_FAIL_REASON, failReason, '')}
            </Tag>
          );
        },
        sorter: true,
      },
      {
        title: t('STATUS'),
        key: 'status',
        width: 100,
        render: ({ status }) => {
          return (
            <Tag color={emailStatuses[get(EMAIL_STATUS, status, '')]?.color}>
              {emailStatuses[get(EMAIL_STATUS, status, '')]?.[getLangKey()]}
            </Tag>
          );
        },
        sorter: true,
      },
    ];
  }
  return [];
};
