import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { EDUCATION_STATUSES } from '../../../constants';
import { ISelectEducationStatusProps } from './types';

const SelectEducationStatus = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectEducationStatusProps) => {
  const { t } = useTranslation(['employeePage']);

  const educationStatusSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    EDUCATION_STATUSES,
    { translationBaseKey: 'employeePage:EDUCATION_STATUSES' },
  );

  return (
    <Select
      value={value}
      mode={mode}
      options={educationStatusSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeePage:EDUCATION_STATUS')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectEducationStatus;
