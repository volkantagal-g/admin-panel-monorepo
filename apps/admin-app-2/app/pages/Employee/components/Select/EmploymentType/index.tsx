import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { EMPLOYMENT_TYPES } from '../../../constants';
import { ISelectEmploymentTypeProps } from './types';

const SelectEmploymentType = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectEmploymentTypeProps) => {
  const { t } = useTranslation(['employeePage']);

  const employmentTypeSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    EMPLOYMENT_TYPES,
    { translationBaseKey: 'employeePage:EMPLOYMENT_TYPES' },
  );

  return (
    <Select
      value={value}
      mode={mode}
      options={employmentTypeSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeePage:EMPLOYMENT_TYPE')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectEmploymentType;
