import { type SelectProps } from 'antd';

export interface ISelectGenderProps {
  value?: SelectProps['value'] | SelectProps['value'][];
  mode?: SelectProps['mode'];
  onChange: SelectProps['onChange'];
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  placeholder?: SelectProps['placeholder'];
  labelInValue?: SelectProps['labelInValue'];
  className?: SelectProps['className'];
}

export interface ISelectOption {
  value: string;
  label: string;
}
