import type { Action, ProductsState } from './types';
import * as types from './types';

export const initialState: ProductsState = {
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
  demographies: [],
  demographiesLoading: false,
};

const reducer = (state = initialState, action: Action): ProductsState => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_PRODUCTS_SUCCESS: {
      const { items, totalCount } = action.payload;
      return {
        ...state,
        loading: false,
        data: items || [],
        totalCount: totalCount || 0,
      };
    }

    case types.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
        domainTypes: action.payload || [],
      };

    case types.FETCH_DOMAIN_TYPES_FAILURE:
      return {
        ...state,
        domainTypesLoading: false,
      };

    case types.FETCH_DEMOGRAPHICS_REQUEST:
      return {
        ...state,
        demographiesLoading: true,
      };

    case types.FETCH_DEMOGRAPHICS_SUCCESS:
      return {
        ...state,
        demographiesLoading: false,
        demographies: action.payload || [],
      };

    case types.FETCH_DEMOGRAPHICS_FAILURE:
      return {
        ...state,
        demographiesLoading: false,
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
