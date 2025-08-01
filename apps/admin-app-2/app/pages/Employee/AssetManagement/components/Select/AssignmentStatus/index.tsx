import React from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from 'antd';

import { ISelectAssignmentStatusProps } from './types';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { ASSET_STATUSES } from '@app/pages/Employee/AssetManagement/constants';

const SelectAssignmentStatus: React.FC<ISelectAssignmentStatusProps> = (props: ISelectAssignmentStatusProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled, allowClear } = props || {};

  const assetStatusesSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    ASSET_STATUSES,
    { translationBaseKey: 'assetManagement:ASSET_STATUSES', isConvertToInt: true },
  );

  return (
    <Select
      allowClear={allowClear}
      value={value}
      disabled={disabled}
      className={className}
      // @ts-ignore
      options={assetStatusesSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SelectAssignmentStatus;
