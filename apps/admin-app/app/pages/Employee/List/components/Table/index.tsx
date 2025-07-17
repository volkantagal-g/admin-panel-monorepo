import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Card,
} from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { filterSelector, tableDataSelector } from '../../redux/selectors';
import useParentStyle from '../../styles';
import { ACTIVE_GETIRIANS_TAB, NON_ACTIVE_GETIRIANS_TAB } from '../../constants';
import { getTableColumns } from './config';

const Filter = () => {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  const parentClasses = useParentStyle();
  const { canAccess } = usePermission();
  const langKey = getLangKey();

  // current antd version doesn't support the useWatch hook
  const tableData = useSelector(tableDataSelector.getData);
  const isTableDataPending = useSelector(tableDataSelector.getIsPending);
  const totalCount = useSelector(tableDataSelector.getTotalCount);
  const pagination = useSelector(filterSelector.getPagination);
  const filters = useSelector(filterSelector.getFilters);

  const cardTabList = [
    {
      key: ACTIVE_GETIRIANS_TAB,
      tab: t('employeePage:GETIRIANS'),
    },
    ...(canAccess(permKey.PAGE_EMPLOYEE_LIST_COMPONENT_FORMER_GETIRIANS_TABLE) ? [
      {
        key: NON_ACTIVE_GETIRIANS_TAB,
        tab: t('employeePage:FORMER_GETIRIANS'),
      },
    ] : []),
  ];

  const triggerFetchEmployees = () => {
    dispatch(Creators.getFilteredEmployeesCommonRequest({}));
  };

  const handlePaginationChange = (paginationInfo: any) => {
    dispatch(Creators.updateFilters({
      filters: {
        pagination: {
          currentPage: paginationInfo.currentPage,
          rowsPerPage: paginationInfo.rowsPerPage,
        },
      },
    }));

    triggerFetchEmployees();
  };

  const handleTabChange = (key: string) => {
    dispatch(Creators.updateFilters({ filters: { activeTabKey: key } }));
    triggerFetchEmployees();
  };

  const tableColumns = getTableColumns({ t, langKey });

  return (
    <Card
      className={[parentClasses.cardContainer, parentClasses.tableCardContainer].join(' ')}
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
  );
};

export default Filter;
