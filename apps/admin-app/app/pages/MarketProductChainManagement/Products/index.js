import { memo, useCallback, useEffect, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';
import {
  PAGE_TYPES,
  PAGE_SIZE_OPTIONS,
  PRODUCT_ANALYTICS_CONFIG,
  REDUX_STORE_KEYS,
  TRANSLATION_NAMESPACE,
} from '@app/pages/MarketProductChainManagement/constants';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { RESTART_ON_REMOUNT } from '@shared/shared/constants';

import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import useStyles from '@app/pages/MarketProductChainManagement/Products/styles';

import { Creators } from './redux/actions';
import {
  reducer,
  selectCategories,
  selectCategoriesLoading,
  selectDemographies,
  selectDemographiesLoading,
  selectDomainTypes,
  selectDomainTypesLoading,
  selectHasFilters,
  selectIsProductsLoading,
  selectProductsCurrentPage,
  selectProductsData,
  selectProductsFilters,
  selectProductsPagination,
  selectProductsSort,
  selectSizes,
  selectSizesLoading,
  selectTotalPages,
} from './redux/reducer';
import { productSagas } from './redux/sagas';
import ProductFilters from './components/ProductFilters';
import ProductsTable from './components/ProductsTable';

const ProductList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);

  useInjectReducer({ key: REDUX_STORE_KEYS.PRODUCTS, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.PRODUCTS, saga: productSagas, mode: RESTART_ON_REMOUNT });

  const filters = useSelector(selectProductsFilters, shallowEqual);
  const pagination = useSelector(selectProductsPagination, shallowEqual);
  const sort = useSelector(selectProductsSort, shallowEqual);

  const updateSort = useCallback(newSort => {
    dispatch(Creators.updateSort(newSort));
  }, [dispatch]);

  const updatePagination = useCallback(newPagination => {
    dispatch(Creators.updatePagination(newPagination));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(Creators.resetFilters());
  }, [dispatch]);

  const formValues = useMemo(() => {
    const paginationWithTotal = {
      ...pagination,
      total: pagination.total || 0,
    };

    return {
      filters,
      pagination: paginationWithTotal,
      sort,
    };
  }, [filters, pagination, sort]);

  const setFormValues = useCallback(values => {
    // Tek bir aksiyon ile tüm form değerlerini güncelle
    // Bu şekilde sadece bir Redux aksiyon çağrısı yapılır ve saga'da da tek bir işlem tetiklenir
    const formUpdates = {};

    if (values.filters) formUpdates.filters = values.filters;
    if (values.pagination) formUpdates.pagination = values.pagination;
    if (values.sort) formUpdates.sort = values.sort;

    // Tüm form değerlerini tek bir aksiyonla güncelle
    dispatch(Creators.updateFormValues(formUpdates));
  }, [dispatch]);

  const handleProductImport = useCallback(loadedFile => {
    if (loadedFile) {
      dispatch(Creators.importProductsRequest(loadedFile));
    }
  }, [dispatch]);

  const handleProductExport = useCallback(() => {
    dispatch(Creators.exportProductsRequest());
  }, [dispatch]);

  usePageViewAnalytics({
    name: ROUTE[PRODUCT_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[PRODUCT_ANALYTICS_CONFIG.name].squad,
  });

  const products = useSelector(selectProductsData);
  const isLoading = useSelector(selectIsProductsLoading);
  const currentPage = useSelector(selectProductsCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const hasFilters = useSelector(selectHasFilters);

  const demographies = useSelector(selectDemographies) || [];
  const demographiesLoading = useSelector(selectDemographiesLoading) || false;

  const sizes = useSelector(selectSizes) || [];
  const sizesLoading = useSelector(selectSizesLoading) || false;

  const domainTypes = useSelector(selectDomainTypes) || [];
  const domainTypesLoading = useSelector(selectDomainTypesLoading) || false;

  const categories = useSelector(selectCategories) || [];
  const categoriesLoading = useSelector(selectCategoriesLoading) || false;

  useEffect(() => {
    // API çağrılarını doğrudan dispatch et
    dispatch(Creators.fetchProductsRequest());
    dispatch(Creators.fetchDemographiesRequest());
    dispatch(Creators.fetchSizesRequest());
    dispatch(Creators.fetchDomainTypesRequest());
    dispatch(Creators.fetchCategoriesRequest());

    return () => {
      dispatch(Creators.clearProductsState());
    };
  }, [dispatch]);

  const handleFilterChange = useCallback(newFilters => {
    const filteredValues = Object.entries(newFilters).reduce((acc, [key, value]) => {
      if (value === undefined || value === null || value === '') {
        return acc;
      }

      if (key === 'isLocal' && value !== true) {
        return acc;
      }

      acc[key] = value;
      return acc;
    }, {});

    setFormValues({
      ...formValues,
      filters: filteredValues,
      pagination: {
        ...formValues.pagination,
        page: 1,
      },
    });
  }, [formValues, setFormValues]);

  const handleTableChange = useCallback((paginationParams, tableFilters, sorter) => {
    // Sayfa veya sayfa boyutu değiştiyse pagination'ı güncelle
    if (paginationParams.current !== formValues.pagination.page ||
        paginationParams.pageSize !== formValues.pagination.pageSize) {
      // Pagination değişikliğini doğrudan güncelle
      const newPagination = {
        ...formValues.pagination,
        page: paginationParams.current,
        pageSize: paginationParams.pageSize,
      };

      // Sorter değişikliği de varsa, onu da güncelle
      let newSort = formValues.sort;
      if (sorter?.field) {
        let apiSortOrder;
        if (sorter.order === 'ascend') {
          apiSortOrder = 'asc';
        }
        else if (sorter.order === 'descend') {
          apiSortOrder = 'desc';
        }
        else {
          apiSortOrder = undefined;
        }

        // Get the column definition to access sortField
        const { column } = sorter;
        const sortField = column?.sortField || sorter.field;

        newSort = {
          field: sortField,
          order: apiSortOrder || 'desc',
        };
      }

      // Tek seferde hem pagination hem sort değişikliğini gönder
      if (newSort !== formValues.sort) {
        updateSort(newSort);
      }
      updatePagination(newPagination);

      // Pagination değişikliğinden sonra doğrudan API çağrısı yap
      dispatch(Creators.fetchProductsRequest());
    }
    // Sadece sıralama değiştiyse
    else if (sorter?.field) {
      let apiSortOrder;
      if (sorter.order === 'ascend') {
        apiSortOrder = 'asc';
      }
      else if (sorter.order === 'descend') {
        apiSortOrder = 'desc';
      }
      else {
        apiSortOrder = undefined;
      }

      // Get the column definition to access sortField
      const { column } = sorter;
      const sortField = column?.sortField || sorter.field;

      // Sıralama değiştiğinde sayfa 1'e dön
      updateSort({
        field: sortField,
        order: apiSortOrder || 'desc',
      });

      // Sayfa 1'e dön
      if (formValues.pagination.page !== 1) {
        updatePagination({
          ...formValues.pagination,
          page: 1,
        });
      }

      // Sıralama değişikliğinden sonra doğrudan API çağrısı yap
      dispatch(Creators.fetchProductsRequest());
    }
  }, [formValues, updatePagination, updateSort, dispatch]);

  const tableData = Array.isArray(products) ? products : [];

  const tablePagination = {
    current: Number(pagination?.page) || 1,
    pageSize: Number(pagination?.pageSize) || 10,
    total: Number(pagination?.total) || 0,
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showTotal: (totalRecords, range) => `${range[0]}-${range[1]} / ${totalRecords}`,
    position: ['bottom'],
    hideOnSinglePage: false,
    showQuickJumper: true,
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={t('COLUMNS.PRODUCTS')}
          importButton
          exportButton
          onReset={resetFilters}
          isLoading={isLoading}
          hasFilters={hasFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          onImportClick={handleProductImport}
          onExportClick={handleProductExport}
          pageType={PAGE_TYPES.PRODUCT}
        />
        <Content
          pageContent={(
            <div className={classes.filterContainer}>
              <ProductFilters
                filters={formValues.filters}
                onFilterChange={handleFilterChange}
                demographies={demographies}
                demographiesLoading={demographiesLoading}
                sizes={sizes}
                sizesLoading={sizesLoading}
                domainTypes={domainTypes}
                domainTypesLoading={domainTypesLoading}
                categories={categories}
                categoriesLoading={categoriesLoading}
              />

              <ProductsTable
                data={tableData}
                loading={isLoading}
                pagination={tablePagination}
                onChange={handleTableChange}
              />
            </div>
          )}
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(ProductList);
