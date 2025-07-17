import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AntSelect from '@shared/components/UI/AntSelect';
import { warehouseProposalStatuses } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectStatus = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation('warehouseProposalPage');
  const [selectedWarehouseProposal, setSelectedWarehouseProposal] = useState();

  const warehouseProposalStatuesSelectOptions = convertConstantValuesToSelectOptions(warehouseProposalStatuses);

  const handleChange = val => {
    setSelectedWarehouseProposal(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWarehouseProposal(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedWarehouseProposal}
      options={warehouseProposalStatuesSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('global:SELECT.STATUS')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectStatus;
