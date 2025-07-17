import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { warehouseStateTypes } from '@shared/shared/constantValues';

const SelectWarehouseState = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedWarehouseState, setSelectedWarehouseState] = useState();

  const warehouseStatusSelectOptions = convertConstantValuesToSelectOptions(warehouseStateTypes);

  const handleChange = val => {
    setSelectedWarehouseState(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWarehouseState(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedWarehouseState}
      options={warehouseStatusSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t("global:ACTIVENESS")}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectWarehouseState;
