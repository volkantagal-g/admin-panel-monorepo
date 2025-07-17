import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { fetchSuppliersRequest } from '@app/pages/MarketProductChainManagement/components/DarkStoreSuppliersTable/redux/actions';
import { DARKSTORE_TABS, REDUX_STORE_KEYS, getirMarketDomainTypes } from '@app/pages/MarketProductChainManagement/constants';

import { Creators, Types } from './actions';
import { selectActiveTab, selectDarkStoreId, selectFilters, selectPagination, selectSort } from './reducer';

export const getTabsWithCounts = (t, products, warehouses, suppliers) => {
  return DARKSTORE_TABS.map(tab => {
    let count = 0;

    switch (tab.key) {
      case DARKSTORE_TABS.PRODUCTS:
        count = products?.totalCount || 0;
        break;
      case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
        count = warehouses?.totalCount || 0;
        break;
      case DARKSTORE_TABS.SUPPLIERS:
        count = suppliers?.totalCount || 0;
        break;
      default:
        count = 0;
        break;
    }

    return {
      ...tab,
      label: t(tab.label, { count }),
    };
  });
};

function* fetchDarkStoreDetail({ darkStoreId }) {
  try {
    if (!darkStoreId) {
      throw new Error('Dark store ID is required');
    }

    const response = yield call(marketProductChainManagementAPI.darkstore.getDarkStoreDetail, darkStoreId);

    if (!response) {
      throw new Error('No response received from API');
    }

    if (response?.success && response?.data) {
      yield put(Creators.fetchDarkStoreDetailSuccess(response.data));
    }
    else {
      throw new Error(response?.error?.message || 'Invalid response format or missing data');
    }
  }
  catch (error) {
    yield put(Creators.fetchDarkStoreDetailFailure(error?.message || 'Failed to fetch dark store detail'));
  }
}

function* fetchProducts() {
  try {
    const { filters, pagination, sort } = yield select(state => ({
      filters: selectFilters(state),
      pagination: selectPagination(state),
      sort: selectSort(state),
    }));
    const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;
    const { page, pageSize } = pagination;

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const requestBody = {
      pagination: { page, pageSize },
      filter: cleanFilters,
      sort: { field: sortField, order: sortOrder },
    };

    const response = yield call(marketProductChainManagementAPI.darkStores.getProducts, requestBody);

    if (response.success && response.data) {
      const { products = [], totalCount = 0 } = response.data;
      yield put(Creators.fetchProductsSuccess(products, totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchProductsFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching products',
      code: error?.response?.data?.code || 'FETCH_PRODUCTS_ERROR',
      details: error,
    }));
  }
}

function* fetchWarehouses() {
  try {
    const { filters, pagination, sort } = yield select(state => ({
      filters: selectFilters(state),
      pagination: selectPagination(state),
      sort: selectSort(state),
    }));
    const darkStoreId = yield select(selectDarkStoreId);

    if (!darkStoreId) {
      throw new Error('Dark store ID is required');
    }

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const response = yield call(marketProductChainManagementAPI.darkStores.getCentralWarehouses, darkStoreId, {
      filters: cleanFilters,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
      sort: {
        field: sort.field || 'name',
        order: (sort.order || 'asc').toLowerCase(),
      },
    });

    if (response.success && response.data) {
      const centralWarehouseList = response.data.centralWarehouses || response.data.centralWarehouseList || [];
      const totalCount = response.data.totalCount || 0;

      const formattedWarehouses = centralWarehouseList.map(warehouse => {
        const warehouseId = warehouse.id;

        const domainTypeNames = (warehouse.domainTypes || []).map(type => {
          const domainType = getirMarketDomainTypes[type];
          return domainType ? domainType.name : `Domain ${type}`;
        });

        return {
          id: warehouseId,
          key: warehouseId,
          name: warehouse.name,
          warehouseId: warehouse.warehouseId,

          domainTypes: warehouse.domainTypes || [],
          domain: domainTypeNames.join(', ') || '-',

          cityId: warehouse.cityId || '',
          city: warehouse.cityName?.tr || warehouse.cityName?.en || '-',

          regionId: warehouse.regionId || '',
          region: warehouse.regionName?.tr || warehouse.regionName?.en || '-',
        };
      });

      yield put(Creators.fetchWarehousesSuccess(formattedWarehouses, totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchWarehousesFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching warehouses',
      code: error?.response?.data?.code || 'FETCH_WAREHOUSES_ERROR',
      details: error,
    }));
  }
}

