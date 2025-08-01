import { type SelectProps } from 'antd';

import { ICompany } from '../../../types';

export interface ISelectCompanyProps {
  size?: SelectProps['size'];
  value?: SelectProps['value'] | SelectProps['value'][];
  mode?: SelectProps['mode'];
  onChange: SelectProps['onChange'];
  disabled?: SelectProps['disabled'];
  allowClear?: SelectProps['allowClear'];
  placeholder?: SelectProps['placeholder'];
  onBlur?: SelectProps['onBlur'];
  optionFilterProp?: SelectProps['optionFilterProp'];
  labelInValue?: SelectProps['labelInValue'];
  filterOption?: SelectProps['filterOption'];
  onSearch?: SelectProps['onSearch'];
  className?: SelectProps['className'];
  isFetchOptionsOnLoad?: boolean;
  initialSearchTerm?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
  data: ICompany;
}
