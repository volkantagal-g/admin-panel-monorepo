import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { VEHICLE_BRANDS } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectVehicleBrandProps } from '@app/pages/Employee/AssetManagement/components/Select/VehicleBrand/types';

const SelectVehicleBrand: React.FC<ISelectVehicleBrandProps> = (props: ISelectVehicleBrandProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, disabled, value, mode, allowClear } = props || {};

  const vehicleBrandSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    VEHICLE_BRANDS,
    { translationBaseKey: 'assetManagement:VEHICLE_BRANDS', isConvertToInt: true },
  );

  return (
    <Select
      mode={mode}
      allowClear={allowClear || false}
      disabled={disabled}
      value={value}
      className={className}
      options={vehicleBrandSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default SelectVehicleBrand;
