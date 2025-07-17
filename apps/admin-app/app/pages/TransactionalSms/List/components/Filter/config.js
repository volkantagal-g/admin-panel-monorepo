import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { transactionalSmsDomainTypes } from '@app/pages/TransactionalSms/constantValues';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { convertDomainTypes } from '@app/pages/TransactionalSms/utils';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

const { RangePicker } = DatePicker;

export const FILTER_FORM = ({ t, activeDomainsFromConfig, config }) => {
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
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'targetService',
        allowClear: true,
        placeholder: t('TARGET_SERVICE'),
        className: 'w-100',
        options: convertDomainTypes(
          transactionalSmsDomainTypes,
          activeDomainsFromConfig?.customValue?.[getSelectedCountry()?.code?.alpha2],
        ),
      },
    },
    SMS_TYPE: {
      component: Select,
      wrapperProps: {
        md: 4,
        xs: 12,
      },
      props: {
        name: 'smsType',
        allowClear: true,
        placeholder: t('TYPE'),
        disabled: config?.isConfigPending,
        loading: config?.isConfigPending,
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(config?.configData?.smsTypes, false),
      },
    },
  });
};
