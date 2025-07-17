import { type SelectProps } from 'antd';

export interface IShortLongTermRentingCompanyProps {
  value?: number;
  className?: SelectProps['className'];
  placeholder?: string;
  disabled?: boolean;
  allowClear: boolean;
  onChange?: SelectProps['onChange'];
}
