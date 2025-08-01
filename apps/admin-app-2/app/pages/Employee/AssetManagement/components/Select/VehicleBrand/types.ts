import { type SelectProps } from 'antd';

export interface ISelectVehicleBrandProps {
  value?: number;
  onChange?: SelectProps['onChange'];
  className?: SelectProps['className'];
  placeholder?: string;
  disabled?: boolean;
  form?: any;
  mode?: 'multiple' | 'tags' | undefined;
  allowClear: boolean;
}
