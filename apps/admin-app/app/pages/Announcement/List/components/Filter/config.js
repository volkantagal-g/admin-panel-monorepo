import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { statusTypeOptions } from '@app/pages/Announcement/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

const { RangePicker } = DatePicker;

export const FILTER_FORM = ({ t, langKey }) => ({
  DATE_RANGE: {
    component: RangePicker,
    wrapperProps: {
      md: 8,
      xs: 24,
    },
    props: {
      name: 'dateRange',
      showTime: true,
      className: 'w-100',
      allowClear: true,
      ranges: {
        Today: [moment(), moment()],
        Month: [moment().startOf('month'), moment().endOf('month')],
      },
    },
  },
  TITLE: {
    component: Input,
    wrapperProps: {
      lg: 6,
      xs: 12,
    },
    props: {
      name: 'title',
      allowClear: true,
      placeholder: t('TITLE'),
      className: 'w-100',
    },
  },
  DESCRIPTION: {
    component: Input,
    wrapperProps: {
      lg: 7,
      xs: 12,
    },
    props: {
      name: 'description',
      allowClear: true,
      placeholder: t('DESCRIPTION'),
      className: 'w-100',
    },
  },
  STATUS: {
    component: Select,
    wrapperProps: {
      md: 3,
      xs: 12,
    },
    props: {
      name: 'status',
      allowClear: true,
      placeholder: t('STATUS'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(statusTypeOptions, langKey),
    },
  },
});
