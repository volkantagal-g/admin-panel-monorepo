import { Input, Select } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { assetTypes, statusTypes } from '@app/pages/MarketingApproval/constantValues';

export const FILTER_FORM = ({ t, langKey }) => ({
  PROMO_CODE: {
    component: Input,
    wrapperProps: {
      lg: 12,
      xs: 12,
    },
    props: {
      name: 'promoCode',
      allowClear: true,
      placeholder: t('PROMO_CODE'),
      className: 'w-100',
    },
  },
  TYPE: {
    component: Select,
    wrapperProps: {
      lg: 6,
      xs: 12,
    },
    props: {
      name: 'assets',
      mode: 'multiple',
      allowClear: true,
      placeholder: t('TYPE'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(assetTypes, langKey),
    },
  },
  STATUS: {
    component: Select,
    wrapperProps: {
      lg: 6,
      xs: 12,
    },
    props: {
      name: 'statuses',
      allowClear: true,
      mode: 'multiple',
      placeholder: t('STATUS'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(statusTypes, langKey),
    },
  },
});
