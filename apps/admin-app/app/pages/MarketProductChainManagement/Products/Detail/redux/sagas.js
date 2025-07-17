import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { PRODUCT_DETAIL_TABS, PRODUCT_TABS, REDUX_STORE_KEYS, getirMarketDomainTypes } from '@app/pages/MarketProductChainManagement/constants';
import { fetchSuppliersRequest } from '@app/pages/MarketProductChainManagement/components/SuppliersTable/redux/actions';

import { Creators, Types } from './actions';
import { selectActiveTab, selectFilters, selectPagination, selectProductId, selectSort } from './reducer';

export const getTabsWithCounts = (t, darkStores, suppliers, warehouses) => {
  return PRODUCT_DETAIL_TABS.map(tab => {
    let count = 0;

    switch (tab.key) {
      case PRODUCT_TABS.DARK_STORE:
        count = darkStores?.totalCount || 0;
        break;
      case PRODUCT_TABS.SUPPLIERS:
        return {
          ...tab,
          label: t('SUPPLIERS_LIST'),
        };
      case PRODUCT_TABS.CENTRAL_WAREHOUSE:
        count = warehouses?.totalCount || 0;
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

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(marketProductChainManagementAPI.products.getProductDetail, productId);

    if (response.success && response.data) {
      yield put(Creators.fetchProductDetailSuccess(response.data));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchProductDetailFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching product detail',
      code: error?.response?.data?.code || 'FETCH_PRODUCT_DETAIL_ERROR',
      details: error,
    }));
  }
}

function* fetchDarkStores({ productId }) {
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

    const response = yield call(marketProductChainManagementAPI.products.getDarkStores, productId, requestBody);

    if (response.success && response.data) {
      const { darkstoreList = [], totalCount = 0 } = response.data;
      yield put(Creators.fetchDarkStoresSuccess(darkstoreList, totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchDarkStoresFailure({
      message: error?.response?.data?.message || error?.message || 'An error occurred while fetching dark stores',
      code: error?.response?.data?.code || 'FETCH_DARK_STORES_ERROR',
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
    const productId = yield select(selectProductId);

    if (!productId) {
      throw new Error('Product ID is required');
    }

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const response = yield call(marketProductChainManagementAPI.products.getCentralWarehouses, productId, {
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
      const { centralWarehouseList = [], totalCount = 0 } = response.data;

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

function* handleTabChange({ tabKey }) {
  const productId = yield select(selectProductId);
  const currentState = yield select(state => state);

  if (!productId) {
    yield put(Creators.fetchProductDetailFailure({
      message: 'Product ID is missing',
      code: 'MISSING_PRODUCT_ID',
    }));
    return;
  }

  const tabData = currentState[REDUX_STORE_KEYS.PRODUCT_DETAIL];
  switch (Number(tabKey)) {
    case PRODUCT_TABS.DARK_STORE:
      if (!tabData.darkStores.isLoaded) {
        yield put(Creators.fetchDarkStoresRequest(productId));
      }
      break;
    case PRODUCT_TABS.SUPPLIERS:
      if (!tabData.suppliers.isLoaded) {
        yield put(fetchSuppliersRequest({ productId }));
      }
      break;
    case PRODUCT_TABS.CENTRAL_WAREHOUSE:
      if (!tabData.warehouses.isLoaded) {
        yield put(Creators.fetchWarehousesRequest());
      }
      break;
    default:
      break;
  }
}

function* handleFiltersChange() {
  const productId = yield select(selectProductId);
  const activeTab = yield select(state => selectActiveTab(state));

  if (!productId) return;

  switch (Number(activeTab)) {
    case PRODUCT_TABS.DARK_STORE:
      yield put(Creators.fetchDarkStoresRequest(productId));
      break;
    case PRODUCT_TABS.SUPPLIERS:
      yield put(fetchSuppliersRequest({ productId }));
      break;
    case PRODUCT_TABS.CENTRAL_WAREHOUSE:
      yield put(Creators.fetchWarehousesRequest());
      break;
    default:
      break;
  }
}

export function* productDetailSagas() {
  yield all([
    takeLatest(Types.FETCH_PRODUCT_DETAIL_REQUEST, fetchProductDetail),
    takeLatest(Types.FETCH_DARK_STORES_REQUEST, fetchDarkStores),
    takeLatest(Types.FETCH_WAREHOUSES_REQUEST, fetchWarehouses),
    takeLatest(Types.UPDATE_ACTIVE_TAB, handleTabChange),
    takeLatest(Types.UPDATE_FILTERS, handleFiltersChange),
    takeLatest(Types.UPDATE_PAGINATION, handleFiltersChange),
    takeLatest(Types.UPDATE_SORT, handleFiltersChange),
  ]);
}
