import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ disabledDate, onDateRangeChange, selectedMonthDateRange, className }) => {
  return (
    <RangePicker
      disabledDate={disabledDate}
      onCalendarChange={onDateRangeChange}
      value={selectedMonthDateRange}
      className={className}
      allowClear={false}
    />
  );
};

export default DateRangePicker;
