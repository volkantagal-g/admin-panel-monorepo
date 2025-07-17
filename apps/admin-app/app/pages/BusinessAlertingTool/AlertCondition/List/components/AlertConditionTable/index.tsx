import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLimitAndOffset } from '@shared/utils/common';
import { filterAlertConditionsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { tableColumns } from './config';

type AlertConditionTableProps = {
  pagination: { currentPage: number, rowsPerPage: number };
  setPagination: any;
}

function AlertConditionTable({ pagination, setPagination }: AlertConditionTableProps) {
  const { t } = useTranslation(['global', 'batAlertConditionListPage', 'batAlertConditionCommon']);
  const dispatch = useDispatch();

  const alertConditions = useSelector(filterAlertConditionsSelector.getData);
  const total = useSelector(filterAlertConditionsSelector.getTotal);
  const isAlertConditionsPending = useSelector(filterAlertConditionsSelector.getIsPending);
  const filters = useSelector(filterAlertConditionsSelector.getFilters);

  const columns = tableColumns({ t });

  useEffect(() => {
    dispatch(Creators.filterAlertConditionsRequest({
      filters: {
        ...filters,
        ...getLimitAndOffset(pagination),
      },
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.currentPage, pagination.rowsPerPage]);

  return (
    <AntTableV2
      data={alertConditions}
      columns={columns}
      loading={isAlertConditionsPending}
      showSorterTooltip={false}
      pagination={pagination}
      onPaginationChange={setPagination}
      total={total}
      scroll={{ y: '500px' }}
    />
  );
}

export default AlertConditionTable;
