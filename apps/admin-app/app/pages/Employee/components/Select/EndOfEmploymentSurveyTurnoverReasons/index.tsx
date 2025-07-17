import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { EMPLOYEE_SURVEY_TURNOVER_TYPES, END_OF_EMPLOYMENT_LEAVE_REASONS } from '../../../constants';
import { ISelectEndOfEmploymentLeaveReasonProps } from './types';

const SelectEndOfEmploymentSurveyTurnoverReasons = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: ISelectEndOfEmploymentLeaveReasonProps) => {
  const { t } = useTranslation(['employeePage', 'global']);
  const endOfEmploymentLeaveReasonSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    EMPLOYEE_SURVEY_TURNOVER_TYPES,
    { translationBaseKey: 'employeePage:EMPLOYEE_SURVEY_TURNOVER_TYPES' },
  );

  return (
    <Select
      value={value}
      mode={mode}
      options={endOfEmploymentLeaveReasonSelectOptions}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('global:REASON')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectEndOfEmploymentSurveyTurnoverReasons;
