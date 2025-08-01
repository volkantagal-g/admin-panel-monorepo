import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { EDUCATION_LEVELS } from '../../../constants';
import { ISelectEducationLevelProps } from './types';

const SelectEducationLevel = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectEducationLevelProps) => {
  const { t } = useTranslation(['employeePage']);

  const educationLevelSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    EDUCATION_LEVELS,
    { translationBaseKey: 'employeePage:EDUCATION_LEVELS' },
  );

  return (
    <Select
      value={value}
      mode={mode}
      options={educationLevelSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeePage:EDUCATION_LEVEL')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectEducationLevel;
