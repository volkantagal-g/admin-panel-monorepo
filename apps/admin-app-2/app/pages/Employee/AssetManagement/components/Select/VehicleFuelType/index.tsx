import { useTranslation } from 'react-i18next';

import { Select, Form } from 'antd';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { VEHICLE_FUEL_TYPES } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectVehicleFuelTypeProps } from '@app/pages/Employee/AssetManagement/components/Select/VehicleFuelType/types';

const SelectVehicleFuelType = (props: ISelectVehicleFuelTypeProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled } = props || {};

  const vehicleFuelSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    VEHICLE_FUEL_TYPES,
    { translationBaseKey: 'assetManagement:VEHICLE_FUEL_TYPES', isConvertToInt: true },
  );

  return (
    <Select
      value={value}
      disabled={disabled}
      className={className}
      options={vehicleFuelSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default SelectVehicleFuelType;
