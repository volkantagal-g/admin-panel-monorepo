import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import SelectTitle from '../selectTitle';
import { Creators } from '../../redux/actions';
import { warehouseFilterSelector, configFilterSelector } from '../../redux/selectors';
import useStyles from '../../styles';

const { Option } = Select;

const WarehouseFilter = ({ configData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { t } = useTranslation('onOffPage');

  const warehouses = useSelector(warehouseFilterSelector.getWarehouseList);
  const selectedWarehouses = useSelector(warehouseFilterSelector.getSelectedWarehouses);
  const selectedConfig = useSelector(configFilterSelector.getSelectedConfig);

  const setSelectedWarehouseFilter = filter => {
    dispatch(Creators.setSelectedWarehouse({ data: filter }));
  };
  return (
    <div>
      <SelectTitle description={t('WAREHOUSE')} src="warehouse" />
      <Select
        allowClear
        className={classes.filterSelect}
        mode="multiple"
        placeholder={t('WAREHOUSE_NAME')}
        onChange={value => setSelectedWarehouseFilter(value)}
        maxTagCount={2}
        maxTagPlaceholder={`+ ${(selectedWarehouses.length) - 2} ${t('WAREHOUSE')}`}
      >
        {Object.entries(selectedConfig?.length > 0 ? configData : warehouses).map(([key, value]) => (
          <Option key={key} value={value} label={value} />
        ))}
      </Select>
    </div>
  );
};

export default WarehouseFilter;
