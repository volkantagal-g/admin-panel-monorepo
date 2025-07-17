import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { getCentralWarehousesForMatch, getCities, getDarkStoreList, marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { getMarketProductMasterCategories } from '@shared/api/marketProductMasterCategory';
import { getAllChildrenOfMasterCategory } from '@shared/api/supplyLogistic';

import { CATEGORY_LEVEL, CATEGORY_LEVELS } from '@app/pages/MarketProductChainManagement/constants';
import { DATASET_OPTIONS } from '../constants';
import { Creators, Types } from './actions';

function* fetchCities() {
  try {
    const response = yield call(getCities);
    const formattedCities = response.data.cities.map(city => ({
      value: city.id,
      label: city.name?.tr || city.name?.en || '',
      cityId: city.cityId,
    }));
    yield put(Creators.fetchCitiesSuccess(formattedCities));
  }
  catch (error) {
    if (!error.response || error.response.status !== 401) {
      yield put(Creators.fetchCitiesFailure(error.message || 'An unknown error occurred'));
    }
  }
}

function* fetchSuppliers() {
  try {
    const response = yield call(marketProductChainManagementAPI.supplier.getSuppliers);
    const formattedSuppliers = response.data?.suppliers?.map(supplier => ({
      value: supplier.vertexId,
      label: supplier.name,
      supplierDetails: supplier,
    })) || [];
    yield put(Creators.fetchSuppliersSuccess({ data: { suppliers: formattedSuppliers } }));
  }
  catch (error) {
    yield put(Creators.fetchSuppliersFailure(error.message || 'An unknown error occurred'));
  }
}

function* searchProducts({ searchTerm }) {
  try {
    yield put(Creators.setProductSearchLoading(true));

    const response = yield call(marketProductChainManagementAPI.common.getProductLookup, searchTerm);

    if (response.success) {
      yield put(Creators.searchProductsSuccess(response.data));
    }
    else {
      yield put(Creators.searchProductsFailure('Failed to search products'));
    }
  }
  catch (err) {
    yield put(Creators.searchProductsFailure(err instanceof Error ? err.message : 'An error occurred'));
  }
  finally {
    yield put(Creators.setProductSearchLoading(false));
  }
}

function* fetchLevels() {
  try {
    yield all([
      call(getMarketProductMasterCategoriesRequest, { level: 1 }),
      call(getMarketProductMasterCategoriesRequest, { level: 2 }),
      call(getMarketProductMasterCategoriesRequest, { level: 3 }),
      call(getMarketProductMasterCategoriesRequest, { level: 4 }),
    ]);
    yield put(Creators.fetchLevelsSuccess());
  }
  catch (error) {
    yield put(Creators.fetchLevelsFailure(error.message || 'An unknown error occurred'));
  }
}

function* fetchCentralWarehousesForMatch() {
  try {
    const response = yield call(getCentralWarehousesForMatch);

    const formattedWarehouses = response.data.map(warehouse => ({
      value: warehouse.id.toString(),
      label: warehouse.name || warehouse.warehouseDetails?.name || '',
      warehouseDetails: warehouse,
    }));

    yield put(Creators.fetchCentralWarehousesForMatchSuccess(formattedWarehouses));
  }
  catch (error) {
    if (!error.response || error.response.status !== 401) {
      yield put(Creators.fetchCentralWarehousesForMatchFailure(error.message || 'An unknown error occurred'));
    }
  }
}

function* fetchDarkStoreList() {
  try {
    const response = yield call(getDarkStoreList);
    const formattedDarkStores = response.data.map(darkStore => ({
      value: darkStore.id,
      label: darkStore.name,
      darkStoreDetails: darkStore,
    }));
    yield put(Creators.fetchDarkStoreListSuccess(formattedDarkStores));
  }
  catch (error) {
    if (!error.response || error.response.status !== 401) {
      yield put(Creators.fetchDarkStoreListFailure(error.message || 'An unknown error occurred'));
    }
  }
}

function* fetchDarkStoresForMatch({ dataset, selectedValue, filters = {} }) {
  try {
    let filterPayload = {};

    switch (dataset) {
      case DATASET_OPTIONS.CITY:
        filterPayload = { cityVertexIds: [selectedValue], ...filters };
        break;
      case DATASET_OPTIONS.CENTRAL_WAREHOUSE:
        filterPayload = { centralWarehouseVertexIds: [selectedValue], ...filters };
        break;
      case DATASET_OPTIONS.DARK_STORE:
        filterPayload = { darkstoreVertexIds: [selectedValue], ...filters };
        break;
      default:
        break;
    }

    const response = yield call(marketProductChainManagementAPI.darkstores.getDarkStoreNamesForMatch, filterPayload);

    if (response.success) {
      const darkStores = response.data.darkStores || [];

      const transformedData = {
        darkStores: darkStores.map(ds => ({
          id: ds.id,
          name: ds.name,
          categories: [],
        })),
        totalCount: darkStores.length || 0,
        hasNext: false,
      };

      yield put(Creators.fetchDarkStoresMatchSuccess(transformedData));
    }
    else {
      throw new Error('Failed to fetch darkstore match data');
    }
  }
  catch (error) {
    if (!error.response || error.response.status !== 401) {
      yield put(Creators.fetchDarkStoresMatchFailure(error.message || 'An unknown error occurred'));
    }
  }
}

function* getMarketProductMasterCategoriesRequest({ level }) {
  try {
    let categoryLevel;
    switch (level) {
      case CATEGORY_LEVEL.ONE:
        categoryLevel = CATEGORY_LEVELS[CATEGORY_LEVEL.ONE];
        break;
      case CATEGORY_LEVEL.TWO:
        categoryLevel = CATEGORY_LEVELS[CATEGORY_LEVEL.TWO];
        break;
      case CATEGORY_LEVEL.THREE:
        categoryLevel = CATEGORY_LEVELS[CATEGORY_LEVEL.THREE];
        break;
      case CATEGORY_LEVEL.FOUR:
        categoryLevel = CATEGORY_LEVELS[CATEGORY_LEVEL.FOUR];
        break;
      default:
        categoryLevel = CATEGORY_LEVELS[CATEGORY_LEVEL.ONE];
    }

    const requestBody = {
      countryCode: 'TR',
      level: categoryLevel,
    };

    const response = yield call(getMarketProductMasterCategories, requestBody);

    if (response && Array.isArray(response)) {
      const formattedData = response.map(category => ({
        value: category._id,
        label: category.name?.tr || category.name?.en || '',
      }));

      yield put(Creators.fetchMarketProductMasterCategoriesSuccess({ [`level${level}`]: formattedData }));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchMarketProductMasterCategoriesFailure(error.message || 'An unknown error occurred'));
  }
}

function* fetchAllChildrenOfMasterCategory({ baseCategoryId }) {
  try {
    const requestPayload = { baseCategoryId };
    const response = yield call(getAllChildrenOfMasterCategory, requestPayload);
    yield put(Creators.fetchAllChildrenOfMasterCategorySuccess(response));
  }
  catch (error) {
    yield put(Creators.fetchAllChildrenOfMasterCategoryFailure(error.message || 'An unknown error occurred'));
  }
}

function* watchFetchMarketProductMasterCategories() {
  yield takeLatest(Types.FETCH_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST, getMarketProductMasterCategoriesRequest);
}

function* watchFetchCities() {
  yield takeLatest(Types.FETCH_CITIES_REQUEST, fetchCities);
}

function* watchFetchSuppliers() {
  yield takeLatest(Types.FETCH_SUPPLIERS_REQUEST, fetchSuppliers);
}

function* watchSearchProducts() {
  yield takeLatest(Types.SEARCH_PRODUCTS_REQUEST, searchProducts);
}

function* watchFetchAllChildrenOfMasterCategory() {
  yield takeLatest(Types.FETCH_ALL_CHILDREN_OF_MASTER_CATEGORY_REQUEST, fetchAllChildrenOfMasterCategory);
}

function* watchFetchCentralWarehouses() {
  yield takeLatest(Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_REQUEST, fetchCentralWarehousesForMatch);
}

function* watchFetchDarkStoreList() {
  yield takeLatest(Types.FETCH_DARK_STORE_LIST_REQUEST, fetchDarkStoreList);
}

function* watchFetchDarkStoresMatch() {
  yield takeLatest(Types.FETCH_DARK_STORES_MATCH_REQUEST, fetchDarkStoresForMatch);
}

function* watchFetchLevels() {
  yield takeLatest(Types.FETCH_LEVELS_REQUEST, fetchLevels);
}

export function* matchDarkStoreSagas() {
  yield all([
    fork(watchFetchCities),
    fork(watchFetchCentralWarehouses),
    fork(watchFetchDarkStoreList),
    fork(watchFetchDarkStoresMatch),
    fork(watchFetchSuppliers),
    fork(watchSearchProducts),
    fork(watchFetchMarketProductMasterCategories),
    fork(watchFetchLevels),
    fork(watchFetchAllChildrenOfMasterCategory),
  ]);
}
