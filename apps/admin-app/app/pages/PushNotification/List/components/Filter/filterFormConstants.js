import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import {
  notificationSendTypeOptions,
  notificationProcessStatus,
  notificationStatusTypeOptions, notificationTypes,
} from '@app/pages/PushNotification/constantValues';
import { responsibleDepartment } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const { RangePicker } = DatePicker;

export const getCountryOptions = (countries, langKey) => {
  return countries?.map(country => {
    return {
      value: country?._id,
      label: country?.name?.[langKey],
    };
  });
};

export const FILTER_FORM = ({ t, langKey }) => ({
  DATE_RANGE: {
    component: RangePicker,
    wrapperProps: {
      lg: 6,
      xs: 24,
    },
    props: {
      name: 'dateRange',
      showTime: true,
      allowClear: true,
      className: 'w-100',
      ranges: {
        Today: [moment(), moment()],
        Month: [moment().startOf('month'), moment().endOf('month')],
      },
    },
  },
  PROMO_CODE: {
    component: Input,
    wrapperProps: {
      lg: 6,
      xs: 12,
    },
    props: {
      name: 'promoId',
      allowClear: true,
      placeholder: t('PROMO_CODE'),
      className: 'w-100',
    },
  },
  SERVICE_LIMIT: {
    component: TargetDomainSelect,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'domainType',
      label: false,
      allowClear: true,
      formItemClassName: 'w-100',
      placeholder: t('TARGET_SERVICE'),
    },
  },
  PROCESS_STATUS: {
    component: Select,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'processStatus',
      allowClear: true,
      placeholder: t('PROCESS_STATUS'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(notificationProcessStatus, langKey),
    },
  },
  SENDING_TYPE: {
    component: Select,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'sendingType',
      allowClear: true,
      placeholder: t('SENDING_TYPE'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(notificationSendTypeOptions, langKey),
    },
  },
  CUSTOM_LABEL: {
    component: Input,
    wrapperProps: {
      lg: 6,
      xs: 12,
    },
    props: {
      name: 'customTag',
      allowClear: true,
      placeholder: t('CUSTOM_LABEL'),
      className: 'w-100',
    },
  },
  NOTIFICATION_TEXT: {
    component: Input,
    wrapperProps: {
      lg: 6,
      xs: 12,
    },
    props: {
      name: 'message',
      allowClear: true,
      placeholder: t('PUSH_MESSAGE.LABEL'),
      className: 'w-100',
    },
  },
  CAMPAIGN: {
    component: Select,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'notificationType',
      allowClear: true,
      placeholder: t('NOTIFICATION_TYPE'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(notificationTypes, langKey),
    },
  },
  RESPONSIBLE_DEPARTMENT: {
    component: Select,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'responsibleDepartment',
      allowClear: true,
      placeholder: t('DEPARTMENT'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(responsibleDepartment, langKey),
    },
  },
  STATUS: {
    component: Select,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'status',
      allowClear: true,
      placeholder: t('STATUS'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(notificationStatusTypeOptions, langKey),
    },
  },
});
