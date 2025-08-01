import { type SelectProps } from 'antd';

export interface ISelectVehicleModelProps {
  value?: number;
  brand?: number;
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange'];
  placeholder?: string;
  disabled?: boolean;
  form?: any;
  mode?: 'multiple' | 'tags' | undefined;
  allowClear: boolean;
}
