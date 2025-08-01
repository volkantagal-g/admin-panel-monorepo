import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { useMemo } from 'react';

import SelectTitle from '@app/pages/MarketAutoGrowthOperations/components/SelectTitle';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';
import { ALL_WAREHOUSES_OPTION_VALUE } from '@app/pages/MarketAutoGrowthOperations/constants';

const { Option } = Select;

const WarehouseTypeFilter = ({ warehouseTypeList, disabled, loading, value, onChange, hasAllWarehousesOption }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const allWarehousesOption = useMemo(() => (hasAllWarehousesOption ? [{
    value: ALL_WAREHOUSES_OPTION_VALUE,
    label: t('COUNTRY'),
  }] : []), [hasAllWarehousesOption, t]);
  const options = useMemo(() => allWarehousesOption.concat(warehouseTypeList), [allWarehousesOption, warehouseTypeList]);

  return (
    <>
      <SelectTitle src="warehouse" description={t('WAREHOUSE_TYPE')} />
      <Select
        allowClear={false}
        showSearch
        className={classes.filterItem}
        onChange={onChange}
        placeholder={t('SELECT_WAREHOUSE_TYPE')}
        value={value}
        disabled={disabled}
        loading={loading}
      >
        {options.map(item => (
          <Option key={item.value} value={item.value} label={item.label}>{item.label}</Option>
        ))}
      </Select>
    </>
  );
};
export default WarehouseTypeFilter;
