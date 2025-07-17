import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';

import {
  filtersSelector,
  getFraudSuspicionOrdersSelector,
} from '../../redux/selectors';
import { getLimitAndOffset } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';

import { Creators } from '../../redux/actions';
import { getTableColumns } from './config';
import { Table } from '@shared/components/GUI';

function SuspicionOrdersTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation('fraudSuspicionOrdersPage');

  const data = useSelector(getFraudSuspicionOrdersSelector.getData) || [];
  const totalCount = useSelector(getFraudSuspicionOrdersSelector.getCount);
  const isPending = useSelector(getFraudSuspicionOrdersSelector.getIsPending);
  const domainType = useSelector(filtersSelector.getSelectedDomainType);
  const pagination = useSelector(filtersSelector.getPagination);
  const { canAccess } = usePermission();

  const handlePaginationChange = ({
    current: currentPage,
    pageSize: rowsPerPage,
  }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
    const paginationFilters = { ...getLimitAndOffset({ currentPage, rowsPerPage }) };
    dispatch(
      Creators.getFraudSuspicionOrdersRequest({
        ...paginationFilters,
        domainType,
      }),
    );
  };

  const columns = getTableColumns({ t, canAccess });

  return (
    <Table
      data-testid="fraud-orders"
      title={t('TITLE')}
      columns={columns}
      data={data}
      loading={isPending}
      pagination={{
        ...pagination,
        total: 10000,
      }}
      onChange={handlePaginationChange}
      size="small"
      total={totalCount}
      scroll={{ y: 700 }}
    />
  );
}

export default SuspicionOrdersTable;
