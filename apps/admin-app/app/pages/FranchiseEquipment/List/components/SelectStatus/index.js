import { Select } from 'antd';

import { selectOptionsSearch } from '@shared/utils/common';
import { t } from '@shared/i18n';

const OPTIONS = [
  {
    value: 'all',
    label: t('global:ALL'),
  },
  {
    value: 'active',
    label: t('franchiseEquipmentPage:ACTIVE'),
  },
  {
    value: 'archived',
    label: t('franchiseEquipmentPage:ARCHIVED'),
  },
];

const SelectStatus = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <Select
      value={value}
      options={OPTIONS}
      onChange={onChange}
      className="w-100"
      showSearch
      filterOption={selectOptionsSearch}
      disabled={disabled}
    />
  );
};

export default SelectStatus;
