import { createReducer } from 'reduxsauce';

import { Types, Creators } from './actions';
import { FORM_FIELDS } from '../constants';
import { ChainState } from './types';

interface CategoryOption {
  id: string;
  name: string;
}

interface CategoryOptions {
  [FORM_FIELDS.CATEGORY_LEVEL_3]: CategoryOption[];
  [FORM_FIELDS.CATEGORY_LEVEL_4]: CategoryOption[];
}

const INITIAL_STATE: ChainState = {
  chains: [],
  selectedChainIds: [],
  isBulkEditMode: false,
  isDrawerOpen: false,
  isLoading: false,
  isBulkEditing: false,
  error: null,
  sortConfig: null,
  nextCursor: null,
  hasNextPage: false,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  filterParams: {
    page: 1,
    pageSize: 20,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  categoryOptions: {
    [FORM_FIELDS.CATEGORY_LEVEL_3]: [],
    [FORM_FIELDS.CATEGORY_LEVEL_4]: [],
  },
  chainNodeOptions: {
    supplier: [],
    location: [],
    domain: [],
  },
  domainTypes: [],
  isSearchingProducts: false,
  productSearchOptions: [],
  updatingChains: {},
};

export default function chainReducer(state = INITIAL_STATE, action: any): ChainState {
  switch (action.type) {
    case Types.SET_LOADING:
      return {
        ...state,
        isLoading: action.loading,
      };

    case Types.FILTER_CHAINS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        chains: [],
        filterParams: {
          ...state.filterParams,
          ...action.filterParams,
        },
        currentPage: action.filterParams.page || state.currentPage,
      };

    case Types.FILTER_CHAINS_SUCCESS:
      return {
        ...state,
        chains: action.data,
        total: action.total,
        error: null,
        isLoading: false,
        currentPage: action.filterParams.page || state.currentPage || 1,
        totalPages: action.filterParams.totalPages || Math.ceil(action.total / (action.filterParams.pageSize || 20)),
        filterParams: {
          ...state.filterParams,
          ...action.filterParams,
          page: action.filterParams.page || state.currentPage || 1,
          pageSize: action.filterParams.pageSize || state.filterParams.pageSize || 20,
        },
        nextCursor: action.filterParams.nextCursor,
        hasNextPage: action.filterParams.hasNextPage,
      };

    case Types.FILTER_CHAINS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case Types.SET_SELECTED_CHAINS:
      return {
        ...state,
        selectedChainIds: action.chainIds,
      };

    case Types.CLEAR_SELECTED_CHAINS:
      return {
        ...state,
        selectedChainIds: [],
      };

    case Types.SET_BULK_EDIT_MODE:
      return {
        ...state,
        isBulkEditMode: action.isBulkEditMode,
      };

    case Types.OPEN_BULK_EDIT_DRAWER:
      return {
        ...state,
        isDrawerOpen: true,
      };

    case Types.BULK_EDIT_CHAINS_REQUEST:
      return {
        ...state,
        isBulkEditing: true,
        error: null,
      };

    case Types.BULK_EDIT_CHAINS_SUCCESS:
      return {
        ...state,
        isBulkEditing: false,
        error: null,
      };

    case Types.BULK_EDIT_CHAINS_FAILURE:
      return {
        ...state,
        isBulkEditing: false,
        error: action.error,
      };

    case Types.GET_CATEGORY_OPTIONS_SUCCESS:
      return {
        ...state,
        categoryOptions: {
          ...state.categoryOptions,
          [FORM_FIELDS.CATEGORY_LEVEL_3]: action.options,
        },
      };

    case Types.GET_L4_CATEGORY_OPTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case Types.GET_L4_CATEGORY_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryOptions: {
          ...state.categoryOptions,
          [FORM_FIELDS.CATEGORY_LEVEL_4]: action.options,
        },
      };

    case Types.DESTROY_PAGE:
      return INITIAL_STATE;

    case Types.GET_CHAIN_NODES_SUCCESS:
      return {
        ...state,
        chainNodeOptions: {
          ...state.chainNodeOptions,
          [action.edgeType.toLowerCase()]: action.data,
        },
      };

    case Types.GET_CHAIN_NODES_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case Types.CLOSE_EDIT_DRAWER:
      return {
        ...state,
        isDrawerOpen: false,
        isBulkEditMode: false,
        selectedChainIds: [],
      };

    case Types.UPDATE_CHAIN_ACTIVE_REQUEST:
      return {
        ...state,
        updatingChains: {
          ...state.updatingChains,
          [action.uniqueId]: true,
        },
      };

    case Types.UPDATE_CHAIN_ACTIVE_SUCCESS:
      return {
        ...state,
        chains: action.chains,
        updatingChains: {
          ...state.updatingChains,
          [action.uniqueId]: false,
        },
      };

    case Types.UPDATE_CHAIN_ACTIVE_FAILURE:
      return {
        ...state,
        error: action.error,
        updatingChains: {
          ...state.updatingChains,
          [action.uniqueId]: false,
        },
      };

    case Types.GET_DOMAIN_TYPES_SUCCESS:
      return {
        ...state,
        domainTypes: action.data,
      };

    case Types.GET_DOMAIN_TYPES_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case Types.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isSearchingProducts: true,
      };

    case Types.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productSearchOptions: action.data,
        isSearchingProducts: false,
      };

    case Types.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isSearchingProducts: false,
      };

    case Types.SET_PRODUCT_SEARCH_LOADING:
      return {
        ...state,
        isSearchingProducts: action.isLoading,
      };

    default:
      return state;
  }
}
