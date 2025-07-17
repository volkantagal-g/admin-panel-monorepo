import { type SelectProps } from 'antd';

export interface IDateRangeProps {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}
