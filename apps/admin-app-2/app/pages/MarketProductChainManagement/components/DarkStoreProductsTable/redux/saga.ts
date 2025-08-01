import { all, call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { getLangKey } from '@shared/i18n';
import {
  DEBOUNCE_TIME,
  DEMOGRAPHY,
  DEMOGRAPHY_CLASSES,
  DEMOGRAPHY_LABELS,
  DOMAIN_CLASSES,
  DOMAIN_TYPE,
  SEGMENT_LABELS,
  SIZE,
  SIZE_CLASSES,
  SIZE_LABELS,
  getirMarketDomainTypes,
} from '@app/pages/MarketProductChainManagement/constants';
import * as actions from './actions';
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
  return field || 'name';
}

function* fetchProductsSaga(
  action: types.FetchProductsRequestAction | types.RefreshProductsRequestAction,
): types.FetchProductsSagaResult {
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
    if (effectiveFilters.domain) {
      domainTypeVertexIds = [effectiveFilters.domain];
    }

    let demographyVertexIds = null;
    if (effectiveFilters.demography) {
      demographyVertexIds = [effectiveFilters.demography];
    }

    const requestBody: types.RequestBody | types.DarkStoreRequestBody = {
      filter: {
        productName: effectiveFilters.search || undefined,
        domainTypeVertexIds: domainTypeVertexIds || undefined,
        demographyVertexIds: demographyVertexIds || undefined,
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

    Object.keys(requestBody.filter).forEach(key => {
      if (requestBody.filter[key as keyof types.RequestFilter] === undefined) {
        delete requestBody.filter[key as keyof types.RequestFilter];
      }
    });

    const response = yield call(
      marketProductChainManagementAPI.darkstore.getProducts,
      requestBody,
    );

    if (response && response.success && response.data) {
      const productList = response.data.products || [];
      const langKey = getLangKey();

      const domainMap: Record<number, { name: string }> = {
        [DOMAIN_TYPE.GETIR10]: { name: getirMarketDomainTypes[DOMAIN_TYPE.GETIR10].name },
        [DOMAIN_TYPE.GETIR_MORE]: { name: getirMarketDomainTypes[DOMAIN_TYPE.GETIR_MORE].name },
        [DOMAIN_TYPE.GETIR_WATER]: { name: getirMarketDomainTypes[DOMAIN_TYPE.GETIR_WATER].name },
      };

      const demographyMap: Record<number, { name: string; class: string }> = {
        [DEMOGRAPHY.PREMIUM]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.PREMIUM][langKey], class: DEMOGRAPHY_CLASSES[DEMOGRAPHY.PREMIUM].class },
        [DEMOGRAPHY.METROPOL]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.METROPOL][langKey], class: DEMOGRAPHY_CLASSES[DEMOGRAPHY.METROPOL].class },
        [DEMOGRAPHY.TRADITIONAL]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.TRADITIONAL][langKey], class: DEMOGRAPHY_CLASSES[DEMOGRAPHY.TRADITIONAL].class },
        [DEMOGRAPHY.UPPER_PREMIUM]: { name: DEMOGRAPHY_LABELS[DEMOGRAPHY.UPPER_PREMIUM][langKey], class: DEMOGRAPHY_CLASSES[DEMOGRAPHY.UPPER_PREMIUM].class },
      };

      const sizeMap: Record<number, { name: string; class: string }> = {
        [SIZE.MINI]: { name: SIZE_LABELS[SIZE.MINI][langKey], class: SIZE_CLASSES[SIZE.MINI].class },
        [SIZE.MIDI]: { name: SIZE_LABELS[SIZE.MIDI][langKey], class: SIZE_CLASSES[SIZE.MIDI].class },
        [SIZE.MAXI]: { name: SIZE_LABELS[SIZE.MAXI][langKey], class: SIZE_CLASSES[SIZE.MAXI].class },
        [SIZE.SC_MINI]: { name: SIZE_LABELS[SIZE.SC_MINI][langKey], class: SIZE_CLASSES[SIZE.SC_MINI].class },
        [SIZE.SC_MIDI]: { name: SIZE_LABELS[SIZE.SC_MIDI][langKey], class: SIZE_CLASSES[SIZE.SC_MIDI].class },
        [SIZE.SC_MAXI]: { name: SIZE_LABELS[SIZE.SC_MAXI][langKey], class: SIZE_CLASSES[SIZE.SC_MAXI].class },
        [SIZE.EXTRA_MINI]: { name: SIZE_LABELS[SIZE.EXTRA_MINI][langKey], class: SIZE_CLASSES[SIZE.EXTRA_MINI].class },
        [SIZE.GB_MAXI]: { name: SIZE_LABELS[SIZE.GB_MAXI][langKey], class: SIZE_CLASSES[SIZE.GB_MAXI].class },
        [SIZE.GB_MIDI]: { name: SIZE_LABELS[SIZE.GB_MIDI][langKey], class: SIZE_CLASSES[SIZE.GB_MIDI].class },
      };

      const products = productList.map((product: any) => {
        let domainString = '';
        const domainClasses = DOMAIN_CLASSES;

        if (Array.isArray(product.domains) && product.domains.length > 0) {
          const domainValues = product.domains
            .map((domain: any) => {
              let domainType = null;
              if (typeof domain === 'object' && domain.domainType) {
                domainType = domain.domainType;
              }
              else if (typeof domain === 'number') {
                domainType = domain;
              }

              if (domainType && domainMap[domainType]) {
                return domainMap[domainType].name;
              }
              return typeof domainType === 'number' ? domainType.toString() : '';
            })
            .filter(Boolean);

          domainString = domainValues.join(',');
        }

        const demographyValues = product.demographies && product.demographies.length > 0
          ? product.demographies.map((demo: any) => {
            const { demography } = demo;
            return demography && demographyMap[demography]
              ? {
                id: demo.id,
                value: demography,
                name: demographyMap[demography].name,
                class: demographyMap[demography].class || 'demographyUnknown',
              }
              : {
                id: demo.id,
                value: demography,
                name: demo.name || demography?.toString() || '-',
                class: 'demographyUnknown',
              };
          })
          : [];

        const sizeValues = product.sizes && product.sizes.length > 0
          ? product.sizes.map((sizeItem: any) => {
            const { size } = sizeItem;
            return size && sizeMap[size]
              ? {
                id: sizeItem.id,
                value: size,
                name: sizeMap[size].name,
                class: sizeMap[size].class || 'unknown',
              }
              : {
                id: sizeItem.id,
                value: size,
                name: sizeItem.name || size?.toString() || '-',
                class: 'unknown',
              };
          })
          : [];

        const category = product.masterCategory && product.masterCategory.nameEN
          ? product.masterCategory.nameEN
          : '';

        const segmentValue = product.segment;
        let segment = '';

        if (segmentValue && segmentValue !== 0 && SEGMENT_LABELS[segmentValue as keyof typeof SEGMENT_LABELS]) {
          segment = SEGMENT_LABELS[segmentValue as keyof typeof SEGMENT_LABELS][langKey] || '';
        }
        else if (segmentValue === 0) {
          segment = '-';
        }
        else {
          segment = segmentValue?.toString() || '';
        }

        const demographyClass = (
          demographyValues.length > 0 ? demographyValues[0].class : 'demographyUnknown'
        );

        const sizeClass = (
          sizeValues.length > 0 ? sizeValues[0].class : 'unknown'
        );

        const domainClass = DOMAIN_CLASSES[0];

        return {
          id: product.productVertexId || `cw-${Math.random().toString(36).substr(2, 9)}`,
          name: product.name?.[langKey] || '',
          domain: domainString,
          domainClasses,
          state: product.state,
          demography: demographyValues.length > 0 ? demographyValues[0].name : '',
          demographyClass,
          demographyValues,
          size: sizeValues.length > 0 ? sizeValues[0].name : '',
          sizeClass,
          sizeValues,
          category,
          segment,
          local: product.local,
        };
      });

      const totalCount = response.data.totalCount || 0;
      yield put(actions.fetchProductsSuccess(products, totalCount));
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(actions.fetchProductsFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

function* fetchDomainTypesSaga(): types.FetchDomainTypesSagaResult {
  try {
    const response: types.DomainTypesResponse = yield call(marketProductChainManagementAPI.common.getDomainTypeLookup);

    if (response && response.success) {
      const domainTypes = (response.data?.domainTypes || []).map((domain: types.DomainTypeLookupResponse) => ({
        id: domain.id,
        name: domain.name,
        value: domain.id,
      }));
      yield put(actions.fetchDomainTypesSuccess(domainTypes));
    }
    else {
      throw new Error('Invalid response format for domain types');
    }
  }
  catch (error) {
    yield put(actions.fetchDomainTypesFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

function* fetchDemographicsSaga(): types.FetchDomainTypesSagaResult {
  try {
    const response: types.DemographiesResponse = yield call(marketProductChainManagementAPI.common.getDemographyLookup);

    if (response && response.success) {
      const demographies = (response.data?.demographies || []).map((demography: types.DemographyLookupResponse) => ({
        id: demography.id,
        name: demography.name || `Demography ${demography.demography}`,
        value: demography.id,
        demography: demography.demography,
      }));
      yield put(actions.fetchDemographicsSuccess(demographies));
    }
    else {
      throw new Error('Invalid response format for demographies');
    }
  }
  catch (error) {
    yield put(actions.fetchDemographicsFailure(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
}

export default function* centralWarehouseTableSaga(): types.CentralWarehouseTableSagaResult {
  yield all([
    debounce(DEBOUNCE_TIME, types.FETCH_PRODUCTS_REQUEST, fetchProductsSaga),
    takeLatest(types.REFRESH_PRODUCTS_REQUEST, fetchProductsSaga),
    takeLatest(types.FETCH_DOMAIN_TYPES_REQUEST, fetchDomainTypesSaga),
    takeLatest(types.FETCH_DEMOGRAPHICS_REQUEST, fetchDemographicsSaga),
  ]);
}
