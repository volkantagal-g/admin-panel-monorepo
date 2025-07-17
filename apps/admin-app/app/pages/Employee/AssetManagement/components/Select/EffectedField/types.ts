import { type SelectProps } from 'antd';

export interface IEffectedFieldProps {
  value?: number;
  onChange?: SelectProps['onChange'];
  className?: SelectProps['className'];
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  options?: Array<{
    label: string;
    key: string;
    options: Array<{
      label: string;
      value: string;
    }>;
  }>;
  form?: any;
}
