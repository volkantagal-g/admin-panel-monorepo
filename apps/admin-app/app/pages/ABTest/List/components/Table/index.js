import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AntTable from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { getLimitAndOffset } from '@shared/utils/common';

import { Creators } from '../../redux/actions';
import { getABTestsSelector } from '../../redux/selectors';
import { getColumns } from './config';

const paginationInitialState = { currentPage: 1, rowsPerPage: 10 };

export default function ReportsTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation('reportsPage');
  const abTestsData = useSelector(getABTestsSelector.getData);
  const isAbTestsPending = useSelector(getABTestsSelector.getIsPending);
  const selectedFilters = useSelector(getABTestsSelector.getFilters);
  const { canAccess } = usePermission();

  const [filters, setFilters] = useState(selectedFilters);
  const [pagination, setPagination] = useState(paginationInitialState);
  const columns = useMemo(() => getColumns({ t, canAccess }), [t, canAccess]);

  useEffect(() => {
    dispatch(Creators.getABTestsRequest({
      requestData: {
        ...filters,
        ...getLimitAndOffset(pagination),
      },
    }));
  }, [dispatch, pagination, filters]);

  useEffect(() => {
    setPagination(paginationInitialState);
    setFilters(selectedFilters);
  }, [selectedFilters]);

  return (
    <div>
      <AntTable
        columns={columns}
        data={abTestsData}
        loading={isAbTestsPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );

  function handlePaginationChange({ currentPage, rowsPerPage }) {
    setPagination({ currentPage, rowsPerPage });
  }
}
