import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getFranchiseDynamicConfigListSelector, getFranchiseDynamicConfigTypeListSelector } from './redux/selectors';
import { Header, Filter, Table } from './components';
import { getDynamicConfigFilterRequestParams } from './utils';

const reduxKey = REDUX_KEY.FRANCHISE_DYNAMIC_CONFIG.LIST;

const FranchiseDynamicConfigList = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_CONFIG_LIST.name, squad: ROUTE.FRANCHISE_CONFIG_LIST.squad });

  const data = useSelector(getFranchiseDynamicConfigListSelector.getData);
  const total = useSelector(getFranchiseDynamicConfigListSelector.getTotal);
  const isPending = useSelector(getFranchiseDynamicConfigListSelector.getIsPending);

  const tableColumns = useSelector(getFranchiseDynamicConfigTypeListSelector.getData);
  const isPendingTableColumns = useSelector(getFranchiseDynamicConfigTypeListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [filters, setFilters] = useState({
    date: moment().startOf('day').format('YYYY-MM-DD'),
    configType: undefined,
  });
  const [sortedInfo, setSortedInfo] = useState({});

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
    setSortedInfo({});
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };
  const onChangeTable = (_paginations, _filterOptions, sorter) => {
    setSortedInfo(sorter);
  };

  const getFranchiseDynamicConfigList = useCallback(() => {
    if (filters.configType !== undefined) {
      const requestParams = getDynamicConfigFilterRequestParams(filters, pagination, sortedInfo);
      dispatch(Creators.getFranchiseDynamicConfigListRequest(requestParams));
    }
  }, [dispatch, filters, pagination, sortedInfo]);

  useEffect(() => {
    getFranchiseDynamicConfigList();
  }, [getFranchiseDynamicConfigList]);

  const getFranchiseConfigType = useCallback(() => {
    dispatch(Creators.getFranchiseDynamicConfigTypeListRequest());
  }, [dispatch]);

  if (!isEmpty(tableColumns) && isEmpty(filters.configType)) {
    setFilters({ ...filters, configType: tableColumns[0].name });
  }

  useEffect(() => {
    getFranchiseConfigType();
  }, [getFranchiseConfigType]);

  return (
    <>
      <Header />
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending || isPendingTableColumns}
        tableColumns={tableColumns}
      />
      <Table
        data={data}
        tableColumns={tableColumns}
        configType={filters.configType}
        isPending={isPending || isPendingTableColumns}
        total={total}
        pagination={pagination}
        onChangeTable={onChangeTable}
        sortedInfo={sortedInfo}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default FranchiseDynamicConfigList;
