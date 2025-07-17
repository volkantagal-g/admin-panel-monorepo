import { notification } from 'antd';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import {
  DARK_STORES_TABLE_ACTIONS,
  fetchDarkStoresFailure,
  fetchDarkStoresSuccess,
  fetchLookupsFailure,
  fetchLookupsSuccess,
} from './actions';

// Sort order mapping from Ant Design to API
const SORT_ORDER_MAP: Record<string, string> = {
  ascend: 'asc',
  descend: 'desc',
};

function* fetchDarkStoresSaga(action: { type: string; payload: any }): Generator<any, void, any> {
  try {
    const { productId, filters, pagination, sort } = action.payload;

    // State'i al
    const currentState = yield select(storeState => storeState.darkStoresTable);
    const { lookups } = currentState;

    // Pagination ve sort değerlerini store'a kaydet
    if (pagination) {
      yield put({ type: DARK_STORES_TABLE_ACTIONS.SET_PAGINATION, payload: pagination });
    }

    if (sort) {
      yield put({ type: DARK_STORES_TABLE_ACTIONS.SET_SORT, payload: sort });
    }

    if (filters) {
      yield put({ type: DARK_STORES_TABLE_ACTIONS.SET_FILTERS, payload: filters });
    }

    const requestFilters: Record<string, any> = {
      search: filters?.search,
      cityIds: filters?.city ? [filters.city] : undefined,
      regions: filters?.region ? [filters.region] : undefined,
      domainTypes: filters?.domain ? [Number(filters.domain)] : undefined,
      warehouseTypes: filters?.warehouseType ? [Number(filters.warehouseType)] : undefined,
      demographies: filters?.demography ? [Number(filters.demography)] : undefined,
      sizes: filters?.size ? [Number(filters.size)] : undefined,
    };

    // Clean up undefined values from filters
    Object.keys(requestFilters).forEach(key => {
      if (requestFilters[key] === undefined) {
        delete requestFilters[key];
      }
    });

    // UI'dan gelen alan adlarını API alan adlarına dönüştür
    let sortField = 'name'; // Varsayılan değer

    if (sort?.field) {
      // Tablo sütun dataIndex'ine göre doğru API alan adını belirle
      switch (sort.field) {
        case 'domains':
          sortField = 'domainType';
          break;
        case 'city':
          sortField = 'cityNameTR';
          break;
        case 'region':
          sortField = 'regionNameTR';
          break;
        case 'createdAt':
          sortField = 'createdAt';
          break;
        case 'name':
          sortField = 'name';
          break;
        default:
          sortField = sort.field;
      }
    }

    // API sort nesnesi
    const apiSort = {
      field: sortField,
      order: sort?.order ? SORT_ORDER_MAP[sort.order] : 'asc',
    };

    const response = yield call(marketProductChainManagementAPI.products.getDarkStores, productId, {
      filters: requestFilters,
      pagination: {
        page: pagination?.page || 1,
        pageSize: pagination?.pageSize || 10,
      },
      sort: apiSort,
    });

    // Lookup verileri için mapping hazırla
    const domainMap: Record<number, string> = {};
    const typeMap: Record<number, string> = {
      2: 'Warehouse',
      4: 'Store Conversion Grocery',
    };
    const demographyMap: Record<number, string> = {};
    const sizeMap: Record<number, string> = {};

    // State'deki lookup verilerini kullan
    lookups.domains.forEach((domain: any) => {
      const domainId = parseInt(domain.id, 10);
      if (!Number.isNaN(domainId)) {
        domainMap[domainId] = domain.name;
      }
    });

    lookups.demographies.forEach((demo: any) => {
      const demoId = parseInt(demo.id, 10);
      if (!Number.isNaN(demoId)) {
        demographyMap[demoId] = demo.name;
      }
    });

    lookups.sizes.forEach((size: any) => {
      const sizeId = parseInt(size.id, 10);
      if (!Number.isNaN(sizeId)) {
        sizeMap[sizeId] = size.name;
      }
    });

    // Transform dark store data
    const transformedData = {
      darkstoreList: (response?.data?.darkstoreList || []).map((store: any) => {
        // Domain'leri bir array olarak maple ve her birine uygun sınıf ata
        const domains = store.domainTypes?.map((domainType: number) => {
          // Domaine göre stil sınıfını belirle
          let domainClass = 'domainDefault';
          let domainName = domainMap[domainType] || '-';

          switch (domainType) {
            case 1: // Getir10
              domainClass = 'domainGetir10';
              domainName = 'Getir10';
              break;
            case 3: // GetirMore
              domainClass = 'domainGetirMore';
              domainName = 'GetirMore';
              break;
            case 4: // GetirWater
              domainClass = 'domainGetirWater';
              domainName = 'GetirWater';
              break;
            default:
              domainClass = 'domainDefault';
          }

          return {
            id: domainType,
            name: domainName,
            class: domainClass,
          };
        }) || [];

        // Demografinin sınıfını belirle - Antrasit, gri, mori tonlarına uygun
        let demographyClass = '';

        switch (store.demography) {
          case 1: // PREMIUM
            demographyClass = 'demographyPremium';
            break;
          case 2: // METROPOL
            demographyClass = 'demographyMetropol';
            break;
          case 3: // TRADITIONAL
            demographyClass = 'demographyTraditional';
            break;
          case 4: // UPPER_PREMIUM
            demographyClass = 'demographyUpperPremium';
            break;
          default:
            demographyClass = 'demographyUnknown';
        }

        // Size'ın görsel temsilini belirle
        let sizeClass = '';
        let sizeIcon = '';

        switch (store.size) {
          case 1: // MINI
            sizeClass = 'mini';
            sizeIcon = sizeMap[store.size] || 'Mini';
            break;
          case 2: // MIDI
            sizeClass = 'midi';
            sizeIcon = sizeMap[store.size] || 'Midi';
            break;
          case 3: // MAXI
            sizeClass = 'maxi';
            sizeIcon = sizeMap[store.size] || 'Maxi';
            break;
          case 4: // SC_MINI
            sizeClass = 'scMini';
            sizeIcon = sizeMap[store.size] || 'SC Mini';
            break;
          case 5: // SC_MIDI
            sizeClass = 'scMidi';
            sizeIcon = sizeMap[store.size] || 'SC Midi';
            break;
          case 6: // SC_MAXI
            sizeClass = 'scMaxi';
            sizeIcon = sizeMap[store.size] || 'SC Maxi';
            break;
          case 7: // EXTRA_MINI
            sizeClass = 'extraMini';
            sizeIcon = sizeMap[store.size] || 'Extra Mini';
            break;
          case 8: // GB_MAXI
            sizeClass = 'gbMaxi';
            sizeIcon = sizeMap[store.size] || 'GB Maxi';
            break;
          case 9: // GB_MIDI
            sizeClass = 'gbMidi';
            sizeIcon = sizeMap[store.size] || 'GB Midi';
            break;
          default:
            sizeClass = 'unknown';
            sizeIcon = '-';
        }

        return {
          id: store.id || store.name, // Fallback to name if id is not available
          key: store.id || store.name,
          name: store.name,
          domains,
          type: store.warehouseType || 0,
          city: store.cityName?.en || store.cityName?.tr || '-',
          region: store.regionName?.en || store.regionName?.tr || '-',
          demography: store.demography || '-',
          demographyClass,
          size: sizeMap[store.size] || '-',
          sizeClass,
          sizeIcon,
          categories: store.masterCategoryCount || 0,
          productsCount: store.productCount || 0,
          centralWarehousesCount: store.centeralWarehouseCount || 0,
          suppliersCount: store.supplierCount || 0,
        };
      }),
      totalCount: response?.data?.totalCount || 0,
    };

    yield put(fetchDarkStoresSuccess(transformedData));
  }
  catch (error) {
    yield put(fetchDarkStoresFailure(error as Error));
    notification.error({
      message: 'Error',
      description: 'Failed to fetch dark stores',
    });
  }
}

