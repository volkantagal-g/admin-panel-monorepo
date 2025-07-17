import { type SelectProps } from 'antd';

export interface ISelectAssignmentPeriodTypeProps {
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange'];
  placeholder?: string;
  value?: number;
  disabled?: boolean;
  allowClear?: boolean;
}