function* fetchSuppliers() {
  try {
    const { filters, pagination, sort } = yield select(state => ({
      filters: selectFilters(state),
      pagination: selectPagination(state),
      sort: selectSort(state),
    }));
    const darkStoreId = yield select(selectDarkStoreId);

    if (!darkStoreId) {
      throw new Error('Dark store ID is required');
    }

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const response = yield call(marketProductChainManagementAPI.darkStores.getSuppliers, darkStoreId, {
      filters: cleanFilters,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
      sort: {
        field: sort.field || 'name',
        order: (sort.order || 'asc').toLowerCase(),
      },
    });

    if (response.success && response.data) {
      const { suppliers = [], totalCount = 0 } = response.data;

      const formattedSuppliers = suppliers.map(supplier => {
        const supplierId = supplier.id;

        const domainTypeNames = (supplier.domainTypes || []).map(type => {
          const domainType = getirMarketDomainTypes[type];
          return domainType ? domainType.name : `Domain ${type}`;
        });

        return {
          id: supplierId,
          key: supplierId,
          name: supplier.name,
          supplierId: supplier.supplierId,

          domainTypes: supplier.domainTypes || [],
          domain: domainTypeNames.join(', ') || '-',

          cityId: supplier.cityId || '',
          city: supplier.cityName?.tr || supplier.cityName?.en || '-',

          regionId: supplier.regionId || '',
          region: supplier.regionName?.tr || supplier.regionName?.en || '-',
        };
      });

      yield put(Creators.fetchSuppliersSuccess(formattedSuppliers, totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchSuppliersFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching suppliers',
      code: error?.response?.data?.code || 'FETCH_SUPPLIERS_ERROR',
      details: error,
    }));
  }
}

function* handleTabChange({ tabKey }) {
  const darkStoreId = yield select(selectDarkStoreId);
  const currentState = yield select(state => state);

  if (!darkStoreId) {
    yield put(Creators.fetchDarkStoreDetailFailure({
      message: 'Dark store ID is missing',
      code: 'MISSING_DARK_STORE_ID',
    }));
    return;
  }

  const tabData = currentState[REDUX_STORE_KEYS.DARK_STORE_DETAIL];
  switch (Number(tabKey)) {
    case DARKSTORE_TABS.PRODUCTS:
      if (!tabData.products.isLoaded) {
        yield put(Creators.fetchProductsRequest(darkStoreId));
      }
      break;
    case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
      if (!tabData.warehouses.isLoaded) {
        yield put(Creators.fetchWarehousesRequest(darkStoreId));
      }
      break;
    case DARKSTORE_TABS.SUPPLIERS:
      if (!tabData.suppliers.isLoaded) {
        yield put(Creators.fetchSuppliersRequest(darkStoreId));
      }
      break;
    default:
      break;
  }
}

function* handleFiltersChange() {
  const darkStoreId = yield select(selectDarkStoreId);
  const activeTab = yield select(state => selectActiveTab(state));

  if (!darkStoreId) return;

  switch (Number(activeTab)) {
    case DARKSTORE_TABS.PRODUCTS:
      yield put(Creators.fetchProductsRequest());
      break;
    case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
      yield put(Creators.fetchWarehousesRequest());
      break;
    case DARKSTORE_TABS.SUPPLIERS:
      yield put(fetchSuppliersRequest());
      break;
    default:
      break;
  }
}

export function* darkStoreDetailSagas() {
  yield all([
    takeLatest(Types.FETCH_DARK_STORE_DETAIL_REQUEST, fetchDarkStoreDetail),
    takeLatest(Types.FETCH_PRODUCTS_REQUEST, fetchProducts),
    takeLatest(Types.FETCH_WAREHOUSES_REQUEST, fetchWarehouses),
    takeLatest(Types.FETCH_SUPPLIERS_REQUEST, fetchSuppliers),
    takeLatest(Types.UPDATE_ACTIVE_TAB, handleTabChange),
    takeLatest(Types.UPDATE_FILTERS, handleFiltersChange),
    takeLatest(Types.UPDATE_PAGINATION, handleFiltersChange),
    takeLatest(Types.UPDATE_SORT, handleFiltersChange),
  ]);
}
