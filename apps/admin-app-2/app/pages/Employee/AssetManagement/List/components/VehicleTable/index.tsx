import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Card,
} from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { filtersSelector, filteredAssetsDataSelector, assetFilterComponents } from '../../redux/selectors';
import { getTableColumns } from './config';
import { VEHICLE_TABLE_TABS } from '@app/pages/Employee/AssetManagement/constants';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';

const AssetTable = () => {
  const { t } = useTranslation(['assetManagement', 'global']);
  const dispatch = useDispatch();
  const moduleClasses = useModuleStyles();

  // current antd version doesn't support the useWatch hook
  const tableData = useSelector(filteredAssetsDataSelector.getData);
  const isTableDataPending = useSelector(filteredAssetsDataSelector.isPending);
  const isFilterComponentsPending = useSelector(assetFilterComponents.isPending);
  const totalCount = useSelector(filteredAssetsDataSelector.getTotalCount);
  const pagination = useSelector(filtersSelector.getPagination);
  const filters = useSelector(filtersSelector.getData);

  const cardTabList = [
    {
      key: VEHICLE_TABLE_TABS.VEHICLE_LIST,
      tab: t('assetManagement:TABS.VEHICLE_LIST'),
    },
    {
      key: VEHICLE_TABLE_TABS.CONTROL_NEEDED_VEHICLES,
      tab: t('assetManagement:TABS.CONTROL_NEEDED_VEHICLES'),
    },
  ];

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

  const handleTabChange = (key: string) => {
    dispatch(Creators.updateFilters({ filters: { activeTabKey: key }, resetSelectedFilters: true }));
  };

  useEffect(() => {
    dispatch(Creators.getFilteredAssetsRequest());
  }, [dispatch]);

  const tableColumns = getTableColumns({ t, moduleClasses, activeTabKey: filters?.activeTabKey });

  return (!isFilterComponentsPending ? (
    <Card
      className={[moduleClasses.cardContainer, moduleClasses.tableContainer].join(' ')}
      tabList={cardTabList}
      activeTabKey={filters?.activeTabKey}
      onTabChange={handleTabChange}
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
