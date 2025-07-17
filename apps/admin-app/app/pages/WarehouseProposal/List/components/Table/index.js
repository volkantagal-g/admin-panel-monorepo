import { useSelector, useDispatch } from 'react-redux';

import AntTable from '@shared/components/UI/AntTable';
import { createSortObject } from '@shared/utils/table';

import { Creators } from '../../redux/actions';
import { warehouseProposalsSelector, filtersSelector, warehouseProposalsReportSelector } from '../../redux/selectors';
import { tableColumns } from './config';

const WarehouseProposalsTable = () => {
  const dispatch = useDispatch();
  const warehouseProposals = useSelector(warehouseProposalsSelector.getData);
  const total = useSelector(warehouseProposalsSelector.getTotal);
  const isPending = useSelector(warehouseProposalsSelector.getIsPending);
  const warehouseProposalsReportIsPending = useSelector(warehouseProposalsReportSelector.getIsPending);
  const { currentPage, rowsPerPage } = useSelector(filtersSelector.getFilters);

  const getWarehouseProposals = () => {
    dispatch(Creators.getWarehouseProposalsRequest({}));
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setFilters({ filters: { currentPage, rowsPerPage } }));
    getWarehouseProposals();
  };

  const handleTableChange = (_pagination, _filters, sorter) => {
    const { order, columnKey } = sorter;
    const { sortKey, sortDirection } = createSortObject(columnKey, order);

    let sort = {};
    if (sortKey && sortDirection) {
      sort = { [sortKey]: sortDirection };
    }

    dispatch(Creators.setFilters({ filters: { sort } }));
    getWarehouseProposals();
  };

  const handleExcelExport = () => {
    dispatch(Creators.getWarehouseProposalsReportRequest());
  };

  return (
    <>
      <AntTable
        data={warehouseProposals}
        columns={tableColumns}
        loading={isPending || warehouseProposalsReportIsPending}
        pagination={{ currentPage, rowsPerPage }}
        total={total}
        onPaginationChange={handlePaginationChange}
        onChange={handleTableChange}
        onExport={handleExcelExport}
      />
    </>
  );
};

export default WarehouseProposalsTable;
