import { DatePicker } from 'antd';

import { IDateRangeProps } from './types';

const { RangePicker } = DatePicker;
const FinancialLeasingDateRange: React.FC<IDateRangeProps> = (props: IDateRangeProps) => {
  const { className, onChange, value, disabled } = props || {};
  return (
    <RangePicker
      className={className ? `${className} w-100` : 'w-100'}
      disabled={disabled}
      allowClear={false}
      value={value}
      // @ts-ignore
      onChange={onChange}
    />
  );
};

export default FinancialLeasingDateRange;
