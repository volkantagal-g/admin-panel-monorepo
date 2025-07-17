import { message } from 'antd';
import { all, call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import * as actions from './actions';
import {
  selectCentralWarehousesFilters,
  selectCentralWarehousesPagination,
  selectCentralWarehousesSort,
} from './selectors';
import * as types from './types';

// Debounce süresi (milisaniye cinsinden)
const DEBOUNCE_TIME = 500;

// Utility function to get the sort order for API request
function getSortOrder(order?: string): 'asc' | 'desc' {
  if (order === 'ascend') return 'asc';
  if (order === 'descend') return 'desc';
  return 'asc';
}

type RequestFilter = {
  search?: string;
  cityIds?: number[];
  domainTypes?: number[];
  regions?: number[];
};

function* fetchCentralWarehousesSaga(
  action: ReturnType<typeof actions.fetchCentralWarehousesRequest>,
): Generator<any, void, any> {
  try {
    const productId = action.payload?.productId;
    const filters = action.payload?.filters || (yield select(selectCentralWarehousesFilters));
    const pagination = action.payload?.pagination || (yield select(selectCentralWarehousesPagination));
    const sort = action.payload?.sort || (yield select(selectCentralWarehousesSort));

    // Önce state'i güncelle
    if (action.payload?.filters) {
      yield put(actions.updateFilters(action.payload.filters));
    }

    if (action.payload?.pagination) {
      yield put(actions.updatePagination(action.payload.pagination));
    }

    if (action.payload?.sort) {
      yield put(actions.updateSort(action.payload.sort));
    }

    // Create request body
    const requestBody: any = {
      filter: {
        search: filters.search || undefined,
        cityIds: filters.city ? [filters.city] : undefined,
        domainTypes: filters.domain ? [parseInt(filters.domain, 10)] : undefined,
        regions: filters.region ? [filters.region] : undefined,
      } as RequestFilter,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
      sort: sort ? {
        field: sort.field || 'name',
        order: getSortOrder(sort.order),
      } : {
        field: 'name',
        order: 'asc',
      },
    };

    // Clean up undefined values in filter
    Object.keys(requestBody.filter).forEach(key => {
      if (requestBody.filter[key] === undefined) {
        delete requestBody.filter[key];
      }
    });

    let response;

    // Use different API endpoints based on whether productId is available
    if (productId) {
      // If productId is provided, use the product-specific endpoint
      response = yield call(
        marketProductChainManagementAPI.products.getCentralWarehouses,
        productId,
        {
          filters: requestBody.filter,
          pagination: requestBody.pagination,
          sort: requestBody.sort,
        },
      );
    }
    else {
      // If no productId, use the general filter endpoint
      response = yield call(
        marketProductChainManagementAPI.centralWarehouses.getCentralWarehouses,
        requestBody,
      );
    }

    if (response && response.success && response.data) {
      // Determine the correct data structure based on response
      const centralWarehouseList = response.data.centralWarehouses || [];
      const centralWarehouses = centralWarehouseList.map((warehouse: any) => {
        // Process domain types
        let domainString = '';

        if (Array.isArray(warehouse.domainTypes) && warehouse.domainTypes.length > 0) {
          domainString = warehouse.domainTypes
            .map((domain: any) => {
              if (typeof domain === 'object' && domain.domainType) {
                return domain.domainType.toString();
              }
              return typeof domain === 'number' ? domain.toString() : '';
            })
            .filter(Boolean)
            .join(',');
        }

        // Get city name with proper fallbacks
        let cityName = '';
        if (warehouse.cityName) {
          cityName = warehouse.cityName.en || warehouse.cityName.tr || '';
        }
        else if (warehouse.city && warehouse.city.name) {
          cityName = warehouse.city.name.en || warehouse.city.name.tr || '';
        }

        // Get region name with proper fallbacks
        let regionName = '';
        if (warehouse.regionName) {
          regionName = warehouse.regionName.en || warehouse.regionName.tr || '';
        }
        else if (warehouse.region && warehouse.region.name) {
          regionName = warehouse.region.name.en || warehouse.region.name.tr || '';
        }

        return {
          id: warehouse.id || `cw-${Math.random().toString(36).substr(2, 9)}`,
          name: warehouse.name || '',
          domain: domainString,
          city: cityName,
          region: regionName,
          state: warehouse.state,
        };
      });

      const totalCount = response.data.totalCount || 0;
      yield put(actions.fetchCentralWarehousesSuccess(centralWarehouses, totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    message.error(`Failed to fetch central warehouses: ${errorMessage}`);
    yield put(actions.fetchCentralWarehousesFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

// Fetch cities
function* fetchCitiesSaga(
  action: ReturnType<typeof actions.fetchCitiesRequest>,
): Generator<any, void, any> {
  try {
    const search = action.payload;
    // @ts-ignore - API tiplemesi hatalı, ama çalışıyor
    const response = yield call(marketProductChainManagementAPI.location.getCityLookup, search);

    if (response && response.success) {
      const cities = (response.data?.cities || []).map((city: any) => ({
        id: city.id || city.cityId,
        name: city.name?.en || city.name?.tr || city.name,
        value: city.id || city.cityId,
      }));

      yield put(actions.fetchCitiesSuccess(cities));
    }
    else {
      throw new Error('Invalid response format for cities');
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    message.error(`Failed to fetch cities: ${errorMessage}`);
    yield put(actions.fetchCitiesFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

// Fetch regions
function* fetchRegionsSaga(
  action: ReturnType<typeof actions.fetchRegionsRequest>,
): Generator<any, void, any> {
  try {
    const search = action.payload;
    // @ts-ignore - API tiplemesi hatalı, ama çalışıyor
    const response = yield call(marketProductChainManagementAPI.location.getRegionLookup, search);

    if (response && response.success) {
      const regions = (response.data?.regions || []).map((region: any) => ({
        id: region.id || region.regionId,
        name: region.name?.en || region.name?.tr || region.name,
        value: region.id || region.regionId,
      }));

      yield put(actions.fetchRegionsSuccess(regions));
    }
    else {
      throw new Error('Invalid response format for regions');
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    message.error(`Failed to fetch regions: ${errorMessage}`);
    yield put(actions.fetchRegionsFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

// Fetch domain types
function* fetchDomainTypesSaga(): Generator<any, void, any> {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getDomainTypeLookup);

    if (response && response.success) {
      const domainTypes = (response.data?.domainTypes || []).map((domain: any) => ({
        id: domain.domainType.toString(),
        name: domain.name,
        value: domain.domainType.toString(),
      }));

      yield put(actions.fetchDomainTypesSuccess(domainTypes));
    }
    else {
      throw new Error('Invalid response format for domain types');
    }
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    message.error(`Failed to fetch domain types: ${errorMessage}`);
    yield put(actions.fetchDomainTypesFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

export default function* centralWarehouseTableSaga(): Generator<any, void, any> {
  yield all([
    debounce(DEBOUNCE_TIME, types.FETCH_CENTRAL_WAREHOUSES_REQUEST, fetchCentralWarehousesSaga),
    takeLatest(types.FETCH_CITIES_REQUEST, fetchCitiesSaga),
    takeLatest(types.FETCH_REGIONS_REQUEST, fetchRegionsSaga),
    takeLatest(types.FETCH_DOMAIN_TYPES_REQUEST, fetchDomainTypesSaga),
  ]);
}
