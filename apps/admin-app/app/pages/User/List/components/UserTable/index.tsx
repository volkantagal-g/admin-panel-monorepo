import { useEffect, useMemo, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { getLimitAndOffset } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '../../redux/actions';
import { getSortOptionsSelector, getUsersSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import useStyles from './styles';
import { createSortObject } from '@shared/utils/table';

const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: 10 };

const UserListTable = ({ searchText, searchId }: { searchText: string, searchId: MongoIDType }) => {
  const latestSearchText = useRef<string>(searchText);
  const { t } = useTranslation(['userPage', 'global']);
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const classes = useStyles();

  const users = useSelector(getUsersSelector.getData);
  const isPending = useSelector(getUsersSelector.getIsPending);
  const sortOptions = useSelector(getSortOptionsSelector);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);

  const getUsers = useMemo(
    () => debounce((_pagination, _searchText, sortConfig) => {
      if (_searchText && _searchText.length < 3) return;

      const params = {
        ...getLimitAndOffset(_pagination),
        queryText: _searchText,
        isActive: _searchText ? undefined : true,
        sortOptions: sortConfig,
      };

      dispatch(Creators.getUsersRequest(params));
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch],
  );

  // pagination triggered request needs latest searchText
  useEffect(() => {
    latestSearchText.current = searchText;
  }, [searchText]);

  // pagination watcher
  // but searchText shouldn't trigger it, so we use latestSearchText
  useEffect(() => {
    getUsers(pagination, latestSearchText.current, sortOptions);
  }, [pagination, getUsers, sortOptions]);

  // searchText watcher
  useEffect(() => {
    if (searchId) {
      dispatch(Creators.getUsersRequest({ id: searchId }));
      return;
    }

    getUsers({ currentPage: 1, rowsPerPage: 10 }, searchText, sortOptions);
  }, [dispatch, searchText, searchId, getUsers, sortOptions]);

  const sortKeysToQueryKeys: {[key: string]: string} = { createdAt: 'createdAt', name: 'name' };

  const handlePaginationChange = ({ currentPage, rowsPerPage }: { currentPage: number, rowsPerPage: number }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleChange = (_pagination: any, _filters: any, sorter: any) => {
    const { order, field, columnKey } = sorter;

    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    const sortObject: {[key: string]: number} = {};
    const queryKey = sortKeysToQueryKeys[sortKey];

    if (queryKey && sortDirection) {
      sortObject[queryKey as keyof typeof sortObject] = sortDirection;
    }

    dispatch(Creators.setSortOptions({ sortOptions: sortObject }));
    handlePaginationChange(INITIAL_PAGINATION);
  };

  const columns = useMemo(() => tableColumns({ t, canAccess }), [t, canAccess]);

  return (
    <AntTableV2
      data={users}
      columns={columns}
      loading={isPending}
      onChange={handleChange}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      bordered
      className={classes.table}
    />
  );
};

export default UserListTable;
