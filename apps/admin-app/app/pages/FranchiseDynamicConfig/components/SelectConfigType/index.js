import { useSelector } from 'react-redux';

import { Select } from 'antd';

import { selectOptionsSearch } from '@shared/utils/common';
import { t } from '@shared/i18n';
import { getFranchiseDynamicConfigTypeListSelector } from '../../List/redux/selectors';

const SelectConfigType = ({
  value,
  onChange,
  disabled,
}) => {
  const data = useSelector(getFranchiseDynamicConfigTypeListSelector.getFormattedData);

  return (
    <Select
      value={value || data?.[0]?.value}
      options={data}
      onChange={onChange}
      shouldMapOptionsData
      className="w-100"
      showSearch
      filterOption={selectOptionsSearch}
      disabled={disabled}
      placeholder={t('franchiseDynamicConfig:LIST.CONFIG_TYPE')}
    />
  );
};

export default SelectConfigType;
