import { message } from 'antd';
import { get } from 'lodash';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { getLangKey } from '@shared/i18n';
import {
  fetchDarkStoresFailure,
  fetchDarkStoresSuccess,
  fetchLookupsFailure,
  fetchLookupsSuccess,
} from './actions';
import {
  FETCH_DARK_STORES_REQUEST,
  FETCH_LOOKUPS_REQUEST,
} from './constants';
import type { DarkStoreFilters, FetchDarkStoresRequestAction } from './types';

// Sort order mapping from Ant Design to API
const SORT_ORDER_MAP: Record<string, string> = {
  ascend: 'asc',
  descend: 'desc',
};

// Çok dilli metinleri doğru şekilde alma
const getLocalizedName = (obj: any): string => {
  // Obje tanımsızsa boş değer döndür
  if (!obj) return '-';

  // name zaten varsa onu kullan
  if (obj.name && typeof obj.name === 'string') return obj.name;

  // Eğer name bir obje ise (tr/en gibi) onu işle
  if (obj.name && typeof obj.name === 'object') {
    const nameObj = obj.name as Record<string, any>;
    const lang = getLangKey();

    if (nameObj[lang]) return String(nameObj[lang]);
    if (nameObj.tr) return String(nameObj.tr);
    if (nameObj.en) return String(nameObj.en);

    // Hiçbirini bulamazsak, objedeki ilk değeri kullan
    const keys = Object.keys(nameObj);
    if (keys.length > 0) return String(nameObj[keys[0]]);
  }

  // Doğrudan çok dilli alanları kontrol et
  const lang = getLangKey().toUpperCase();
  const nameLang = `name${lang}`;

  if (obj[nameLang] && typeof obj[nameLang] === 'string') return obj[nameLang];
  if (obj.nameTR && typeof obj.nameTR === 'string') return obj.nameTR;
  if (obj.nameEN && typeof obj.nameEN === 'string') return obj.nameEN;

  // Son çare olarak obj.id ve ardından tekrar obj.name dene (tip kontrolü olmadan)
  if (obj.id) return String(obj.id);
  if (obj.name) return String(obj.name);

  // Hiçbiri yoksa boş string döndür
  return '-';
};

interface DarkStoreRequestBody {
  filter: {
    darkstoreName?: string;
    domainTypeVertexIds?: string[];
    warehouseTypeVertexIds?: string[];
    cityVertexIds?: string[];
    regionVertexIds?: string[];
    demographyVertexIds?: string[];
    sizeVertexIds?: string[];
    centralWarehouseVertexIds?: string[];
    [key: string]: string | string[] | undefined;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
  sort?: {
    field: string;
    order: string;
  };
}

export function* fetchDarkStores(action: FetchDarkStoresRequestAction): Generator<any, void, any> {
  try {
    const { filters, pagination, sort } = action.payload;

    // Doğru tip ile requestBody oluşturma
    const requestBody: DarkStoreRequestBody = {
      filter: {},
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    };

    // Eğer sort değeri gelirse (undefined değilse) işle
    if (sort?.field) {
      // UI alan adlarını API alan adlarına dönüştür
      let apiField = sort.field;

      // UI'da xCount, API'de x olarak geçen alanları düzelt
      if (apiField === 'suppliersCount') apiField = 'supplierCount';
      if (apiField === 'productsCount') apiField = 'productCount';
      if (apiField === 'centralWarehousesCount') apiField = 'centralWarehouseCount';

      requestBody.sort = {
        field: apiField,
        order: sort.order ? SORT_ORDER_MAP[sort.order] || 'asc' : 'asc',
      };
    }

    // Filtre alanlarını tek tek kontrol etmek yerine, daha dinamik bir yöntem kullan
    if (filters) {
      const filterMapping: Record<string, string> = {
        search: 'darkstoreName',
        domain: 'domainTypeVertexIds',
        warehouseType: 'warehouseTypeVertexIds',
        city: 'cityVertexIds',
        region: 'regionVertexIds',
        demography: 'demographyVertexIds',
        size: 'sizeVertexIds',
      };

      // Tüm olası filtreleri döngüyle işle
      Object.entries(filterMapping).forEach(([clientKey, apiKey]) => {
        const value = filters[clientKey as keyof DarkStoreFilters];
        if (value) {
          // search için string, diğerleri için array gönder
          if (clientKey === 'search') {
            requestBody.filter[apiKey] = value.toString();
          }
          else {
            requestBody.filter[apiKey as keyof DarkStoreRequestBody['filter']] = [value.toString()];
          }
        }
      });
    }

    const response = yield call(marketProductChainManagementAPI.darkstores.getDarkStores, requestBody);

    const darkStores = get(response, 'data.darkStores', []).map((item: any) => ({
      id: item.id,
      name: item.name,
      domains: Array.isArray(item.domainTypes) ? item.domainTypes.map((d: any) => ({
        id: d.domainType || d.id,
        name: d.name || '',
        class: `domain-${d.domainType || d.id}`,
      })) : [],
      type: item.warehouseType?.warehouseType || 0,
      city: getLocalizedName(item.city),
      region: getLocalizedName(item.region),
      // İyileştirilmiş demography alanı - UUID yerine kullanıcı dostu bir isim gösterilir
      demography: getLocalizedName(item.demography),
      demographyClass: item.demography?.class || `demography-${item.demography?.demography || 0}`,
      size: getLocalizedName(item.size),
      sizeClass: item.size?.class || `size-${item.size?.size || 0}`,
      sizeIcon: item.size?.icon || '',
      productsCount: item.productCount || 0,
      centralWarehousesCount: item.centralWarehouseCount || 0,
      suppliersCount: item.supplierCount || 0,
      warehouseId: item.warehouseId || '',
    }));

    // Get total count from response
    const totalCount = get(response, 'data.totalCount', 0);

    yield put(fetchDarkStoresSuccess({
      darkStores,
      totalCount,
      filters: filters || {},
      pagination,
      sort,
    }));
  }
  catch (error: any) {
    yield put(fetchDarkStoresFailure(error));
    message.error('Failed to fetch dark stores');
  }
}

// Çıkarır array from the response based on known patterns
const extractArray = (response: any): any[] => {
  if (!response) return [];

  // data.XX formatında veri olabilir
  if (response.data) {
    // data.domainTypes gibi özel alanları kontrol et
    if (response.data.domainTypes && Array.isArray(response.data.domainTypes)) {
      return response.data.domainTypes;
    }

    // data.cities, data.regions gibi alanları kontrol et
    const keys = ['items', 'domainTypes', 'cities', 'regions', 'domains', 'demographies', 'sizes'];
    const foundKey = keys.find(key => response.data[key] && Array.isArray(response.data[key]));
    if (foundKey) {
      return response.data[foundKey];
    }

    // Eğer data kendisi bir array ise
    if (Array.isArray(response.data)) {
      return response.data;
    }
  }

  // Direkt response'un kendisi array olabilir
  if (Array.isArray(response)) {
    return response;
  }

  // Hiçbir array bulunamadıysa boş array döndür
  return [];
};

// Veriyi dizi formatına çeviren yardımcı fonksiyon
const ensureArray = (data: any): any[] => {
  // Eğer data null veya undefined ise boş dizi döndür
  if (!data) return [];

  // Eğer data zaten bir dizi ise doğrudan döndür
  if (Array.isArray(data)) return data;

  // Eğer data bir obje ise ve items veya data gibi bir array property'si varsa onu döndür
  if (typeof data === 'object') {
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.results)) return data.results;

