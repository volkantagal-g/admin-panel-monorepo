import { FormInstance } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ChangeEvent, FC, ReactNode } from 'react';

export type SVGImport = any;

export interface XCommFloatingLabelProps {
  label: string;
  error?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export interface SelectWithFloatingLabelProps extends SelectProps {
  label: string;
  error?: boolean;
  name?: string;
  form?: FormInstance;
  optionsData?: Array<{ id?: string; name?: string; label?: string; value?: string }>;
  icon?: ReactNode;
}

export interface SearchInputWithFloatingLabelProps extends Omit<InputProps, 'onChange' | 'form'> {
  label: string;
  error?: boolean;
  name?: string;
  form?: FormInstance;
  onSearch?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
}

export interface XCommFloatingLabelComponent extends FC<XCommFloatingLabelProps> {
  Select: FC<SelectWithFloatingLabelProps>;
  SearchInput: FC<SearchInputWithFloatingLabelProps>;
}
