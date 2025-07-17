import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';

import { bannerTypes, componentTypes, statusTypeOptions } from '@app/pages/Banner/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import BannerPageSelect from '@shared/containers/Marketing/Select/PageOptionSelect';
import { ADMIN_PANEL_CONFIGS, DEVICE_TYPES } from '@shared/shared/constants';
import { convertPlatformOptions } from '@app/pages/Banner/utils';

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
      lg: 4,
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
      lg: 5,
      xs: 12,
    },
    props: {
      name: 'description',
      allowClear: true,
      placeholder: t('DESCRIPTION'),
      className: 'w-100',
    },
  },
  TARGET_SERVICE: {
    component: TargetDomainSelect,
    wrapperProps: {
      lg: 4,
      xs: 12,
    },
    props: {
      fieldName: 'targetDomain',
      name: 'targetDomain',
      label: false,
      allowClear: true,
      className: 'w-100',
      placeholder: t('TARGET_SERVICE'),
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
  CUSTOM_LABEL: {
    component: Input,
    wrapperProps: {
      lg: 8,
      xs: 12,
    },
    props: {
      name: 'customTag',
      allowClear: true,
      placeholder: t('CUSTOM_LABEL'),
      className: 'w-100',
    },
  },
  BANNER_TYPE: {
    component: Select,
    wrapperProps: {
      md: 4,
      xs: 12,
    },
    props: {
      name: 'bannerType',
      allowClear: true,
      placeholder: t('BANNER_TYPE'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(bannerTypes, langKey),
    },
  },

  PAGES: {
    component: BannerPageSelect,
    wrapperProps: {
      md: 5,
      xs: 12,
    },
    props: {
      configKey: ADMIN_PANEL_CONFIGS?.BANNER_ELIGIBLE_IN_APP_PAGES,
      fieldName: 'pageIds',
      maxTagCount: 1,
      allowClear: true,
      mode: 'multiple',
      inline: true,
      label: false,
      placeholder: t('PAGES'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(componentTypes, langKey),
    },
  },
  COMPONENT_TYPE: {
    component: Select,
    wrapperProps: {
      md: 4,
      xs: 12,
    },
    props: {
      name: 'componentType',
      allowClear: true,
      placeholder: t('COMPONENT_TYPE'),
      className: 'w-100',
      options: convertConstantValuesToSelectOptions(componentTypes, langKey),
    },
  },
  PLATFORM: {
    component: Select,
    wrapperProps: {
      md: 3,
      xs: 12,
    },
    props: {
      name: 'deviceTypes',
      mode: 'multiple',
      allowClear: true,
      placeholder: t('PLATFORM'),
      className: 'w-100',
      options: convertPlatformOptions(DEVICE_TYPES),
    },
  },
});
