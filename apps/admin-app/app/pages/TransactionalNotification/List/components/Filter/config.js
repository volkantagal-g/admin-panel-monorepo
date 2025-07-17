import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const { RangePicker } = DatePicker;

export const FILTER_FORM = ({ t, config }) => {
  return ({
    ID: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'id',
        allowClear: true,
        placeholder: 'Id',
        className: 'w-100',
      },
    },
    DATE_RANGE: {
      component: RangePicker,
      wrapperProps: {
        md: 8,
        xs: 24,
      },
      props: {
        name: 'dateRange',
        showTime: true,
        allowClear: true,
        className: 'w-100',
        ranges: {
          Today: [moment().startOf('day'), moment().endOf('day')],
          Month: [moment().startOf('month'), moment().endOf('month')],
          Year: [moment().startOf('year'), moment().endOf('year')],
        },
      },
    },
    TARGET_SERVICE: {
      component: TargetDomainSelect,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'domainType',
        allowClear: true,
        label: false,
        placeholder: t('TARGET_SERVICE'),
        className: 'w-100',
      },
    },
    TYPE: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'type',
        allowClear: true,
        placeholder: t('SENDER'),
        disabled: config?.isConfigPending,
        loading: config?.isConfigPending,
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(config?.configData.types, false),
      },
    },
    NOTIFICATION_TYPE: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'notificationType',
        allowClear: true,
        placeholder: t('TYPE'),
        disabled: config?.isConfigPending,
        loading: config?.isConfigPending,
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(config?.configData.notificationTypes, false),
      },
    },
    CONTENT: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'text',
        allowClear: true,
        placeholder: t('TEXT_SEARCH'),
        className: 'w-100',
      },
    },
  });
};
