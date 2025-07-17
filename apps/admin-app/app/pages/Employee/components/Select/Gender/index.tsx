import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { GENDERS } from '../../../constants';
import { ISelectGenderProps } from './types';

const SelectGender = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectGenderProps) => {
  const { t } = useTranslation(['employeePage']);
  const genderSelectOptions = convertConstantValuesToTranslatedSelectOptions(GENDERS, { translationBaseKey: 'employeePage:GENDER_TYPES' });

  return (
    <Select
      value={value}
      mode={mode}
      options={genderSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeePage:GENDER')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectGender;
