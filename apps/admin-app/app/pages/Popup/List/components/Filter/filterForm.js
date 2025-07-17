import { Input, Select, DatePicker } from 'antd';
import moment from 'moment';

import { popupStatusTypeOptions, popupTypeOptions } from '@app/pages/Popup/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

export const FILTER_FORM = ({ t }) => {
  const { RangePicker } = DatePicker;
  return ({
    DATE_RANGE: {
      component: RangePicker,
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
    POPUP_ID: {
      component: Input,
      props: {
        name: 'id',
        placeholder: t('POPUP_ID'),
        allowClear: true,
        className: 'w-100',
      },
    },
    POPUP_TITLE: {
      component: Input,
      props: {
        name: 'title',
        allowClear: true,
        className: 'w-100',
        placeholder: t('POPUP_TITLE'),
      },
    },
    CAMPAIGN: {
      component: Select,
      props: {
        allowClear: true,
        className: 'w-100',
        options: convertConstantValuesToSelectOptions(popupTypeOptions),
        name: 'type',
        placeholder: t('POPUP_TYPE'),
      },
    },
    TARGET_SERVICE: {
      component: TargetDomainSelect,
      props: {
        fieldName: 'domainType',
        name: 'domainType',
        label: false,
        allowClear: true,
        className: 'w-100',
        placeholder: t('TARGET_SERVICE'),
      },
    },
    STATUS: {
      component: Select,
      props: {
        name: 'status',
        allowClear: true,
        className: 'w-100',
        labelInValue: true,
        placeholder: t('STATUS'),
        options: convertConstantValuesToSelectOptions(popupStatusTypeOptions),
      },
    },
  });
};
