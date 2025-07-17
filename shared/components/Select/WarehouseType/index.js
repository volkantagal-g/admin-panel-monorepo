import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { warehouseTypes } from '@shared/shared/constantValues';

const SelectWarehouseType = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  className,
  ...otherProps
}) => {
  const [selectedWarehouseTypes, setSelectedWarehouseTypes] = useState();

  const warehouseTypesSelectOptions = convertConstantValuesToSelectOptions(warehouseTypes);

  const handleChange = val => {
    setSelectedWarehouseTypes(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWarehouseTypes(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedWarehouseTypes}
      options={warehouseTypesSelectOptions}
      onChange={handleChange}
      className={className}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('global:WAREHOUSE_TYPE')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectWarehouseType;
