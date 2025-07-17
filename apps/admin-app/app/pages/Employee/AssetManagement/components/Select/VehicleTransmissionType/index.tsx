import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { VEHICLE_TRANSMISSION_TYPES } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectVehicleTransmissionTypeProps } from '@app/pages/Employee/AssetManagement/components/Select/VehicleTransmissionType/types';

const SelectVehicleTransmissionType: React.FC<ISelectVehicleTransmissionTypeProps> = (props: ISelectVehicleTransmissionTypeProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled } = props || {};

  const vehicleTransmissionTypeOptions = convertConstantValuesToTranslatedSelectOptions(
    VEHICLE_TRANSMISSION_TYPES,
    { translationBaseKey: 'assetManagement:VEHICLE_TRANSMISSION_TYPES', isConvertToInt: true },
  );

  return (
    <Select
      value={value}
      disabled={disabled}
      className={className}
      options={vehicleTransmissionTypeOptions}
      onChange={onChange}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default SelectVehicleTransmissionType;
