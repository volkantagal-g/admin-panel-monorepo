import React, { ChangeEventHandler, SetStateAction } from 'react';
import { FormInstance, FormItemProps, type SelectProps } from 'antd';

export interface IDynamicAssetFormItemProps {
  form?: FormInstance
  itemConfig?: any;
  onChange?: SelectProps['onChange'];
  rules?: FormItemProps['rules'];
  externalFormStates?: {[key: string]: { value: any, setValue: React.Dispatch<SetStateAction<any>>}}
  disabled?: boolean;
  mode?: string;
}

export interface IDynamicAssetInputProps {
  form?: FormInstance
  itemConfig?: any;
  onChange?: SelectProps['onChange'] | ChangeEventHandler<HTMLInputElement>;
  externalFormStates?: {[key: string]: {value: any, setValue: React.Dispatch<SetStateAction<any>>}}
  disabled?: boolean;
  value?: any;
  mode?: string;
}
