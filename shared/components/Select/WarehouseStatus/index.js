import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { warehouseStatuses } from '@shared/shared/constantValues';

const SelectWarehouseStatus = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedWarehouseStatus, setSelectedWarehouseStatus] = useState();

  const warehouseStatusSelectOptions = convertConstantValuesToSelectOptions(warehouseStatuses);

  const handleChange = val => {
    setSelectedWarehouseStatus(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWarehouseStatus(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedWarehouseStatus}
      options={warehouseStatusSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t("global:STATUS")}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectWarehouseStatus;
