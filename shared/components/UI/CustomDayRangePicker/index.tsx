import { DatePicker } from 'antd';
import type { Moment } from 'moment';
import { useState } from 'react';

const { RangePicker } = DatePicker;

type RangeValue = [Moment | null, Moment | null] | null;

type CustomDayRangePickerProps = {
  value?: RangeValue
  rangeInDays?: number
  onChange?: (val: RangeValue) => void
  disabled?: boolean
  format?: string
  className?: string
  allowClear?: boolean
}

// TODO: DatePickerProps is not suitable for RangePicker
/* type CustomDayRangePickerProps = DatePickerProps & ExtendedCustomDayRangePickerProps */

const CustomDayRangePicker = (props: CustomDayRangePickerProps) => {
  const { value, onChange, rangeInDays = 365, className = '', disabled, format, allowClear = true, ...rest } = props;

  const [dates, setDates] = useState<RangeValue>(null);

  const disabledDate = (current: Moment) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > rangeInDays;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > rangeInDays;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    }
    else {
      setDates(null);
    }
  };

  return (
    <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={val => setDates(val)}
      onOpenChange={onOpenChange}
      onChange={onChange}
      disabled={disabled}
      format={format}
      allowClear={allowClear}
      className={className}
      {...rest}
    />
  );
};

CustomDayRangePicker.defaultProps = {
  value: null,
  rangeInDays: 365,
  onChange: null,
  disabled: false,
  format: null,
  className: null,
  allowClear: true,
};

export default CustomDayRangePicker;
