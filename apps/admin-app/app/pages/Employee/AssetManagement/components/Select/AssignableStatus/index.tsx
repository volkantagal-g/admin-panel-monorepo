import React from 'react';
import { Select } from 'antd';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { ASSIGNABLE_STATUS } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectAssignableStatusProps } from './types';

const SelectAssignableStatus: React.FC<ISelectAssignableStatusProps> = (props: ISelectAssignableStatusProps) => {
  const { value, className, onChange, placeholder, disabled, allowClear, form } = props || {};

  const vehicleAssignableStatusSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    ASSIGNABLE_STATUS,
    { translationBaseKey: 'assetManagement:VEHICLE_ASSIGNABLE_STATUS', isConvertToInt: true },
  );

  return (
    <Select
      disabled={disabled}
      value={value}
      className={className}
      options={vehicleAssignableStatusSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
    />
  );
};

export default SelectAssignableStatus;
