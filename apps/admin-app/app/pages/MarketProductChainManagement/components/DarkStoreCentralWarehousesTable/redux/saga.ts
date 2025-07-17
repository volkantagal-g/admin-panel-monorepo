import { all, call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import {
  DEBOUNCE_TIME,
  DOMAIN_TYPE,
  getirMarketDomainTypes,
} from '@app/pages/MarketProductChainManagement/constants';
import * as actions from './actions';
import { ACTION_TYPES } from './constants';
import {
  selectFilters,
  selectPagination,
  selectSort,
} from './selectors';
import * as types from './types';

function getSortOrder(order?: string): 'asc' | 'desc' {
  if (order === 'ascend') return 'asc';
  if (order === 'descend') return 'desc';
  return 'asc';
}

function getSortField(field?: string): string {
  if (field === 'local') return 'isLocal';
  if (field === 'domain') return 'domainType';
  if (field === 'segment') return 'productSegmentPlanning';
  if (field === 'products') return 'productCount';
  if (field === 'suppliers') return 'supplierCount';
  return field || 'name';
}

function* fetchDomainTypesData(): types.FetchDomainTypesDataResult {
  try {
    const response: types.DomainTypesResponse = yield call(marketProductChainManagementAPI.common.getDomainTypeLookup);
    if (response && response.success && response.data && response.data.domainTypes) {
      const formattedDomains = response.data.domainTypes.map((domain: types.DomainTypeLookupResponse) => ({
        id: domain.id,
        name: domain.name,
        value: domain.id,
        domainType: domain.domainType,
      }));
      yield put(actions.fetchDomainTypesSuccess(formattedDomains));
      return response.data.domainTypes;
    }
    yield put(actions.fetchDomainTypesFailure(new Error('Invalid domain types response')));
    return [];
  }
  catch (error) {
    yield put(actions.fetchDomainTypesFailure(error instanceof Error ? error : new Error('Failed to fetch domain types')));
    return [];
  }
}

function* fetchCitiesData(): Generator {
  try {
    const response = yield call(marketProductChainManagementAPI.location.getCityLookup);
    if (response && response.success && response.data && response.data.cities) {
      const formattedCities = response.data.cities.map((city: types.CityLookupResponse) => ({
        id: city.id,
        name: city.name.tr || city.name.en,
        value: city.id,
      }));
      yield put(actions.fetchCitiesSuccess(formattedCities));
      return response.data.cities;
    }
    yield put(actions.fetchCitiesFailure(new Error('Invalid cities response')));
    return [];
  }
  catch (error) {
    yield put(actions.fetchCitiesFailure(error instanceof Error ? error : new Error('Failed to fetch cities')));
    return [];
  }
}

function* fetchCentralWarehousesSaga(
  action: types.FetchCentralWarehousesRequestAction | types.RefreshCentralWarehousesRequestAction,
): types.FetchCentralWarehousesSagaResult {
  try {
    const { darkStoreVertexId, filters, pagination, sort } = action.payload || {};

    const effectiveFilters = filters || (yield select(selectFilters));
    const effectivePagination = pagination || (yield select(selectPagination));
    const effectiveSort = sort || (yield select(selectSort));

    if (filters) {
      yield put(actions.updateFilters(filters));
    }

    if (pagination) {
      yield put(actions.updatePagination(pagination));
    }

    if (sort) {
      yield put(actions.updateSort(sort));
    }

    let domainTypeVertexIds = null;
    let cityVertexIds = null;

    if (effectiveFilters.domain) {
      const selectedDomainId = effectiveFilters.domain;
      domainTypeVertexIds = [selectedDomainId];
    }

    if (effectiveFilters.city) {
      const selectedCityId = effectiveFilters.city;
      cityVertexIds = [selectedCityId];
    }

    const requestBody = {
      filter: {
        name: effectiveFilters.search || undefined,
        domainTypeVertexIds: domainTypeVertexIds || undefined,
        cityVertexIds: cityVertexIds || undefined,
      },
      pagination: {
        page: effectivePagination.page,
        pageSize: effectivePagination.pageSize,
      },
      sort: {
        field: getSortField(effectiveSort?.field),
        order: getSortOrder(effectiveSort?.order),
      },
      ...(darkStoreVertexId && { darkstoreVertexId: darkStoreVertexId }),
    };

    const response = yield call(
      marketProductChainManagementAPI.darkstore.getCentralWarehouses,
      requestBody,
    );

    if (response && response.success && response.data) {
      const centralWarehouses = response.data.centralWarehouses.map((centralWarehouse: types.CentralWarehouseResponse) => {
        let domainString = '';
        const domainClasses: string[] = [];

        if (Array.isArray(centralWarehouse.domains) && centralWarehouse.domains.length > 0) {
          const domainValues = centralWarehouse.domains
            .map(domain => {
              const domainType = typeof domain === 'number' ? domain : domain.domainType;

              if (domainType === DOMAIN_TYPE.GETIR10) {
                domainClasses.push('domainGetir10');
              }
              else if (domainType === DOMAIN_TYPE.GETIR_MORE) {
                domainClasses.push('domainGetirMore');
              }
              else if (domainType === DOMAIN_TYPE.GETIR_WATER) {
                domainClasses.push('domainGetirWater');
              }
              return getirMarketDomainTypes[domainType]?.name || domainType.toString();
            })
            .filter(Boolean);

          domainString = domainValues.join(',');
        }

        const mappedWarehouse: types.CentralWarehouseData = {
          id: centralWarehouse.centralWarehouseVertexId,
          name: centralWarehouse.name,
          domain: domainString,
          domainClasses,
          city: centralWarehouse.city?.nameEN || '',
          region: centralWarehouse.region?.nameEN || '',
          categories: centralWarehouse.masterCategoryCount || 0,
          products: centralWarehouse.productCount || 0,
          suppliers: centralWarehouse.supplierCount || 0,
        };

        return mappedWarehouse;
      });

      const totalCount = response.data.totalCount || 0;
      yield put(actions.fetchCentralWarehousesSuccess(centralWarehouses, totalCount));
      if (action.payload?.onTotalCountChange) {
        action.payload.onTotalCountChange(totalCount);
      }
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(actions.fetchCentralWarehousesFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

function* darkStoreCentralWarehousesTableSaga(): Generator {
  yield all([
    debounce(DEBOUNCE_TIME, ACTION_TYPES.FETCH_CENTRAL_WAREHOUSES_REQUEST, fetchCentralWarehousesSaga),
    takeLatest(ACTION_TYPES.REFRESH_CENTRAL_WAREHOUSES_REQUEST, fetchCentralWarehousesSaga),
    takeLatest(ACTION_TYPES.FETCH_DOMAIN_TYPES_REQUEST, fetchDomainTypesData),
    takeLatest(ACTION_TYPES.FETCH_CITIES_REQUEST, fetchCitiesData),
  ]);
}

export default darkStoreCentralWarehousesTableSaga;
