import { useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { orderBy as _orderBy } from 'lodash';

import Header from '../Header';
import Table from '../Table';
import { generateTableColumns } from '../Table/config';
import { getSortOptions } from '../../utils';

import useStyles from './styles';

const CourierCountWrapper = ({ headerTitle, tableData = [], headerCounts, loading, expandedRowKeys, search, onExpandClick, sortable, wrapperKey }) => {
  const { t } = useTranslation(['getirMarketLiveMapPage', 'warehousePage']);
  const classes = useStyles();
  const [sortOptions, setSortOptions] = useState({ sortKey: 'name', sortDirection: 'asc' });

  const memoizedHandleSortChange = useCallback(field => {
    setSortOptions(prevValue => getSortOptions({ prevValue, field }));
  }, [setSortOptions]);

  const tableColumns = useMemo(() => generateTableColumns(
    {
      classes,
      onExpandClick,
      sortable,
      sortOptions,
      handleSortChange: memoizedHandleSortChange,
    },
    t,
  ), [classes, onExpandClick, sortable, sortOptions, memoizedHandleSortChange, t]);

  return (
    <div className={classes.courierCountTableWrapper}>
      <Header title={headerTitle} headerCounts={headerCounts} wrapperKey={wrapperKey} />
      {search}
      <Table
        columns={tableColumns}
        data={tableData}
        className={classes.table}
        loading={loading}
        expandable={{
          expandedRowRender: row => (
            getExpandedWarehouseStatsTable({
              warehousesList: row.warehousesList,
              sortOptions,
              classes,
              tableColumns,
            })
          ),
          expandIconColumnIndex: -1,
          expandedRowKeys,
        }}
      />
    </div>
  );
};

function getExpandedWarehouseStatsTable({ classes, sortOptions, warehousesList, tableColumns }) {
  let sortedData = warehousesList;
  if (sortOptions.sortKey && sortOptions.sortDirection) {
    sortedData = _orderBy(warehousesList, warehouseData => warehouseData[sortOptions.sortKey] ?? 0, sortOptions.sortDirection);
  }
  return (
    <div className={classes.childRowContainer}>
      <Table columns={tableColumns} data={sortedData} className={classes.innerTable} />
    </div>
  );
}

export default CourierCountWrapper;
