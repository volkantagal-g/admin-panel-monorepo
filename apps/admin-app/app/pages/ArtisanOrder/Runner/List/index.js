import { compose } from 'redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { Header, RunnerSearch, RunnerTable } from './components';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const RunnerList = () => {
  usePageViewAnalytics({
    name: ROUTE.GL_RUNNER_LIST,
    squad: ROUTE.GL_RUNNER_LIST.squad,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [shoppingMallId, setShoppingMallId] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const dispatch = useDispatch();

  const getRunners = useMemo(
    () => debounce(_searchQuery => {
      const params = {
        searchQuery: _searchQuery,
        size: pagination.rowsPerPage,
        page: pagination.currentPage,
      };
      dispatch(Creators.getRunnersRequest(params));
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch, pagination],
  );

  const handleDebouncedSearch = useCallback(
    _searchQuery => {
      getRunners(_searchQuery);
    },
    [getRunners],
  );

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  // searchText watcher
  useEffect(() => {
    handleDebouncedSearch(searchQuery);
  }, [dispatch, searchQuery, handleDebouncedSearch]);

  const handleSearchChange = text => {
    setSearchQuery(text);
  };

  const handleCompanyIdChange = companyIdParam => setCompanyId(companyIdParam);
  const handleShoppingMallIdChange = shoppingMallIdParam => setShoppingMallId(shoppingMallIdParam);

  const handleSearchByShoppingMallId = () => dispatch(Creators.getRunnersRequest({ shoppingMallId }));
  const handleSearchByCompanyId = () => dispatch(Creators.getRunnersRequest({ companyId }));

  const handlePaginationChange = useCallback(
    ({ currentPage, rowsPerPage }) => {
      setPagination({ currentPage, rowsPerPage });
      const params = { searchQuery, size: rowsPerPage, page: currentPage };
      dispatch(Creators.getRunnersRequest(params));
    },
    [dispatch, searchQuery],
  );

  return (
    <>
      <Header />
      <RunnerSearch
        onSearchChange={handleSearchChange}
        onCompanyIdChange={handleCompanyIdChange}
        onShoppingMallIdChange={handleShoppingMallIdChange}
        onSearchByCompanyId={handleSearchByCompanyId}
        onSearchByShoppingMallId={handleSearchByShoppingMallId}
        searchQuery={searchQuery}
        companyId={companyId}
        shoppingMallId={shoppingMallId}
      />
      <RunnerTable
        onPaginationChange={handlePaginationChange}
        pagination={pagination}
      />
    </>
  );
};

const reduxKey = REDUX_KEY.GL_RUNNER_LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RunnerList);