function* fetchLookupsSaga(): Generator<any, void, any> {
  try {
    const [citiesResponse, regionsResponse, domainTypesResponse, demographiesResponse, sizesResponse] = yield all([
      call(marketProductChainManagementAPI.location.getCityLookup),
      call(marketProductChainManagementAPI.location.getRegionLookup),
      call(marketProductChainManagementAPI.common.getDomainTypeLookup),
      call(marketProductChainManagementAPI.common.getDemographyLookup),
      call(marketProductChainManagementAPI.common.getSizeLookup),
    ]);

    // Transform lookup data
    const lookupData = {
      cities: (citiesResponse?.data?.cities || []).map((city: any) => ({
        id: city.cityId?.toString(),
        name: city.name?.en || city.name?.tr || '-',
      })),
      regions: (regionsResponse?.data?.regions || []).map((region: any) => ({
        id: region.regionId?.toString(),
        name: region.name?.en || region.name?.tr || '-',
      })),
      domains: (domainTypesResponse?.data?.domainTypes || []).map((domain: any) => ({
        id: domain.domainType?.toString(),
        name: domain.name,
      })),
      // API'den gelen demography listesini doğrudan kullan
      demographies: (demographiesResponse?.data?.demographies || []).map((demo: any) => ({
        id: demo.demography.toString(),
        name: demo.name,
      })),
      // API'den gelen size listesini doğrudan kullan
      sizes: (sizesResponse?.data?.sizes || []).map((size: any) => ({
        id: size.size.toString(),
        name: size.name,
      })),
    };

    yield put(fetchLookupsSuccess(lookupData));
  }
  catch (error) {
    yield put(fetchLookupsFailure(error as Error));
    notification.error({
      message: 'Error',
      description: 'Failed to fetch lookups',
    });
  }
}

export default function* saga() {
  yield takeLatest(DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_REQUEST, fetchDarkStoresSaga);
  yield takeLatest(DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_REQUEST, fetchLookupsSaga);
}
