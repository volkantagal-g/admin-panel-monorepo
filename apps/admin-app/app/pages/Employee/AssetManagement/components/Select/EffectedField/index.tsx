import React from 'react';
import { Select, Cascader } from 'antd';

import { IEffectedFieldProps } from './types';
import { getLangKey } from '@shared/i18n.ts';

const EffectedField: React.FC<IEffectedFieldProps> = (props: IEffectedFieldProps) => {
  const { value, className, onChange, placeholder, disabled, allowClear, form, options } = props || {};
  const langKey = getLangKey();

  const updatedOptions = (options || []).map((option: any) => (
    {
      label: option.label[langKey],
      value: option.key,
      children: (option.options || [])?.map((subOption: any) => ({
        label: subOption.label[langKey],
        value: subOption?.modelType ? `${option.key}_${subOption.value}_${subOption.modelType}` : `${option.key}_${subOption.value}`,
      })),
    }
  ));

  return (
    <Cascader
      disabled={disabled}
      className={className}
      options={updatedOptions}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      showSearch
    />
  );
};

export default EffectedField;