    // Özel olarak cities, regions gibi dizi property'lerini kontrol et
    const keys = ['cities', 'regions', 'domains', 'demographies', 'sizes'];
    const foundKey = keys.find(key => Array.isArray(data[key]));
    if (foundKey) {
      return data[foundKey];
    }
  }

  // Hiçbir dizi bulunamazsa boş dizi döndür
  return [];
};

export function* fetchLookups(): Generator<any, void, any> {
  try {
    // Referansları kontrol ettim, API metotları şu şekilde çağrılmalı
    const [
      citiesResponse,
      regionsResponse,
      domainsResponse,
      demographiesResponse,
      sizesResponse,
      warehouseTypesResponse,
    ] = yield all([
      call(marketProductChainManagementAPI.location.getCityLookup, ''),
      call(marketProductChainManagementAPI.location.getRegionLookup, ''),
      call(marketProductChainManagementAPI.common.getDomainTypeLookup, ''),
      call(marketProductChainManagementAPI.common.getDemographyLookup, ''),
      call(marketProductChainManagementAPI.common.getSizeLookup, ''),
      call(marketProductChainManagementAPI.common.getWarehouseTypeLookup, ''),
    ]);

    // XCommFloatingLabel.Select için optionsData formatını hazırlayan fonksiyon
    const formatLookupData = (items: any[]) => {
      return items.map((item: any) => {
        // If item already has the structure we need (value and label), use it directly
        if (item.value !== undefined && item.label !== undefined) {
          return {
            value: item.value,
            label: item.label,
            // Backward compatibility
            id: item.id || item.value,
            name: item.label,
          };
        }

        // Otherwise, use existing logic for other endpoints
        // ID'yi güvenli şekilde al
        const id = item.id || item.value || item._id || item.cityId ||
                   item.regionId || item.domainType || item.demography ||
                   item.size || item.warehouseType;

        // Çok dilli ismi çözümle
        const name = getLocalizedName(item);

        // Güvenli ID ve isim oluştur
        const safeId = id !== undefined && id !== null ? id : Math.random().toString(36).substring(2);
        const safeName = name || String(safeId);

        // Ant Design Select için doğru formatı oluştur (value ve label alanları gerekli)
        return {
          value: safeId, // Select için value - REQUIRED
          label: safeName, // Select için label - REQUIRED
          // Geriye uyumluluk için ek alanlar
          id: safeId,
          name: safeName,
        };
      });
    };

    // API yanıtlarından veriyi çıkartıp formatlı dizi olarak dönüştür
    const cities = formatLookupData(extractArray(citiesResponse));
    const regions = formatLookupData(extractArray(regionsResponse));
    const domains = formatLookupData(extractArray(domainsResponse));
    const demographies = formatLookupData(extractArray(demographiesResponse));
    const sizes = formatLookupData(extractArray(sizesResponse));
    const warehouseTypes = formatLookupData(extractArray(warehouseTypesResponse));

    yield put(fetchLookupsSuccess({
      cities,
      regions,
      domains,
      demographies,
      sizes,
      warehouseTypes,
    }));
  }
  catch (error: any) {
    yield put(fetchLookupsFailure(error));
    message.error('Failed to fetch lookup data');
  }
}

export default function* darkStoresSaga() {
  yield debounce(300, FETCH_DARK_STORES_REQUEST, fetchDarkStores);
  yield takeLatest(FETCH_LOOKUPS_REQUEST, fetchLookups);
}
