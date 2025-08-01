import { call, debounce, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { CATEGORY_LEVEL_ENUM, marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import i18n from '@shared/i18n';
import { REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { API_FIELDS, FORM_FIELDS, L4_CATEGORIES_STORAGE } from '../constants';
import { Creators, Types } from './actions';
import { BulkEditChainsAction, Chain, ChainRawData, FilterChainsAction, FilterParams, L4Category } from './types';

function* filterChains(action: FilterChainsAction): Generator {
  try {
    yield put(Creators.setLoading(true));

    const requestBody = {
      page: action.filterParams.page || 1,
      domains: action.filterParams.domains,
      isEnabled: action.filterParams.isEnabled,
      locationTypes: action.filterParams.locationTypes?.map(type => type as string) || [],
      locations: action.filterParams.locations,
      pageSize: action.filterParams.pageSize || 20,
      products: action.filterParams.products,
      search: action.filterParams.search,
      sortBy: action.filterParams.sortBy,
      sortOrder: action.filterParams.sortOrder,
      storageType: action.filterParams.storageType,
      supplierTypes: action.filterParams.supplierTypes?.map(type => type as string) || [],
      suppliers: action.filterParams.suppliers,
      categories: action.filterParams.categories,
    };

    const response = yield call(marketProductChainManagementAPI.chain.filterChains, requestBody);

    if (response.success) {
      const { items = [] } = response.data;
      const { page, totalItems = 0, totalPages = 0 } = response.data.pagination || {};

      if (items.length === 0 && totalItems > 0 && page > 1) {
        const resetFilterParams = {
          ...action.filterParams,
          page: 1,
        };
        yield put(Creators.filterChainsRequest(resetFilterParams));
        return;
      }

      const filteredItems = items.filter((item: ChainRawData) => item.product && item.location && item.supplier);
      const mappedData: Chain[] = filteredItems.map((item: ChainRawData) => {
        const { domain } = item;
        const domainTypeId = domain?.id;
        const uniqueId = domainTypeId ? `${item.chain.id}-${domainTypeId}` : item.chain.id;

        return {
          id: item.chain.id,
          product: item.product.nameTR || item.product.nameEN,
          supplier: item.supplier.name,
          location: item.location.name,
          transferBoxCount: item.chain.transferBoxCount,
          minOrderQuantity: item.chain.minOrderQuantity,
          minStock: item.chain.minStock,
          segment: item.chain.segment,
          segment2: item.chain.segment2,
          planningSegment: item.chain.planningSegment,
          direct: item.chain.direct,
          active: item.chain.isEnabled !== undefined ? item.chain.isEnabled : item.chain.active,
          domain: item.domain?.name || '',
          name: item.chain.name,
          status: item.chain.status,
          createdAt: item.chain.createdAt,
          updatedAt: item.chain.updatedAt,
          updatedBy: item.chain.updatedBy,
          chainType: item.chain.chainType,
          batchSize: item.chain.batchSize,
          introductionDate: item.chain.introductionDate,
          terminationDate: item.chain.terminationDate,
          productId: item.product.productId,
          supplierType: item.supplier.type,
          locationType: item.location.type,
          rawData: item,
          uniqueId,
          key: uniqueId,
        };
      });

      yield put(Creators.filterChainsSuccess(mappedData, totalItems, {
        ...action.filterParams,
        page: page || 1,
        pageSize: action.filterParams.pageSize || 20,
        totalPages: totalPages || 0,
        hasNextPage: (page || 1) < (totalPages || 0),
        nextCursor: null,
      }));
    }
    else {
      yield put(Creators.filterChainsSuccess([], 0, {
        ...action.filterParams,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        nextCursor: null,
      }));
      yield put(Creators.filterChainsFailure('Failed to filter chains'));
    }
  }
  catch (error) {
    yield put(Creators.filterChainsSuccess([], 0, {
      ...action.filterParams,
      page: 1,
      totalPages: 0,
      hasNextPage: false,
      nextCursor: null,
    }));
    yield put(Creators.filterChainsFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
  finally {
    yield put(Creators.setLoading(false));
  }
}

function* bulkEditChains(action: BulkEditChainsAction): Generator {
  try {
    const { chainDetails, formValues } = action.updates;

    yield put(ToastCreators.pending({ message: i18n.t(`${TRANSLATION_NAMESPACE}:BULK_EDIT_PROCESSING`) }));

    const hasValues = Object.values(formValues).some(value => value !== undefined && value !== null && value !== '' &&
      !(Array.isArray(value) && value.length === 0));

    if (!hasValues) {
      yield put(ToastCreators.warning({ message: i18n.t(`${TRANSLATION_NAMESPACE}:FORM_VALIDATION.AT_LEAST_ONE_FIELD_REQUIRED`) }));
      yield put(Creators.bulkEditChainsFailure(
        i18n.t(`${TRANSLATION_NAMESPACE}:FORM_VALIDATION.AT_LEAST_ONE_FIELD_REQUIRED`),
      ));
      return;
    }

    const chains = chainDetails.map(({ chainId, domainTypeId }) => {
      let productSegmentLogistic;
      if (formValues?.segment2) {
        productSegmentLogistic = Number.isNaN(Number(formValues.segment2))
          ? undefined
          : Number(formValues.segment2);
      }

      let productSegmentPlanning;
      if (formValues?.segment) {
        productSegmentPlanning = Number.isNaN(Number(formValues.segment))
          ? undefined
          : Number(formValues.segment);
      }

      const update = Object.entries({
        storageType: formValues?.storageType || undefined,

        isEnabled: formValues?.isEnabled === true || formValues?.isEnabled === false ? formValues.isEnabled : undefined,
        pickedToZero: formValues?.pickedToZero === true || formValues?.pickedToZero === false ? formValues.pickedToZero : undefined,

        minStock: formValues?.minStock !== undefined && formValues?.minStock !== null ? formValues.minStock : undefined,
        batchSize: formValues?.batchSize !== undefined && formValues?.batchSize !== null ? formValues.batchSize : undefined,
        minOrderQuantity: formValues?.minOrderQuantity !== undefined && formValues?.minOrderQuantity !== null ? formValues.minOrderQuantity : undefined,

        introductionDate: formValues?.introductionDate ?
          formValues.introductionDate.utcOffset(3, true).toISOString(true) :
          undefined,
        terminationDate: formValues?.terminationDate ?
          formValues.terminationDate.utcOffset(3, true).toISOString(true) :
          undefined,

        productSegmentLogistic,
        productSegmentPlanning,
      })
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      return {
        chainId,
        domainTypeId,
        update,
      };
    });

    const validChains = chains.filter(chain => Object.keys(chain.update).length > 0);

    if (validChains.length === 0) {
      yield put(ToastCreators.warning({ message: i18n.t(`${TRANSLATION_NAMESPACE}:FORM_VALIDATION.AT_LEAST_ONE_FIELD_REQUIRED`) }));
      yield put(Creators.bulkEditChainsFailure(
        i18n.t(`${TRANSLATION_NAMESPACE}:FORM_VALIDATION.AT_LEAST_ONE_FIELD_REQUIRED`),
      ));
      return;
    }

    const response = yield call(marketProductChainManagementAPI.chain.bulkEditChains, { body: { chains: validChains } });

    yield put(Creators.bulkEditChainsSuccess(response.data));
    yield put(ToastCreators.success({ message: i18n.t(`${TRANSLATION_NAMESPACE}:BULK_EDIT_SUCCESS`) }));

    // Re-fetch the chain list with current filters
    const currentFilterParams = yield select((state: any) => state[REDUX_STORE_KEYS.CHAIN]?.filterParams);
    if (currentFilterParams) {
      yield put(Creators.filterChainsRequest(currentFilterParams));
    }
    else {
      // Fallback or log if filterParams are not found, though they should ideally exist
      // For example, dispatch with default params or log an error
      // For now, let's assume they exist or handle appropriately if this case is possible
    }

    yield put(Creators.closeEditDrawer());
  }
  catch (error) {
    yield put(Creators.bulkEditChainsFailure(error instanceof Error ? error.message : 'An error occurred'));
    yield put(ToastCreators.error({ message: i18n.t(`${TRANSLATION_NAMESPACE}:BULK_EDIT_ERROR`) }));
  }
}

function* updateChainActive(action: {
  type: string;
  chainId: string;
  isActive: boolean;
  domainType?: string | number;
  uniqueId: string;
}): Generator {
  try {
    const { chainId, isActive, domainType, uniqueId } = action;

    // Make the API call to update the chain
    yield call(marketProductChainManagementAPI.chain.updateChain, {
      chainId,
      updates: { isEnabled: isActive },
      domainType,
    });

    // Get current chains from state
    const { [REDUX_STORE_KEYS.CHAIN]: { chains } } = yield select();

    // Find the specific chain that matches both ID and domain
    const targetChainIndex = chains.findIndex((chain: any) => {
      const { domain } = chain.rawData;
      const domainId = domain?.id;
      const domainType2 = (domain as any)?.type;

      // Match by chain ID and either domain ID or domain type
      const isDomainMatch =
        (domainType && (domainId === domainType || domainType2 === domainType)) ||
        (!domainType && !domainId && !domainType2);

      return chain.id === chainId && isDomainMatch;
    });

    // Only update the state if we found the matching chain
    if (targetChainIndex !== -1) {
      // Create a new array with the updated chain
      const updatedChains = [...chains];
      updatedChains[targetChainIndex] = {
        ...updatedChains[targetChainIndex],
        active: isActive,
      };

      // Dispatch action with the entire updated chains array
      yield put(Creators.updateChainActiveSuccess(updatedChains, uniqueId));
      yield put(ToastCreators.success({ message: i18n.t(`${TRANSLATION_NAMESPACE}:CHAIN_ACTIVE_STATUS_UPDATED`) }));
    }
    else {
      // If chain wasn't found, consider it an error
      yield put(Creators.updateChainActiveFailure('Chain not found with the specified ID and domain', uniqueId));
      yield put(ToastCreators.error({ message: i18n.t(`${TRANSLATION_NAMESPACE}:CHAIN_ACTIVE_STATUS_UPDATE_ERROR`) }));
    }
  }
  catch (error) {
    yield put(Creators.updateChainActiveFailure(error instanceof Error ? error.message : 'An error occurred', action.uniqueId));
    yield put(ToastCreators.error({ message: i18n.t(`${TRANSLATION_NAMESPACE}:CHAIN_ACTIVE_STATUS_UPDATE_ERROR`) }));
  }
}

function* getCategoryOptions(): Generator {
  try {
    const params = {
      countryCode: 'TR',
      level: CATEGORY_LEVEL_ENUM.L3,
      fields: ['_id', 'name'],
    };
    const l3Response = yield call(marketProductChainManagementAPI.categories.getMasterCategoryV2, params);

    const l3Options = l3Response.map((category: { _id: string; name: { tr: string } }) => ({
      id: category._id,
      name: category.name.tr,
    }));

    yield put(Creators.getCategoryOptionsSuccess(l3Options));
  }
  catch (error) {
    yield put(Creators.getCategoryOptionsFailure(error));
    yield put(ToastCreators.error({ error: 'Failed to fetch category options', message: 'Failed to fetch category options' }));
  }
}

function* getL4CategoryOptions(action: any): Generator {
  try {
    if (!action.l3CategoryIds?.length) {
      yield put(Creators.getL4CategoryOptionsSuccess([]));
      return;
    }

    yield put(ToastCreators.pending({ message: 'Fetching L4 category options...' }));

    const storedL4Categories = localStorage.getItem(L4_CATEGORIES_STORAGE.KEY);
    const storedExpiry = localStorage.getItem(L4_CATEGORIES_STORAGE.EXPIRY_KEY);
    const now = Date.now();

    let l4Categories = [];
    let shouldFetchFromAPI = true;

    if (storedL4Categories && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (now < expiryTime) {
        l4Categories = JSON.parse(storedL4Categories);
        shouldFetchFromAPI = false;
      }
    }

    if (shouldFetchFromAPI) {
      const response = yield call(marketProductChainManagementAPI.chain.L4Lookup);

      if (response.success) {
        l4Categories = response.data;
        localStorage.setItem(L4_CATEGORIES_STORAGE.KEY, JSON.stringify(l4Categories));
        localStorage.setItem(L4_CATEGORIES_STORAGE.EXPIRY_KEY, (now + L4_CATEGORIES_STORAGE.EXPIRY_TIME).toString());
      }
      else {
        throw new Error('Failed to fetch L4 categories from API');
      }
    }

    const filteredL4Options = (l4Categories as L4Category[])
      .filter(category => action.l3CategoryIds.includes(category.parent))
      .map(category => ({
        id: category.id,
        name: category.name.tr,
      }));

    yield put(Creators.getL4CategoryOptionsSuccess(filteredL4Options));
  }
  catch (error) {
    yield put(Creators.getL4CategoryOptionsFailure(error));
    yield put(ToastCreators.error({
      error: 'Failed to fetch L4 category options',
      message: 'Failed to fetch L4 category options',
    }));
    yield put(Creators.setLoading(false));
  }
}

function* getChainNodes(action: { edgeType: string }): Generator {
  try {
    yield put(Creators.setLoading(true));

    const response = yield call(marketProductChainManagementAPI.chain.getChainNodes, action.edgeType);

    if (response.success) {
      const mappedData = response.data.map((item: any) => ({
        value: item.id,
        label: item.name.tr,
      }));

      yield put(Creators.getChainNodesSuccess(action.edgeType, mappedData));
      yield put(Creators.setLoading(false));
    }
    else {
      yield put(Creators.getChainNodesFailure('Failed to fetch chain nodes'));
      yield put(Creators.setLoading(false));
      yield put(ToastCreators.error({
        error: `Error fetching ${action.edgeType.toLowerCase()} options: An error occurred`,
        message: `Error fetching ${action.edgeType.toLowerCase()} options: An error occurred`,
      }));
    }
  }
  catch (err) {
    yield put(Creators.getChainNodesFailure(err instanceof Error ? err.message : 'An error occurred'));
    yield put(Creators.setLoading(false));
    yield put(ToastCreators.error({
      error: `Error fetching ${action.edgeType.toLowerCase()} options: ${
        err instanceof Error ? err.message : 'An error occurred'
      }`,
      message: `Error fetching ${action.edgeType.toLowerCase()} options: ${
        err instanceof Error ? err.message : 'An error occurred'
      }`,
    }));
  }
}

function* handleFormValuesChange(action: any): Generator {
  try {
    const { changedValues, allValues } = action;

    if (Object.keys(changedValues).length === 1 && FORM_FIELDS.CATEGORY_LEVEL_3 in changedValues) {
      const selectedL3Categories = changedValues[FORM_FIELDS.CATEGORY_LEVEL_3];

      if (selectedL3Categories?.length > 0) {
        const l3CategoryIds = selectedL3Categories.map((category: any) => (typeof category === 'string' ? category : category.id));
        yield put(Creators.getL4CategoryOptionsRequest(l3CategoryIds));
      }
      else {
        yield put(Creators.getL4CategoryOptionsRequest([]));
      }
      return;
    }

    const state = yield select();
    const { filterParams } = state[REDUX_STORE_KEYS.CHAIN];

    const newFilterParams: FilterParams = {
      ...filterParams,
      page: changedValues.page || 1,
      ...Object.entries(API_FIELDS)
        .filter(([formField]) => formField in allValues && formField !== FORM_FIELDS.CATEGORY_LEVEL_3)
        .reduce((acc, [formField, apiField]) => {
          if (formField === FORM_FIELDS.ENABLED) {
            return {
              ...acc,
              [apiField]: allValues[formField],
            };
          }

          return {
            ...acc,
            [apiField]: allValues[formField]?.map((item: any) => (typeof item === 'string' ? item : item?.id)) ?? [],
          };
        }, {}),
      categories: allValues[FORM_FIELDS.CATEGORY_LEVEL_4]?.map((item: any) => (typeof item === 'string' ? item : item?.id)) ?? [],
    };

    yield put(Creators.filterChainsRequest(newFilterParams));
  }
  catch (error) {
    yield put(ToastCreators.error({
      error: 'Error handling form values change',
      message: 'Error processing form changes',
    }));
  }
}

function* getDomainTypes(): Generator {
  try {
    yield put(Creators.setLoading(true));
    yield put(ToastCreators.pending({ message: 'Fetching domain options...' }));

    const response = yield call(marketProductChainManagementAPI.common.getDomainTypeLookup);

    if (response.success && response.data.domainTypes) {
      const mappedData = response.data.domainTypes.map((domain: any) => ({
        id: domain.id,
        name: domain.name,
      }));

      yield put(Creators.getDomainTypesSuccess(mappedData));
      yield put(Creators.setLoading(false));
      yield put(ToastCreators.success({ message: 'Domain options fetched successfully' }));
    }
    else {
      yield put(Creators.getDomainTypesFailure('Failed to fetch domain types'));
      yield put(Creators.setLoading(false));
      yield put(ToastCreators.error({
        error: 'Error fetching domain options: An error occurred',
        message: 'Error fetching domain options: An error occurred',
      }));
    }
  }
  catch (err) {
    yield put(Creators.getDomainTypesFailure(err instanceof Error ? err.message : 'An error occurred'));
    yield put(Creators.setLoading(false));
    yield put(ToastCreators.error({
      error: `Error fetching domain options: ${
        err instanceof Error ? err.message : 'An error occurred'
      }`,
      message: `Error fetching domain options: ${
        err instanceof Error ? err.message : 'An error occurred'
      }`,
    }));
  }
}

function* searchProducts(action: { type: string; searchTerm: string }): Generator {
  try {
    yield put(Creators.setProductSearchLoading(true));

    const response = yield call(marketProductChainManagementAPI.common.getProductLookup, action.searchTerm);

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

export default function* chainSaga(): Generator {
  yield debounce(500, Types.FILTER_CHAINS_REQUEST, filterChains);
  yield takeLatest(Types.HANDLE_FORM_VALUES_CHANGE_REQUEST, handleFormValuesChange);
  yield takeLatest(Types.BULK_EDIT_CHAINS_REQUEST, bulkEditChains);
  yield takeLatest(Types.GET_CATEGORY_OPTIONS_REQUEST, getCategoryOptions);
  yield takeLatest(Types.GET_L4_CATEGORY_OPTIONS_REQUEST, getL4CategoryOptions);
  yield takeEvery(Types.GET_CHAIN_NODES_REQUEST as any, getChainNodes);
  yield takeLatest(Types.UPDATE_CHAIN_ACTIVE_REQUEST, updateChainActive);
  yield takeLatest(Types.GET_DOMAIN_TYPES_REQUEST, getDomainTypes);
  yield takeLatest(Types.SEARCH_PRODUCTS_REQUEST, searchProducts);
}
