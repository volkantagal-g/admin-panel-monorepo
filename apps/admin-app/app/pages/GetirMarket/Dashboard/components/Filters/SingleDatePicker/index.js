import { DatePicker } from 'antd';

const SingleDatePicker = ({ disabledDate, onDateRangeChange, selectedDate, className }) => {
  return (
    <DatePicker
      disabledDate={disabledDate}
      onChange={onDateRangeChange}
      value={selectedDate}
      className={className}
      allowClear={false}
    />
  );
};

export default SingleDatePicker;
