import {
  FETCH_DARK_STORES_REQUEST,
  FETCH_DARK_STORES_SUCCESS,
  FETCH_DARK_STORES_FAILURE,
  FETCH_LOOKUPS_REQUEST,
  FETCH_LOOKUPS_SUCCESS,
  FETCH_LOOKUPS_FAILURE,
} from './constants';
import type { Action } from './types';

export interface State {
  darkStores: any[];
  totalCount: number;
  loading: boolean;
  error: Error | null;
  filters: {
    search?: string;
    domain?: string | number;
    warehouseType?: string | number;
    city?: string | number;
    region?: string | number;
    demography?: string | number;
    size?: string | number;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {
    field: string;
    order: 'ascend' | 'descend' | null;
  };
  lookups: {
    cities: any[];
    regions: any[];
    domains: any[];
    demographies: any[];
    sizes: any[];
    warehouseTypes: any[];
  };
  lookupsLoading: boolean;
  lookupsError: Error | null;
}

export const initialState: State = {
  darkStores: [],
  totalCount: 0,
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: {
    field: 'name',
    order: 'ascend',
  },
  lookups: {
    cities: [],
    regions: [],
    domains: [],
    demographies: [],
    sizes: [],
    warehouseTypes: [],
  },
  lookupsLoading: false,
  lookupsError: null,
};

const darkStoreTableReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_DARK_STORES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        filters: action.payload?.filters ? { ...action.payload.filters } : state.filters,
        pagination: action.payload?.pagination ? { ...action.payload.pagination } : state.pagination,
        sort: action.payload?.sort ? { ...action.payload.sort } : state.sort,
      };

    case FETCH_DARK_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        darkStores: action.payload.darkStores,
        totalCount: action.payload.totalCount,
        filters: { ...action.payload.filters },
        pagination: { ...action.payload.pagination },
        sort: { ...action.payload.sort },
      };

    case FETCH_DARK_STORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_LOOKUPS_REQUEST:
      return {
        ...state,
        lookupsLoading: true,
        lookupsError: null,
      };

    case FETCH_LOOKUPS_SUCCESS:
      return {
        ...state,
        lookupsLoading: false,
        lookups: {
          cities: action.payload.cities,
          regions: action.payload.regions,
          domains: action.payload.domains,
          demographies: action.payload.demographies,
          sizes: action.payload.sizes,
          warehouseTypes: action.payload.warehouseTypes,
        },
      };

    case FETCH_LOOKUPS_FAILURE:
      return {
        ...state,
        lookupsLoading: false,
        lookupsError: action.payload,
      };

    default:
      return state;
  }
};

export default darkStoreTableReducer;
