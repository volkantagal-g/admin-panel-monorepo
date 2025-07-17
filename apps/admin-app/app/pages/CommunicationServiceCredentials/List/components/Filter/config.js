import { DatePicker, Input } from 'antd';
import moment from 'moment';

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
    NAME: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'name',
        allowClear: true,
        placeholder: t('NAME'),
        className: 'w-100',
      },
    },
    TEAM_NAME: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'teamName',
        allowClear: true,
        placeholder: t('TEAM_NAME'),
        className: 'w-100',
      },
    },
    TRIBE_NAME: {
      component: Input,
      wrapperProps: {
        lg: 4,
        xs: 12,
      },
      props: {
        name: 'tribeName',
        allowClear: true,
        placeholder: t('TRIBE_NAME'),
        className: 'w-100',
      },
    },
  });
};
