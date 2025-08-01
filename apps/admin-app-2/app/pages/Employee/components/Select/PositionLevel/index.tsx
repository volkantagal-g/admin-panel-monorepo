import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { POSITION_LEVELS } from '../../../constants';
import { ISelectPositionLevel } from './types';

const SelectPositionLevel = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectPositionLevel) => {
  const { t } = useTranslation(['employeePage']);
  const positionLevelSelectOptions = convertConstantValuesToTranslatedSelectOptions(POSITION_LEVELS, { translationBaseKey: 'employeePage:POSITION_LEVELS' });

  return (
    <Select
      value={value}
      mode={mode}
      options={positionLevelSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeePage:POSITION_LEVEL')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectPositionLevel;
