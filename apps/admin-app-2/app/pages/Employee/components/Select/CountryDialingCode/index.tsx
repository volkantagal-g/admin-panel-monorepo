import React from 'react';
import { Select } from 'antd';

import { getSelectFilterOption } from '@shared/utils/common';
import { INTERNATIONAL_DIALING_CODES } from '../../../constants';
import { ISelectCountryDialingCodeProps } from './types';

const SelectCountryDialingCode = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectCountryDialingCodeProps) => {
  const countryDialingCodes = INTERNATIONAL_DIALING_CODES.filter(country => country?.value?.dialingCode).map(country => ({
    value: country.value.dialingCode,
    label: `${country.value.countryCode} (${country.value.dialingCode})`,
  }));

  return (
    <Select
      value={value}
      mode={mode}
      options={countryDialingCodes}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectCountryDialingCode;
