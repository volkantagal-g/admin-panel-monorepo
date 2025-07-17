import { Select } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { smsDeliveryStatuses, emailTypes } from '@app/pages/CommunicationHistory/constantValues';
import { SMS_TYPES } from '@app/pages/CommunicationHistory/constants';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

export const NOTIF_FILTER_FORM = ({ t, notificationTypes }) => {
  return ({
    NOTIFICATION_TYPE: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'notificationType',
        allowClear: true,
        placeholder: t('NOTIFICATION_TYPE'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(notificationTypes, false),
      },
    },
  });
};

export const EMAIL_FILTER_FORM = ({ t }) => {
  return ({
    EMAIL_TYPE: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'emailType',
        allowClear: true,
        placeholder: t('EMAIL_TYPE'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(emailTypes, false),
      },
    },
  });
};

export const SMS_FILTER_FORM = ({ t }) => {
  return ({
    TYPE: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'type',
        allowClear: true,
        placeholder: t('TYPE'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(SMS_TYPES, false),
      },
    },
    DELIVERY_STATUS: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'deliveryStatus',
        allowClear: true,
        placeholder: t('DELIVERY_STATUS'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(smsDeliveryStatuses, false),
      },
    },
    DOMAIN_TYPE: {
      component: TargetDomainSelect,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'domainType',
        allowClear: true,
        label: false,
        placeholder: t('DOMAIN_TYPE'),
        className: 'w-100',
      },
    },
  });
};
