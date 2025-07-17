import React from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from 'antd';

import { ISelectVehicleIsCommonCarProps } from '@app/pages/Employee/AssetManagement/components/Select/VehicleIsCommonCar/types';

const SelectVehicleIsCommonCar: React.FC<ISelectVehicleIsCommonCarProps> = (props: ISelectVehicleIsCommonCarProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled, allowClear } = props || {};

  const vehicleIsCommonCarOptions = [
    { label: t('global:YES'), value: true },
    { label: t('global:NO'), value: false },
  ];

  return (
    <Select
      allowClear={allowClear}
      value={value}
      disabled={disabled}
      className={className}
      // @ts-ignore
      options={vehicleIsCommonCarOptions}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SelectVehicleIsCommonCar;
