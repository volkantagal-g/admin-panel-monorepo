import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { statusTypeOptions } from '@app/pages/Sms/constantValues';
import { responsibleDepartment } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

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
      allowClear: true,
      className: 'w-100',
      ranges: {
        Today: [moment(), moment()],
        Month: [moment().startOf('month'), moment().endOf('month')],
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
      fieldName: 'domainType',
      name: 'domainType',
      label: false,
      allowClear: true,
      className: 'w-100',
      formItemClassName: 'w-100',
      placeholder: t('TARGET_SERVICE'),
    },
  },
  RESPONSIBLE_DEPARTMENT: {
    component: Select,
    wrapperProps: {
      md: 4,
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
  CUSTOM_LABEL: {
    component: Input,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      name: 'customTag',
      allowClear: true,
      placeholder: t('CUSTOM_LABEL'),
      className: 'w-100',
    },
  },
  STATUS: {
    component: Select,
    wrapperProps: {
      md: 4,
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
