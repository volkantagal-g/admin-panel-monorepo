import { useMemo } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertPermitReasonsConstantsToSelectOptions } from '@app/pages/Employee/Home/utils';

const SelectPermitReason = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  permitType,
  allowClear = true,
  showArrow = true,
  ...otherProps
}) => {
  const { t } = useTranslation(['global', 'employeePage']);

  const permitReasonSelectOptions = useMemo(() => {
    if (!permitType) {
      return [];
    }
    return convertPermitReasonsConstantsToSelectOptions({ permitType });
  }, [permitType]);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      options={permitReasonSelectOptions}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={!disabled && t('global:REASON')}
      showArrow={showArrow && !disabled}
      showSearch
      filterOption={getSelectFilterOption}
      {...otherProps}
    />
  );
};

export default SelectPermitReason;
