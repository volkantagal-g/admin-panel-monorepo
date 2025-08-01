import { useDispatch } from 'react-redux';

import { useState } from 'react';

import { Layout } from 'antd';

import { useSearchParams } from 'react-router-dom';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Filter, Header, Table } from './components';
import { getInitialValues } from './components/Filter/filterHelper';
import { base64ToJson, jsonToBase64 } from '@shared/utils/common';

const reduxKey = REDUX_KEY.EMPLOYEE_ASSET.LIST;

const EmployeeAssetListPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilters = searchParams.get('filters');
  const filtersJson = base64ToJson(queryFilters);
  if (!filtersJson.deviceStatuses) {
    filtersJson.deviceStatuses = getInitialValues({})?.deviceStatuses;
  }
  if (!filtersJson.assetCategory) {
    filtersJson.assetCategory = getInitialValues({})?.assetCategory;
  }
  const [filters, setFilters] = useState(filtersJson ?? {});

  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_ASSET_LIST.name, squad: ROUTE.EMPLOYEE_ASSET_LIST.squad }); // TODO fix ROUTE

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const handleFiltersChange = currentFilters => {
    setFilters(currentFilters);
    const base64Filters = jsonToBase64(currentFilters);
    searchParams.set('filters', base64Filters);
    setSearchParams(searchParams);
  };
  return (
    <Layout>
      <Header filters={filters} />
      <Filter filters={filters} onFiltersChange={handleFiltersChange} />
      <Table filters={filters} />
    </Layout>
  );
};

export default EmployeeAssetListPage;
