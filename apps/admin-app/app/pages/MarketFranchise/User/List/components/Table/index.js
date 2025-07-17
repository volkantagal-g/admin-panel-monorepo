import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { tableColumns } from './config';
import { franchiseUserListSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getFranchiseUserListRequestParams, returnFilterValue } from '../../utils';

const FranchiseUserTable = ({ filters, pagination, setPagination }) => {
  const { t } = useTranslation('marketFranchisePage');
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const data = useSelector(franchiseUserListSelector.getData);
  const totalCardCount = useSelector(franchiseUserListSelector.getCount);
  const isPending = useSelector(franchiseUserListSelector.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const columns = useMemo(() => tableColumns(t, Can), [
    t,
    Can,
  ]);

  useEffect(() => {
    const requestData = getFranchiseUserListRequestParams({
      pagination,
      active: filters.isActivated,
      filter: returnFilterValue(filters.searchValue),
    });
    dispatch(Creators.getFranchiseUserListRequest(requestData));
  }, [dispatch, pagination, filters]);

  return (
    <AntTableV2
      data={data}
      columns={columns}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={totalCardCount}
      isScrollableToTop={false}
    />
  );
};

FranchiseUserTable.propTypes = {
  filters: PropTypes.shape({
    searchValue: PropTypes.string,
    isActivated: PropTypes.bool,
  }).isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
  }).isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default FranchiseUserTable;
