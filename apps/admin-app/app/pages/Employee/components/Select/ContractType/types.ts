import { type SelectProps } from 'antd';

export interface IContractTypeProps {
  value?: SelectProps['value'] | SelectProps['value'][];
  mode?: SelectProps['mode'];
  onChange: SelectProps['onChange'];
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  placeholder?: SelectProps['placeholder'];
  labelInValue?: SelectProps['labelInValue'];
  className?: SelectProps['className'];
}
