import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { CONTRACT_TYPES } from '../../../constants';
import { IContractTypeProps } from './types';

const SelectContractType = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: IContractTypeProps) => {
  const { t } = useTranslation(['employeePage']);
  const contractTypeSelectOptions = convertConstantValuesToTranslatedSelectOptions(CONTRACT_TYPES, { translationBaseKey: 'employeePage:CONTRACT_TYPES' });

  return (
    <Select
      value={value}
      mode={mode}
      options={contractTypeSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeePage:CONTRACT_TYPE')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectContractType;
