import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { CALLBACK_TYPES } from '@app/pages/CommunicationCallbackUrls/constants';

const { RangePicker } = DatePicker;

export const FILTER_FORM = ({ t }) => {
  return ({
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
        },
      },
    },
    CALLBACK_TYPE: {
      component: Select,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'callbackType',
        allowClear: true,
        placeholder: t('CALLBACK_TYPE'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(CALLBACK_TYPES, false),
      },
    },
    URL: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'url',
        allowClear: true,
        placeholder: t('CALLBACK_URL'),
        className: 'w-100',
      },
    },
    SERVICE_NAME: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'serviceName',
        allowClear: true,
        placeholder: t('SERVICE_NAME'),
        className: 'w-100',
      },
    },
  });
};
