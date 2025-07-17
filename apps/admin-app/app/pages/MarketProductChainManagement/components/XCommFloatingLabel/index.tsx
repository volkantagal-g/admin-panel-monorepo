import { Select as AntSelect, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { getSelectFilterOption } from '@shared/utils/common';
import { useStyles } from './styles';
import {
  SearchInputWithFloatingLabelProps,
  SelectWithFloatingLabelProps,
  XCommFloatingLabelComponent,
  XCommFloatingLabelProps,
} from './types';

// Custom SVG down arrow icon
const ThickDownArrow = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Search Icon SVG
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={[
        'M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333',
        'C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333',
        'C2 10.2789 4.38781 12.6667 7.33333 12.6667Z',
      ].join(' ')}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Base FloatingLabel Component
const XCommFloatingLabelBase: React.FC<XCommFloatingLabelProps> = ({
  label,
  error,
  children,
  icon,
  className,
}) => {
  const classes = useStyles();

  const containerClasses = [
    classes.floatingLabelContainer,
    error ? classes.error : '',
    className || '',
  ].join(' ');

  return (
    <div className={containerClasses}>
      {children}
      <span className="flabel">{label}</span>
      {icon && <span className={classes.icon}>{icon}</span>}
    </div>
  );
};

// Select with FloatingLabel
const Select: React.FC<SelectWithFloatingLabelProps> = ({
  label,
  error,
  name,
  form,
  optionsData = [],
  onChange,
  value: propValue,
  options: propOptions,
  icon,
  onSearch,
  filterOption = getSelectFilterOption,
  loading = false,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useState<any>(null);
  const [localOptions, setLocalOptions] = useState<any[]>([]);
  const [localLoading, setLocalLoading] = useState(loading);
  const prevLoadingRef = React.useRef(loading);

  // Sync form values when form or name changes
  useEffect(() => {
    if (form && name) {
      const formValue = form.getFieldValue(name);
      setInternalValue(formValue);
    }
  }, [form, name]);

  // Sync loading state for better UI feedback
  useEffect(() => {
    setLocalLoading(loading);

    if (!prevLoadingRef.current && loading) {
      setLocalOptions([]);
    }

    // When loading changes from true to false, that's when we update options
    if (prevLoadingRef.current && !loading && optionsData && optionsData.length > 0) {
      setLocalOptions(optionsData);
    }

    prevLoadingRef.current = loading;
  }, [loading, optionsData]);

  // Also sync options when optionsData changes (for initial load and non-search cases)
  useEffect(() => {
    if (!loading && optionsData && optionsData.length > 0) {
      setLocalOptions(optionsData);
    }
  }, [optionsData, loading]);

  const handleChange = (selectedValue: any) => {
    setInternalValue(selectedValue);
    if (form && name) {
      form.setFieldsValue({ [name]: selectedValue });
      form.submit();
    }
    if (onChange) {
      onChange(selectedValue, null as any);
    }
  };

  const value = propValue !== undefined ? propValue : internalValue;

  // Format options based on the provided data structure
  const options = propOptions || localOptions.map(option => ({
    value: option.id || option.value,
    label: typeof option.name === 'object'
      ? (option.name.tr || option.name.en || '')
      : (option.name || option.label || option.value),
  }));

  const defaultIcon = <ThickDownArrow />;

  const handleSearch = (searchValue: string) => {
    if (onSearch) {
      // Temizlemiyoruz ki loading sırasında kullanıcı görmeye devam etsin
      // setLocalOptions([]);
      setLocalLoading(true);
      onSearch(searchValue);
    }
  };

  return (
    <XCommFloatingLabelBase
      label={label}
      error={error}
      icon={icon !== undefined ? icon : defaultIcon}
    >
      <AntSelect
        {...restProps}
        value={value}
        onChange={handleChange}
        options={options}
        filterOption={filterOption}
        onSearch={handleSearch}
        style={{ width: '100%' }}
        loading={localLoading ?? loading}
        notFoundContent={localLoading ? <Spin size="small" /> : null}
        suffixIcon={null} // Remove default AntSelect suffix icon
        listHeight={256} // Dropdown yüksekliği
        virtual // Virtual scrolling etkinleştir
        dropdownMatchSelectWidth={false} // Dropdown genişliğini select'e göre ayarlama
      />
    </XCommFloatingLabelBase>
  );
};

// SearchInput with FloatingLabel
const SearchInput: React.FC<SearchInputWithFloatingLabelProps> = ({
  label,
  error,
  name,
  form,
  onChange,
  value: propValue,
  onSearch,
  icon,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    if (form && name) {
      const formValue = form.getFieldValue(name);
      setInternalValue(formValue || '');
    }
  }, [form, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    if (form && name) {
      form.setFieldsValue({ [name]: newValue });
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(internalValue);
    }

    if (form && name) {
      form.submit();
    }
  };

  const value = propValue !== undefined ? propValue : internalValue;
  const defaultIcon = <SearchIcon />;

  return (
    <XCommFloatingLabelBase
      label={label}
      error={error}
      icon={icon !== undefined ? icon : defaultIcon}
      className={classes.searchInputContainer}
    >
      <Input
        {...restProps}
        value={value}
        onChange={handleChange}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        style={{ width: '100%' }}
      />
    </XCommFloatingLabelBase>
  );
};

// Create the component with its sub-components
export const XCommFloatingLabel = XCommFloatingLabelBase as XCommFloatingLabelComponent;
XCommFloatingLabel.Select = Select;
XCommFloatingLabel.SearchInput = SearchInput;

export type { SearchInputWithFloatingLabelProps, SelectWithFloatingLabelProps, XCommFloatingLabelProps } from './types';
