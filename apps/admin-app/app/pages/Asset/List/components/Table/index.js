import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { useCursorPagination, usePermission } from '@shared/hooks';
import { tableColumns } from './config';
import { employeeAssetListSelector } from '../../redux/selectors';

import { Creators } from '../../redux/actions';

const Table = ({ filters }) => {
  const { canAccess } = usePermission();
  const { t } = useTranslation(['assetPage', 'global']);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const paginationMode = 'cursor';

  const getEmployeeAssetListRequest = useCallback(
    currentFilters => dispatch(Creators.getEmployeeAssetListRequest({ filters: currentFilters })),
    [dispatch],
  );

  const isPending = useSelector(employeeAssetListSelector.getIsPending);
  const data = useSelector(employeeAssetListSelector.getData);
  const previousPageCursor = useSelector(employeeAssetListSelector.getPreviousPageCursor);
  const nextPageCursor = useSelector(employeeAssetListSelector.getNextPageCursor);

  const handleNextOnClick = () => getEmployeeAssetListRequest({ ...filters, nextPageCursor, paginationMode, limit });
  const handlePreviousOnClick = () => getEmployeeAssetListRequest({ ...filters, previousPageCursor, paginationMode, limit });
  const handleLimit = value => setLimit(value);

  useEffect(() => {
    getEmployeeAssetListRequest({ ...filters, limit, paginationMode });
  }, [filters, limit, getEmployeeAssetListRequest, paginationMode]);

  const pagination = useCursorPagination({
    hasPrev: previousPageCursor,
    hasNext: nextPageCursor,
    handleNext: handleNextOnClick,
    handlePrevious: handlePreviousOnClick,
    handleLimit,
  });

  return (
    <>
      <AntTableV2
        data={data}
        columns={tableColumns({ t, canAccess })}
        loading={isPending}
        pagination={false}
      />
      {pagination}
    </>
  );
};

export default Table;
