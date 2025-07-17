import { type SelectProps } from 'antd';

export interface ISelectAssignmentStatusProps {
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange'];
  placeholder?: string;
  value?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
}
