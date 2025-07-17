import { type SelectProps } from 'antd';

export interface ISelectCityProps {
  value?: SelectProps['value'] | SelectProps['value'][];
  mode?: SelectProps['mode'];
  onChange: SelectProps['onChange'];
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  placeholder?: SelectProps['placeholder'];
  labelInValue?: SelectProps['labelInValue'];
  className?: SelectProps['className'];
  country?: MongoIDType;
}

export interface ISelectOption {
  value: string;
  label: string;
  data: ICity;
}
