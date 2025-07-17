import React from 'react';
import { Select } from 'antd';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import {
  ASSIGNABLE_STATUS,
  VEHICLE_REASON_TO_STATUS_MAP,
} from '@app/pages/Employee/AssetManagement/constants';
import { ISelectAssignableStatusProps } from './types';

const SelectAssignableReasonStatus: React.FC<ISelectAssignableStatusProps> = (props: ISelectAssignableStatusProps) => {
  const { className, onChange, placeholder, disabled, value, assignableStatus, allowClear } = props || {};
  const isAssignableReasonStatusDisabled = assignableStatus === ASSIGNABLE_STATUS.ASSIGNABLE;

  const allowedReasons = assignableStatus ? VEHICLE_REASON_TO_STATUS_MAP[assignableStatus] || [] : [];

  const vehicleAssignableStatusSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    allowedReasons,
    { translationBaseKey: 'assetManagement:VEHICLE_ASSIGNABLE_REASON_STATUSES', isConvertToInt: true },
  );

  return (
    <Select
      disabled={disabled || isAssignableReasonStatusDisabled}
      value={value}
      className={className}
      options={vehicleAssignableStatusSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
    />
  );
};

export default SelectAssignableReasonStatus;
