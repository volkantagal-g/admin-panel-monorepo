import { FC, ReactNode, ChangeEvent, KeyboardEvent } from 'react';
import { SelectProps } from 'antd/lib/select';
import { InputProps } from 'antd/lib/input';
import { FormInstance } from 'antd/lib/form';

export interface XCommFloatingLabelProps {
  /** Label text to be displayed */
  label: string;
  /** Error state of the input */
  error?: boolean;
  /** Child component (input, select, etc.) */
  children: ReactNode;
  /** Icon to be displayed */
  icon?: ReactNode;
  /** Additional class name */
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
