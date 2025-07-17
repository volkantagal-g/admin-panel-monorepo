import { Select as AntSelect, Checkbox, Input, Spin } from 'antd';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TRANSLATION_NAMESPACE } from '@app/pages/CommerceIntelligence/constants';
import { useStyles } from './styles';
import {
  SearchInputWithFloatingLabelProps,
  SelectWithFloatingLabelProps,
  XCommFloatingLabelComponent,
  XCommFloatingLabelProps,
} from './types';

const CloseIconCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="10" cy="10" r="9" fill="#697488" />
    <path d="M13 7L7 13M7 7L13 13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ThickDownArrow = () => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 8"
      fill="none"
      className={classes.arrowIcon}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.601472 0.751863C1.0701 0.283233 1.8299 0.283233 2.29853 0.751863L6.25 4.70333L10.2015
          0.751863C10.6701 0.283233 11.4299 0.283233 11.8985 0.751863C12.3672 1.22049 12.3672 1.98029
          11.8985 2.44892L7.09853 7.24892C6.6299 7.71755 5.8701 7.71755 5.40147 7.24892L0.601472
          2.44892C0.132843 1.98029 0.132843 1.22049 0.601472 0.751863Z"
        fill="#5D3EBC"
      />
    </svg>
  );
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d={[
        'M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333',
        'C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333',
        'C2 10.2789 4.38781 12.6667 7.33333 12.6667Z',
      ].join(' ')}
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SelectAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const MemoizedCheckbox = memo(({ checked, className }: { checked: boolean; className: string }) => (
  <Checkbox
    checked={checked}
    tabIndex={-1}
    className={className}
  />
));

const MemoizedOption = memo(({ labelText, isChecked, classes }: { labelText: string; isChecked: boolean; classes: any }) => (
  <div className={classes.optionContent}>
    <MemoizedCheckbox
      checked={isChecked}
      className={classes.optionCheckbox}
    />
    <span className={classes.optionText}>{labelText}</span>
  </div>
));

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
  filterOption = (input, option) => {
    const rawText = option?.rawLabel?.toLowerCase() || '';
    const searchText = input.toLowerCase().trim();
    const searchTerms = searchText.split(/\s+/);
    return searchTerms.every(term => rawText.includes(term));
  },
  loading = false,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useState<any>(null);
  const [localOptions, setLocalOptions] = useState<any[]>([]);
  const [localLoading, setLocalLoading] = useState(loading);
  const prevLoadingRef = React.useRef(loading);
  const classes = useStyles();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const { t } = useTranslation(TRANSLATION_NAMESPACE);

  useEffect(() => {
    if (form && name) {
      const formValue = form.getFieldValue(name);
      setInternalValue(formValue);
    }
  }, [form, name]);

  useEffect(() => {
    setLocalLoading(loading);

    if (!prevLoadingRef.current && loading) {
      setLocalOptions([]);
    }

    if (prevLoadingRef.current && !loading && optionsData && optionsData.length > 0) {
      setLocalOptions(optionsData);
    }

    prevLoadingRef.current = loading;
  }, [loading, optionsData]);

  useEffect(() => {
    if (!loading && optionsData && optionsData.length > 0) {
      setLocalOptions(optionsData);
    }
  }, [optionsData, loading]);

  const handleChange = useCallback((selectedValue: any) => {
    setInternalValue(selectedValue);
    if (form && name) {
      form.setFieldsValue({ [name]: selectedValue });
      form.submit();
    }
    if (onChange) {
      onChange(selectedValue, null as any);
    }
  }, [form, name, onChange]);

  const handleSearch = useCallback((searchValue: string) => {
    if (onSearch) {
      setLocalLoading(true);
      onSearch(searchValue);
    }
  }, [onSearch]);

  const handleClear = useCallback(() => {
    handleChange([]);
    const selectElement = document.querySelector('.ant-select-focused');
    if (selectElement) {
      selectElement.classList.remove('ant-select-focused');
    }
    setDropdownOpen(false);
  }, [handleChange]);

  const handleDropdownVisibleChange = useCallback(open => {
    if (isCleared && !open) {
      return;
    }
    setDropdownOpen(open);
    if (open) {
      setIsCleared(false);
    }
  }, [isCleared]);

  const value = propValue !== undefined ? propValue : internalValue;

  const valueSet = useMemo(() => new Set(value), [value]);

  const options = useMemo(() => {
    if (propOptions) return propOptions;

    return localOptions.map(option => {
      const labelText = typeof option.name === 'object'
        ? option.name.tr || option.name.en || ''
        : option.name || option.label || option.value;

      return {
        value: option.id || option.value,
        label: <MemoizedOption
          labelText={labelText}
          isChecked={valueSet.has(option.id || option.value)}
          classes={classes}
        />,
        rawLabel: labelText,
        name: labelText,
      };
    });
  }, [localOptions, propOptions, valueSet, classes]);

  const handleSelectAll = useCallback(() => {
    const allValues = options.map(option => option.value);
    handleChange(allValues);
  }, [handleChange, options]);

  const defaultIcon = useMemo(
    () => (
      <span className={`${classes.arrowIconWrapper} ${dropdownOpen ? 'isOpen' : ''}`}>
        <ThickDownArrow />
      </span>
    ),
    [classes.arrowIconWrapper, dropdownOpen],
  );

  const dropdownRender = useCallback((menu: React.ReactElement) => {
    const hasSelections = value?.length > 0;
    const buttonIcon = hasSelections ? <CloseIconCircle className={classes.closeIconCircle} /> : <SelectAllIcon />;
    const buttonText = hasSelections ? t('CLEAR_SELECTIONS') : t('SELECT_ALL');
    const buttonAction = hasSelections ? handleClear : handleSelectAll;
    const buttonAriaLabel = hasSelections ? t('CLEAR_SELECTIONS') : t('SELECT_ALL');

    return (
      <>
        <div className={classes.clearSelectionsHeader}>
          <button
            type="button"
            tabIndex={0}
            aria-label={buttonAriaLabel}
            onClick={e => {
              e.stopPropagation();
              buttonAction();
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                buttonAction();
              }
            }}
            className={classes.clearSelectionsButton}
          >
            {buttonIcon}
            {buttonText}
          </button>
        </div>
        {menu}
      </>
    );
  }, [value, handleClear, handleSelectAll, classes, t]);

  const customMaxTagCount = useCallback((omittedValues: any[]) => {
    return (
      <span className={classes.customMaxTagPlaceholder}>
        +{omittedValues.length}
      </span>
    );
  }, [classes.customMaxTagPlaceholder]);

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
        className={classes.selectFullWidth}
        loading={localLoading ?? loading}
        notFoundContent={localLoading ? <Spin size="small" /> : null}
        suffixIcon={defaultIcon}
        listHeight={356}
        virtual
        dropdownMatchSelectWidth
        optionFilterProp="name"
        mode="multiple"
        showSearch
        dropdownRender={dropdownRender}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        maxTagCount="responsive"
        maxTagTextLength={20}
        maxTagPlaceholder={customMaxTagCount}
      />
    </XCommFloatingLabelBase>
  );
};

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
      icon={null}
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
        className={`${classes.searchInput} ${classes.selectFullWidth}`}
        prefix={defaultIcon}
      />
    </XCommFloatingLabelBase>
  );
};

export const XCommFloatingLabel = XCommFloatingLabelBase as XCommFloatingLabelComponent;
XCommFloatingLabel.Select = Select;
XCommFloatingLabel.SearchInput = SearchInput;

export type { SearchInputWithFloatingLabelProps, SelectWithFloatingLabelProps, XCommFloatingLabelProps } from './types';
