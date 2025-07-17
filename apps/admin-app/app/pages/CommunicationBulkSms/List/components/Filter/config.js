import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { activenessStatus } from '@app/pages/CommunicationBulkSms/constantValues';

const { RangePicker } = DatePicker;

export const FILTER_FORM = ({ t, configData }) => {
  return ({
    SMS_TYPE: {
      component: Select,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'smsType',
        allowClear: true,
        placeholder: t('SMS_TYPE'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(configData?.smsTypes, false),
      },
    },
    DESCRIPTION: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'description',
        allowClear: true,
        placeholder: t('CUSTOM_LABEL'),
        className: 'w-100',
      },
    },
    ACTIVENESS_STATUS: {
      component: Select,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'activenessStatus',
        allowClear: true,
        placeholder: t('ACTIVENESS_STATUS'),
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(activenessStatus, false),
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
        },
      },
    },
  });
};
