import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Card,
} from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { assetLogComponents, filteredLogs, filtersSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';

const AssetTable = () => {
  const { t } = useTranslation(['assetManagement', 'global']);
  const dispatch = useDispatch();
  const moduleClasses = useModuleStyles();

  const tableData = useSelector(filteredLogs.getData);
  const isTableDataPending = useSelector(filteredLogs.isPending);
  const isFilterComponentsPending = useSelector(assetLogComponents.isPending);
  const totalCount = useSelector(filteredLogs.getTotalCount);
  const pagination = useSelector(filtersSelector.getPagination);
  const filters = useSelector(filtersSelector.getData);
  const handlePaginationChange = (paginationInfo: Pagination) => {
    dispatch(Creators.updateFilters({
      filters: {
        ...filters,
        pagination: {
          currentPage: paginationInfo.currentPage,
          rowsPerPage: paginationInfo.rowsPerPage,
        },
      },
    }));
  };

  const tableColumns = getTableColumns({ t });

  return (!isFilterComponentsPending ? (
    <Card
      className={[moduleClasses.cardContainer, moduleClasses.tableContainer].join(' ')}
    >
      <Row gutter={[16, 16]}>
        <AntTableV2
          data={tableData}
          columns={tableColumns}
          pagination={pagination}
          total={totalCount}
          onPaginationChange={handlePaginationChange}
          loading={isTableDataPending}
        />
      </Row>
    </Card>
  ) : null
  );
};

export default AssetTable;
