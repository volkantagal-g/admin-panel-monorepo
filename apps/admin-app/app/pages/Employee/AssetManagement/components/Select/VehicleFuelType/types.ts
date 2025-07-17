import { type SelectProps } from 'antd';

export interface ISelectVehicleFuelTypeProps {
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange'];
  placeholder?: string;
  value?: number;
  disabled?: boolean;
}
