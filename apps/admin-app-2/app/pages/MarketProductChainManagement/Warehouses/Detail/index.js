import { memo, useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createUseStyles } from 'react-jss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { usePageViewAnalytics } from '@shared/hooks';
import {
  ANALYTICS_CONFIG,
  PAGE_TYPES,
  REDUX_STORE_KEYS,
  WAREHOUSE_TABS,
} from '@app/pages/MarketProductChainManagement/constants';
import { WAREHOUSE_DETAIL_TYPES } from '@app/pages/MarketProductChainManagement/Warehouses/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import Content from '@app/pages/MarketProductChainManagement/components/Content';
import DetailInfo from '@app/pages/MarketProductChainManagement/components/DetailInfo';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import TabContentWrapper from '@app/pages/MarketProductChainManagement/components/TabContent';

import { Creators } from './redux/actions';
import {
  reducer, selectActiveTab,
  selectCurrentTabLoading,
  selectDarkStores,
  selectError,
  selectLoading,
  selectPagination,
  selectProducts,
  selectSuppliers,
  selectWarehouseData,
} from './redux/reducer';
import { warehouseDetailSagas as saga } from './redux/sagas';

const useStyles = createUseStyles({
  tabs: {
    '& .ant-tabs-tab': { padding: '12px 8px' },
    '& .ant-tabs-nav-wrap': { padding: '0px 24px' },
    '& .ant-tabs-nav': {
      borderBottom: '1px solid #F0F1F3 !important',
      margin: 0,
    },
    '& .ant-tabs-ink-bar': {
      height: '3px !important',
      borderRadius: '2px 2px 0 0',
    },
  },
});

const INITIAL_FORM_VALUES = {
  search: '',
  domain: '',
  demography: '',
  city: '',
  region: '',
};

const DETAIL_TABS = [
  {
    key: WAREHOUSE_TABS.PRODUCTS,
    label: 'PRODUCTS_WITH_COUNT',
  },
  {
    key: WAREHOUSE_TABS.DARK_STORE,
    label: 'DARK_STORE_WITH_COUNT',
  },
  {
    key: WAREHOUSE_TABS.SUPPLIERS,
    label: 'SUPPLIERS_WITH_COUNT',
  },
];

const WarehouseDetailPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: warehouseId } = useParams();

  const {
    warehouseData,
    products,
    darkStores,
    suppliers,
    loading,
    error,
    activeTab,
    pagination,
  } = useSelector(state => ({
    warehouseData: selectWarehouseData(state),
    products: selectProducts(state),
    darkStores: selectDarkStores(state),
    suppliers: selectSuppliers(state),
    loading: selectLoading(state),
    error: selectError(state),
    activeTab: selectActiveTab(state),
    pagination: selectPagination(state),
  }), shallowEqual);

  usePageViewAnalytics(ANALYTICS_CONFIG);

  useInjectReducer({ key: REDUX_STORE_KEYS.WAREHOUSE_DETAIL, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.WAREHOUSE_DETAIL, saga });

  useEffect(() => {
    if (warehouseId) {
      dispatch(Creators.fetchWarehouseDetailRequest(warehouseId));
    }
    return () => {
      dispatch(Creators.resetState());
    };
  }, [dispatch, warehouseId]);

  const handleChangeTabs = useCallback(tab => {
    dispatch(Creators.updateActiveTab(tab));
  }, [dispatch]);

  const updateFilters = useCallback(newFilters => {
    dispatch(Creators.updateFilters(newFilters));
  }, [dispatch]);

  const updateSort = useCallback(newSort => {
    dispatch(Creators.updateSort(newSort));
  }, [dispatch]);

  const updatePagination = useCallback(newPagination => {
    dispatch(Creators.updatePagination(newPagination));
  }, [dispatch]);

  const handleFormValuesChange = useCallback(values => {
    if (values.filters) {
      updateFilters(values.filters);
    }

    if (values.pagination) {
      const newPagination = {
        page: Number(values.pagination.page),
        pageSize: Number(values.pagination.pageSize),
      };
      updatePagination(newPagination);
    }

    if (values.sort) {
      updateSort(values.sort);
    }
  }, [updateFilters, updatePagination, updateSort]);

  const formattedData = {
    [WAREHOUSE_TABS.PRODUCTS]: {
      data: products.data,
      count: products.totalCount,
      pagination: {
        ...pagination,
        total: products.totalCount,
      },
    },
    [WAREHOUSE_TABS.DARK_STORE]: {
      data: darkStores.data,
      count: darkStores.totalCount,
      pagination: {
        ...pagination,
        total: darkStores.totalCount,
      },
    },
    [WAREHOUSE_TABS.SUPPLIERS]: {
      data: suppliers.data,
      count: suppliers.totalCount,
      pagination: {
        ...pagination,
        total: suppliers.totalCount,
      },
    },
  };

  const currentTabLoading = useSelector(selectCurrentTabLoading);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={warehouseData?.name}
          matchSupplierButton
          warehouseId={warehouseData?.warehouseId}
          isLoading={loading.detail}
        />
        <DetailInfo
          data={warehouseData}
          detailType={WAREHOUSE_DETAIL_TYPES.WAREHOUSE}
          isLoading={loading.detail}
        />
        <Content
          pageContent={(
            <TabContentWrapper
              activeTab={activeTab}
              formValues={INITIAL_FORM_VALUES}
              setFormValues={handleFormValuesChange}
              loading={currentTabLoading}
              tabData={formattedData}
              onTabChange={handleChangeTabs}
              pageType={PAGE_TYPES.WAREHOUSE}
              tabs={DETAIL_TABS}
              error={error}
              isDetailPage
              classes={classes}
            />
          )}
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(WarehouseDetailPage);
