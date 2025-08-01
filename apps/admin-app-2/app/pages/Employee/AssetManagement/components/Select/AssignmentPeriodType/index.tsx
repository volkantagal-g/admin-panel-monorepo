import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { ASSIGNMENT_PERIOD_TYPES } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectAssignmentPeriodTypeProps } from './types';

const SelectVehicleFuelType = (props: ISelectAssignmentPeriodTypeProps) => {
  useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled, allowClear } = props || {};

  const vehicleFuelSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    ASSIGNMENT_PERIOD_TYPES,
    { translationBaseKey: 'assetManagement:ASSIGNMENT_PERIOD_TYPE', isConvertToInt: true },
  );

  return (
    <Select
      value={value}
      disabled={disabled}
      className={className}
      options={vehicleFuelSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
    />
  );
};

export default SelectVehicleFuelType;
