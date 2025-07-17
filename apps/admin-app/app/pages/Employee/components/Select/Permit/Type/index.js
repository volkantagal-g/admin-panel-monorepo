import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { convertPermitTypeConstantsToSelectOptions } from '@app/pages/Employee/Home/utils';

const SelectPermitType = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  permitRequestGroup, // optional
  ...otherProps
}) => {
  const { t } = useTranslation(['global', 'employeePage']);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      options={convertPermitTypeConstantsToSelectOptions({ permitRequestGroup })}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={!disabled && t('global:TYPE')}
      showArrow={showArrow && !disabled}
      showSearch
      filterOption={getSelectFilterOption}
      {...otherProps}
    />
  );
};

export default SelectPermitType;
