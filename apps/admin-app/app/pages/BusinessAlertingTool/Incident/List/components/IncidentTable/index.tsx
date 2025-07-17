import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLimitAndOffset } from '@shared/utils/common';
import { createSortObject } from '@shared/utils/table';

import { filterIncidentsSelector, getAlertConditionsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { tableColumns } from './config';

type IncidentTableProps = {
  pagination: { currentPage: number, rowsPerPage: number };
  setPagination: any;
}

function IncidentTable({ pagination, setPagination }: IncidentTableProps) {
  const { t } = useTranslation(['global', 'batIncidentListPage', 'batAlertConditionCommon']);
  const dispatch = useDispatch();

  const incidents = useSelector(filterIncidentsSelector.getData);
  const total = useSelector(filterIncidentsSelector.getTotal);
  const isIncidentsPending = useSelector(filterIncidentsSelector.getIsPending);
  const filters = useSelector(filterIncidentsSelector.getFilters);
  const alertConditions = useSelector(getAlertConditionsSelector.getData);

  const columns = tableColumns({ t, alertConditions });

  const handleOnChange = (_paginationData: any, _filters: any, sorter: any) => {
    const { order, field, columnKey } = sorter;

    const { sortDirection } = createSortObject(field || columnKey, order);

    dispatch(Creators.setFilterSortDirection({ sortDirection }));
  };

  useEffect(() => {
    dispatch(Creators.filterIncidentsRequest({
      filters: {
        ...filters,
        ...getLimitAndOffset(pagination),
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.currentPage, pagination.rowsPerPage, filters.sortDirection]);

  return (
    <AntTableV2
      data={incidents}
      columns={columns}
      loading={isIncidentsPending}
      showSorterTooltip={false}
      pagination={pagination}
      onPaginationChange={setPagination}
      total={total}
      scroll={{ y: '500px' }}
      onChange={handleOnChange}
    />
  );
}

export default IncidentTable;
