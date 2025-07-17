import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Creators } from '../../redux/actions';
import { warehouseTransferGroupsSelector, getTransferGroupByIdSelector } from '../../redux/selectors';
import { getTableColumns, exampleCsv } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';
import { getWarehousesSelector } from '@shared/redux/selectors/common';

const WarehouseTransferGroupsTable = () => {
  const dispatch = useDispatch();
  const transferGroup = useSelector(getTransferGroupByIdSelector.getData) || {};
  const data = useSelector(warehouseTransferGroupsSelector.getData) || [];
  const warehouses = useSelector(getWarehousesSelector.getData) || [];
  const isGetWarehouseTransferGroupsPending = useSelector(warehouseTransferGroupsSelector.getIsPending);
  const isGetWarehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const isGetTransferGroupPending = useSelector(getTransferGroupByIdSelector.getIsPending);
  const isPending = isGetWarehousesPending || isGetWarehouseTransferGroupsPending || isGetTransferGroupPending;

  const { t } = useTranslation('transferGroupPage');
  const { id: transferGroupId } = useParams();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleExport = () => {
    dispatch(Creators.exportWarehouseTransferGroupsByFilterRequest({
      transferGroups: [transferGroupId],
      transferGroup,
      warehouses,
    }));
  };

  useEffect(() => {
    dispatch(Creators.getWarehouseTransferGroupsByFilterRequest({
      transferGroups: [transferGroupId],
      ...getLimitAndOffset(pagination),
    }));
  }, [pagination.currentPage, pagination.rowsPerPage]);

  const handleCsvImport = ({ data: csvData }) => {
    const warehouseIds = csvData
      .map(item => {
        return _.get(item, 'warehouse_id', '');
      })
      .filter(id => {
        return !!id;
      });
    dispatch(Creators.updateTransferGroupOfWarehousesBulkRequest({
      warehouses: warehouseIds,
      transferGroup: transferGroupId,
    }));
  };

  return (
    <div className="mt-10px">
      <AntTable
        title={t('WAREHOUSES')}
        data={data}
        columns={getTableColumns(warehouses)}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        importerProps={{
          onOkayClick: handleCsvImport,
          exampleCsv,
        }}
        onExport={handleExport}
      />
    </div>
  );
};

export default WarehouseTransferGroupsTable;
