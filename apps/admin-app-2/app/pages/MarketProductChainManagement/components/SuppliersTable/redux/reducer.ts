import { Supplier, SupplierFilters, FilterOption, PaginationParams, SortParams } from '../types';
import * as types from './types';

export interface SuppliersState {
  data: Supplier[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  filters: SupplierFilters;
  pagination: PaginationParams;
  sort?: SortParams;
  cities: FilterOption[];
  citiesLoading: boolean;
  regions: FilterOption[];
  regionsLoading: boolean;
  domainTypes: FilterOption[];
  domainTypesLoading: boolean;
}

const initialState: SuppliersState = {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  filters: {
    search: '',
    type: undefined,
    preferred: undefined,
  },
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: undefined,
  cities: [],
  citiesLoading: false,
  regions: [],
  regionsLoading: false,
  domainTypes: [],
  domainTypesLoading: false,
};

type Action = {
  type: string;
  payload?: any;
};

const reducer = (state = initialState, action: Action): SuppliersState => {
  switch (action.type) {
    case types.FETCH_SUPPLIERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_SUPPLIERS_SUCCESS: {
      const { items, totalCount } = action.payload;
      return {
        ...state,
        loading: false,
        data: items || [],
        totalCount: totalCount || 0,
      };
    }

    case types.FETCH_SUPPLIERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.FETCH_CITIES_REQUEST:
      return {
        ...state,
        citiesLoading: true,
      };

    case types.FETCH_CITIES_SUCCESS:
      return {
        ...state,
        citiesLoading: false,
        cities: action.payload.cities || [],
      };

    case types.FETCH_CITIES_FAILURE:
      return {
        ...state,
        citiesLoading: false,
      };

    case types.FETCH_REGIONS_REQUEST:
      return {
        ...state,
        regionsLoading: true,
      };

    case types.FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        regionsLoading: false,
        regions: action.payload.regions || [],
      };

    case types.FETCH_REGIONS_FAILURE:
      return {
        ...state,
        regionsLoading: false,
      };

    case types.FETCH_DOMAIN_TYPES_REQUEST:
      return {
        ...state,
        domainTypesLoading: true,
      };

    case types.FETCH_DOMAIN_TYPES_SUCCESS:
      return {
        ...state,
        domainTypesLoading: false,
        domainTypes: action.payload.domainTypes || [],
      };

    case types.FETCH_DOMAIN_TYPES_FAILURE:
      return {
        ...state,
        domainTypesLoading: false,
      };

    case types.UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case types.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };

    case types.UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
