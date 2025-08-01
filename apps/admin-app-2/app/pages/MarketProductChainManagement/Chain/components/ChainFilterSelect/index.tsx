import { Select, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';

import { getSelectFilterOption } from '@shared/utils/common';
import useStyles from './styles';

interface ChainFilterSelectOption {
  readonly id: string;
  readonly name: string;
}

interface ChainFilterSelectProps {
  value?: any;
  onChange?: (value: any) => void;
  name: string;
  label: string;
  form?: FormInstance;
  optionsData: readonly ChainFilterSelectOption[];
  disabled?: boolean;
  showSearch?: boolean;
  mode?: 'multiple' | 'tags' | 'single';
  allowClear?: boolean;
  onSearch?: (value: string) => void;
  loading?: boolean;
}

const ChainFilterSelect: React.FC<ChainFilterSelectProps> = ({
  value: propValue,
  onChange: propOnChange,
  name,
  label,
  form,
  optionsData,
  disabled = false,
  showSearch = true,
  mode,
  allowClear = true,
  onSearch,
  loading = false,
}) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState<any>(null);

  useEffect(() => {
    if (form) {
      const formValue = form.getFieldValue(name);
      setInternalValue(formValue);
    }
  }, [form, name]);

  const options = optionsData.map(option => ({
    value: option.id,
    label: option.name,
  }));

  const handleChange = (selectedValue: any) => {
    setInternalValue(selectedValue);
    if (propOnChange) {
      propOnChange(selectedValue);
    }
  };

  const value = propValue !== undefined ? propValue : internalValue;
  const hasValue = Array.isArray(value)
    ? value.length > 0
    : value !== undefined && value !== null && value !== '';

  return (
    <div className={classes.selectWrapper}>
      <Select
        value={value}
        onChange={handleChange}
        options={options}
        mode={mode === 'single' ? undefined : mode}
        showSearch={showSearch}
        filterOption={getSelectFilterOption}
        disabled={disabled}
        allowClear={allowClear}
        onSearch={onSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ width: '100%' }}
        loading={loading}
        notFoundContent={loading ? <Spin size="small" /> : null}
      />
      <span className={`${classes.floatingLabel} ${(isFocused || hasValue) ? classes.floatingLabelActive : ''}`}>
        {label}
      </span>
    </div>
  );
};

export default ChainFilterSelect;
