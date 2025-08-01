import React from 'react';
import { Cascader } from 'antd';
import { useTranslation } from 'react-i18next';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { EMPLOYEE_SURVEY_LEAVE_TYPES } from '../../../constants';
import { ISelectEndOfEmploymentLeaveReasonProps } from './types';

const SelectEndOfEmploymentSurveyLeaveReasons = ({
  mode,
  onChange,
  disabled,
  allowClear = false,
  placeholder,
  className,
  value,
}: ISelectEndOfEmploymentLeaveReasonProps) => {
  const { t } = useTranslation(['employeePage', 'global']);

  const voluntarilyLeaveReasonSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    EMPLOYEE_SURVEY_LEAVE_TYPES.VOLUNTARILY_LEAVES,
    { translationBaseKey: 'employeePage:LEAVE_TYPES' },
  );

  const involuntarilyLeaveReasonSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    EMPLOYEE_SURVEY_LEAVE_TYPES.INVOLUNTARILY_LEAVES,
    { translationBaseKey: 'employeePage:LEAVE_TYPES' },
  );

  const reasonTypeOptions = [
    {
      value: 100,
      label: t('employeePage:MAIN_LEAVE_REASON_TYPES.VOLUNTARILY'),
      children: voluntarilyLeaveReasonSelectOptions,
    },
    {
      value: 200,
      label: t('employeePage:MAIN_LEAVE_REASON_TYPES.INVOLUNTARILY'),
      children: involuntarilyLeaveReasonSelectOptions,
    },
    {
      value: 300,
      label: t('employeePage:MAIN_LEAVE_REASON_TYPES.CANCEL_HIRING'),
    },
  ];

  const handleChange = (option: any[]) => {
    if (onChange && option?.length) {
      // @ts-ignore
      onChange(option[option.length - 1] ? option[option.length - 1] : value[0]);
    }
  };

  const findParentChild = (childVal: number) => {
    if (childVal > 100 && childVal < 200) {
      return [100, childVal];
    }
    if (childVal > 200 && childVal < 300) {
      return [200, childVal];
    }

    return [300];
  };
  return (
    <Cascader
      value={value ? findParentChild(value) : undefined}
      options={reasonTypeOptions}
      onChange={handleChange}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('global:REASON')}
      className={className ? `${className} w-100` : 'w-100'}
      showSearch
    />
  );
};

export default SelectEndOfEmploymentSurveyLeaveReasons;
