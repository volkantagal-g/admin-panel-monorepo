import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import { getFilteredWarehousesForDivisionSelector } from '@shared/redux/selectors/common';
import { filtersSelector, warehouseStatsSelector } from '../../../redux/selectors';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getTableColumns } from './config';

const { Title } = Typography;

function OrderCountsByStoreTable() {
  const { t } = useTranslation('getirMarketGrowthComparisonPage');
  const warehousesMap = useSelector(getFilteredWarehousesForDivisionSelector.getData);
  const formattedWarehouseMap = warehousesMap.reduce((acc, warehouse) => {
    acc[warehouse.id] = warehouse.name || warehouse.id;
    return acc;
  }, {});
  const data = useSelector(warehouseStatsSelector.getData);
  const isPending = useSelector(warehouseStatsSelector.getIsPending);
  const filters = useSelector(filtersSelector.getFilters);
  const columns = getTableColumns(t, filters?.startDateRange, filters?.endDateRange, formattedWarehouseMap);

  return (
    <AntTableV2
      title={<Title level={5}>{t('ORDER_COUNTS_BY_STORE')}</Title>}
      data={data}
      columns={columns}
      pagination={false}
      loading={isPending}
      bordered
    />
  );
}

export default OrderCountsByStoreTable;
