import { Select } from 'antd';
import { range as _range } from 'lodash';

import { VEHICLE_MODEL_YEAR_RANGE } from '@app/pages/Employee/AssetManagement/constants';
import { convertPrimitiveArrayValuesToSelectOptions } from '@shared/utils/common';
import { ISelectVehicleModelYearProps } from '@app/pages/Employee/AssetManagement/components/Select/VehicleModelYear/types';

const SelectVehicleModelYear: React.FC<ISelectVehicleModelYearProps> = (props: ISelectVehicleModelYearProps) => {
  const { value, className, onChange, placeholder, disabled, mode, allowClear } = props || {};
  const vehicleModelYearRange = _range(VEHICLE_MODEL_YEAR_RANGE[0], VEHICLE_MODEL_YEAR_RANGE[1]);
  const vehicleModelYearOptions = convertPrimitiveArrayValuesToSelectOptions(vehicleModelYearRange);

  return (
    <Select
      mode={mode}
      allowClear={allowClear}
      value={value}
      disabled={disabled}
      className={className}
      options={vehicleModelYearOptions}
      onChange={onChange}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default SelectVehicleModelYear;
