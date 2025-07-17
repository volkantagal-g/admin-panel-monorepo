import { type SelectProps } from 'antd';

export interface ISelectVehicleIsCommonCarProps {
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange'];
  placeholder?: string;
  value?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
}
