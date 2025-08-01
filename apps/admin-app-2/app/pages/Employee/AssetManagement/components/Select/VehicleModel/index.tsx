import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { isArray } from 'lodash';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { VEHICLE_BRANDS_TO_MODELS_MAP, VEHICLE_MODELS } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectVehicleModelProps } from '@app/pages/Employee/AssetManagement/components/Select/VehicleModel/types';

const SelectVehicleModel: React.FC<ISelectVehicleModelProps> = (props: ISelectVehicleModelProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { value, brand, className, onChange, placeholder, disabled, mode, allowClear } = props;

  const allowedVehicleModels = Array.isArray(brand)
    ? brand.flatMap(b => VEHICLE_BRANDS_TO_MODELS_MAP[b] || [])
    : VEHICLE_BRANDS_TO_MODELS_MAP[brand as keyof typeof VEHICLE_BRANDS_TO_MODELS_MAP] || [];

  const vehicleModelOptions = convertConstantValuesToTranslatedSelectOptions(
    allowedVehicleModels,
    { translationBaseKey: 'assetManagement:VEHICLE_MODELS', isConvertToInt: true },
  );

  return (
    <Select
      mode={mode}
      allowClear={allowClear || false}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={className}
      options={vehicleModelOptions}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default SelectVehicleModel;
