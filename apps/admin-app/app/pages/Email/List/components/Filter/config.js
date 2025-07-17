import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { emailProcessStatus, statusTypeOptions } from '@app/pages/Email/constantValues';
import { responsibleDepartment } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const { RangePicker } = DatePicker;

export const FILTER_FORM = ({ t, langKey }) => ({
  DATE_RANGE: {
    component: RangePicker,
    wrapperProps: {
      md: 6,
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
      allowClear: true,
      label: false,
      placeholder: t('TARGET_SERVICE'),
      className: 'w-100',
    },
  },
  PROCESS_STATUS: {
    component: Select,
    wrapperProps: {
      md: 4,
      xs: 12,
    },
    props: {
      name: 'processStatus',
      allowClear: true,
      placeholder: t('PROCESS_STATUS'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(emailProcessStatus, langKey),
    },
  },
  RESPONSIBLE_DEPARTMENT: {
    component: Select,
    wrapperProps: {
      md: 3,
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
  CUSTOM_TAG: {
    component: Input,
    wrapperProps: {
      md: 4,
      xs: 24,
    },
    props: {
      name: 'customTag',
      allowClear: true,
      className: 'w-100',
      placeholder: t('CUSTOM_LABEL'),
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
