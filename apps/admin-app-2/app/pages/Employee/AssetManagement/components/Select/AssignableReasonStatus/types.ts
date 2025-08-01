import { type SelectProps } from 'antd';

export interface ISelectAssignableStatusProps {
  value?: number;
  onChange?: SelectProps['onChange'];
  className?: SelectProps['className'];
  placeholder?: string;
  disabled?: boolean;
  form?: any;
  assignableStatus?: number;
  allowClear?: boolean;
}
