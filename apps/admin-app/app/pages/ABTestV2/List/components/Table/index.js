import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import { Table } from '@shared/components/GUI';

import { Creators } from '../../redux/actions';
import { getABTestsSelector } from '../../redux/selectors';
import { getColumns } from './config';
import { getLimitAndOffset } from '@shared/utils/common';

import useStyles from './styles';

const paginationInitialState = { current: 1, pageSize: 10 };

export default function ReportsTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingV2Page');
  const classes = useStyles();

  const abTestsData = useSelector(getABTestsSelector.getData);
  const abTestsCount = useSelector(getABTestsSelector.getCount);
  const isAbTestsPending = useSelector(getABTestsSelector.getIsPending);
  const selectedFilters = useSelector(getABTestsSelector.getFilters);
  const { canAccess } = usePermission();

  const [filters, setFilters] = useState(selectedFilters);
  const [pagination, setPagination] = useState(paginationInitialState);
  const columns = useMemo(() => getColumns({ t, canAccess, classes }), [t, canAccess, classes]);

  useEffect(() => {
    dispatch(
      Creators.getABTestsRequest({
        requestData: {
          ...filters,
          ...getLimitAndOffset({
            currentPage: pagination.current,
            rowsPerPage: pagination.pageSize,
          }),
        },
      }),
    );
  }, [dispatch, pagination, filters]);

  useEffect(() => {
    setPagination(paginationInitialState);
    setFilters(selectedFilters);
  }, [selectedFilters]);

  const handlePaginationChange = paginationData => {
    setPagination(paginationData);
  };

  return (
    <div>
      <Table
        columns={columns}
        pagination={{
          ...pagination,
          total: abTestsCount,
        }}
        title={t('AB_TESTS')}
        data={abTestsData || []}
        loading={isAbTestsPending}
        total={abTestsCount}
        onChange={handlePaginationChange}
        scroll={{ x: 976 }}
      />
    </div>
  );
}
