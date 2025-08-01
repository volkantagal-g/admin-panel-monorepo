import { type SelectProps } from 'antd';

export interface ISelectVehicleModelYearProps {
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange'];
  placeholder?: string;
  value?: number;
  disabled?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
  allowClear: boolean;
}
