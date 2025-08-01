import { type SelectProps } from 'antd';

export interface ISelectVehicleTransmissionTypeProps {
  className?: SelectProps['className'];
  onChange?: SelectProps['onChange']
  placeholder?: string;
  value?: number;
  disabled?: boolean;
}
