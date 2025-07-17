import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';

import moment, { Moment } from 'moment';

import { IDateRangeProps } from './types';

const { RangePicker } = DatePicker;
const DateRange: React.FC<IDateRangeProps> = (props: IDateRangeProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled } = props || {};

  return (
    <RangePicker
      className={className ? `${className} w-100` : 'w-100'}
      disabled={disabled}
      // @ts-ignore
      onChange={onChange}
      placeholder={[t('assetManagement:DATE_RANGE.START_DATE'), t('assetManagement:DATE_RANGE.END_DATE')]}
      disabledDate={(current: Moment) => current && current > moment().endOf('day')}
    />
  );
};

export default DateRange;
