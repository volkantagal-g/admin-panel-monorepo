import { useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import TabContentWrapper from '@app/pages/MarketProductChainManagement/components/TabContent';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import useStyles from '@app/pages/MarketProductChainManagement/Warehouses/styles';
import {
  CENTRAL_WAREHOUSE_ANALYTICS_CONFIG,
  PAGE_TYPES,
  REDUX_STORE_KEYS,
  TRANSLATION_NAMESPACE,
  WAREHOUSE_TABS,
} from '@app/pages/MarketProductChainManagement/constants';

import { Creators } from './redux/actions';
import { reducer } from './redux/reducer';
import { centralWarehouseSagas } from './redux/sagas';

const INITIAL_FORM_VALUES = {
  search: '',
  domain: '',
  demography: '',
  city: '',
  region: '',
};

const Warehouses = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    data: { centralWarehouses, darkStores, totalCount, darkStoresTotal },
    loading: { centralWarehouses: isCentralWarehousesLoading, darkStores: isDarkStoresLoading },
    error,
    filters,
    pagination,
    sort,
  } = useSelector(state => {
    const storeData = state?.[REDUX_STORE_KEYS.CENTRAL_WAREHOUSES];
    return {
      data: {
        centralWarehouses: storeData?.data?.centralWarehouses || [],
        darkStores: storeData?.data?.darkStores || [],
        totalCount: storeData?.data?.totalCount || 0,
        darkStoresTotal: storeData?.data?.darkStoresTotal || 0,
      },
      loading: storeData?.loading || { centralWarehouses: false, darkStores: false },
      error: storeData?.error || null,
      filters: storeData?.filters || {},
      pagination: storeData?.pagination || { page: 1, pageSize: 10 },
      sort: storeData?.sort || { field: 'name', order: 'asc' },
    };
  }, shallowEqual);

  const [activeTab, setActiveTab] = useState(WAREHOUSE_TABS.DARK_STORE);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [selectedFreezeColumns, setSelectedFreezeColumns] = useState([]);
  const [selectedManageColumns, setSelectedManageColumns] = useState(
    activeTab === WAREHOUSE_TABS.DARK_STORE
      ? [
        'name',
        'domain',
        'type',
        'city',
        'region',
        'demography',
        'size',
        'products',
        'centralWarehouses',
        'suppliers',
        'actions',
      ]
      : [
        'name',
        'domain',
        'type',
        'city',
        'region',
        'darkStores',
        'products',
        'suppliers',
      ],
  );

  usePageViewAnalytics(CENTRAL_WAREHOUSE_ANALYTICS_CONFIG);

  useInjectReducer({ key: REDUX_STORE_KEYS.CENTRAL_WAREHOUSES, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.CENTRAL_WAREHOUSES, saga: centralWarehouseSagas });

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getRegionsRequest({ cityId: null }));
    dispatch(Creators.fetchCentralWarehousesRequest({ filters: {} }));
    dispatch(Creators.fetchDarkStoresRequest({ filters: {} }));

    // Sayfadan çıkıldığında tüm saga'ları durdur
    return () => {
      dispatch(Creators.clearWarehousesState());
    };
  }, [dispatch]);

  const requestParams = useMemo(() => ({
    filters,
    pagination,
    sort,
  }), [filters, pagination, sort]);

  useEffect(() => {
    const hasFiltersOrSort = Object.keys(requestParams.filters).length > 0 ||
                            requestParams.sort.field !== 'name' ||
                            requestParams.sort.order !== 'asc';
    const hasPaginationChange = requestParams.pagination.page !== 1 ||
                               requestParams.pagination.pageSize !== 10;

    if (hasFiltersOrSort || hasPaginationChange) {
      if (activeTab === WAREHOUSE_TABS.CENTRAL_WAREHOUSE) {
        dispatch(Creators.fetchCentralWarehousesRequest(requestParams));
      }
      else if (activeTab === WAREHOUSE_TABS.DARK_STORE) {
        dispatch(Creators.fetchDarkStoresRequest(requestParams));
      }
    }
  }, [dispatch, activeTab, requestParams]);

  const handleWarehouseImport = useCallback(loadedFile => {
    if (loadedFile) {
      dispatch(Creators.importDarkStoresRequest(loadedFile));
    }
  }, [dispatch]);

  const handleExport = useCallback(() => {
    dispatch(Creators.exportDarkStoreRequest());
  }, [dispatch]);

  const handleChangeTabs = useCallback(newTab => {
    const numericTab = parseInt(newTab, 10);
    setActiveTab(numericTab);
    dispatch(Creators.updateActiveTab(numericTab));

    setSelectedManageColumns(
      numericTab === WAREHOUSE_TABS.DARK_STORE
        ? [
          'name',
          'domain',
          'type',
          'city',
          'region',
          'demography',
          'size',
          'products',
          'centralWarehouses',
          'suppliers',
          'actions',
        ]
        : [
          'name',
          'domain',
          'type',
          'city',
          'region',
          'darkStores',
          'products',
          'suppliers',
        ],
    );
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

  const resetFilters = useCallback(() => {
    dispatch(Creators.resetFilters());
    setFormValues(INITIAL_FORM_VALUES);
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

  const formattedData = useMemo(() => {
    const warehouseData = Array.isArray(centralWarehouses) ? centralWarehouses.map(warehouse => ({
      id: warehouse.id,
      name: warehouse.name,
      domain: warehouse.domainTypes?.map(d => d.name).join(', ') || '',
      city: warehouse.city?.name?.tr || warehouse.city?.name?.en || '',
      region: warehouse.region?.name?.tr || warehouse.region?.name?.en || '',
      type: warehouse.state === 300 ? 'Active' : 'Inactive',
      darkStores: warehouse.darkStoreCount || 0,
      products: warehouse.productCount || 0,
      suppliers: warehouse.supplierCount || 0,
    })) : [];

    const darkStoreData = Array.isArray(darkStores) ? darkStores.map(darkStore => ({
      id: darkStore.id,
      name: darkStore.name,
      domain: darkStore.domainTypes?.map(d => d.name).join(', ') || '',
      type: darkStore.warehouseType?.name || '-',
      city: darkStore.city?.nameTR || darkStore.city?.nameEN || '',
      region: darkStore.region?.nameTR || darkStore.region?.nameEN || '',
      demography: darkStore.demography?.name || '-',
      size: darkStore.size?.name || '-',
      products: darkStore.productCount || 0,
      centralWarehouses: darkStore.centralWarehouseCount || 0,
      suppliers: darkStore.supplierCount || 0,
      state: darkStore.state === 200 ? 'Active' : 'Inactive',
    })) : [];

    const formatted = {
      [WAREHOUSE_TABS.CENTRAL_WAREHOUSE]: {
        data: warehouseData,
        count: totalCount,
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: totalCount,
        },
        total: totalCount,
        darkStoresCount: warehouseData.reduce((sum, warehouse) => sum + (warehouse.darkStores || 0), 0),
        productsCount: warehouseData.reduce((sum, warehouse) => sum + (warehouse.products || 0), 0),
        suppliersCount: warehouseData.reduce((sum, warehouse) => sum + (warehouse.suppliers || 0), 0),
      },
      [WAREHOUSE_TABS.DARK_STORE]: {
        data: darkStoreData,
        count: darkStoresTotal,
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: darkStoresTotal,
        },
        total: darkStoresTotal,
        productsCount: darkStoreData.reduce((sum, darkStore) => sum + (darkStore.products || 0), 0),
        suppliersCount: darkStoreData.reduce((sum, darkStore) => sum + (darkStore.suppliers || 0), 0),
        centralWarehousesCount: darkStoreData.reduce((sum, darkStore) => sum + (darkStore.centralWarehouses || 0), 0),
      },
    };

    return formatted;
  }, [centralWarehouses, darkStores, totalCount, darkStoresTotal, pagination]);

  const loading = activeTab === WAREHOUSE_TABS.CENTRAL_WAREHOUSE
    ? isCentralWarehousesLoading
    : isDarkStoresLoading;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          importButton
          exportButton
          actionButton
          isLoading={loading}
          isExporting={false}
          isImporting={false}
          onReset={resetFilters}
          title={t('COLUMNS.WAREHOUSES')}
          onImportClick={handleWarehouseImport}
          onExportClick={handleExport}
          pageType={PAGE_TYPES.WAREHOUSE}
        />
        <Content
          pageContent={(
            <TabContentWrapper
              activeTab={activeTab}
              formValues={formValues}
              setFormValues={handleFormValuesChange}
              classes={classes}
              loading={loading}
              tabData={formattedData}
              onTabChange={handleChangeTabs}
              pageType={PAGE_TYPES.WAREHOUSE}
              tabs={[
                { key: WAREHOUSE_TABS.DARK_STORE, label: t('DARK_STORE_WITH_COUNT') },
                { key: WAREHOUSE_TABS.CENTRAL_WAREHOUSE, label: t('CENTRAL_WAREHOUSE_WITH_COUNT') },
              ]}
              error={error}
              isWarehouseList
              selectedFreezeColumns={selectedFreezeColumns}
              setSelectedFreezeColumns={setSelectedFreezeColumns}
              selectedManageColumns={selectedManageColumns}
              setSelectedManageColumns={setSelectedManageColumns}
            />
          )}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Warehouses;
