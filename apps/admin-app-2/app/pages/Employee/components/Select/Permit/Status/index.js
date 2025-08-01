import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { EMPLOYEE_PERMIT_STATUSES } from '../../../../constants';
import { convertConstantValueTranslationsToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectPermitStatus = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  ...otherProps
}) => {
  const { t } = useTranslation(['global', 'employeePage']);
  const options = convertConstantValueTranslationsToSelectOptions({
    constants: EMPLOYEE_PERMIT_STATUSES,
    translationBaseKey: 'employeePage:PERMIT_STATUSES',
  });
  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      options={options}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={!disabled && t('global:STATUS')}
      showArrow={showArrow && !disabled}
      showSearch
      filterOption={getSelectFilterOption}
      {...otherProps}
    />
  );
};

export default SelectPermitStatus;
