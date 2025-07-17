import type { SupplierState } from '../types';
import { ACTION_TYPES } from './constants';

const {
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILURE,
  FETCH_DOMAIN_TYPES_REQUEST,
  FETCH_DOMAIN_TYPES_SUCCESS,
  FETCH_DOMAIN_TYPES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  UPDATE_FILTERS,
  UPDATE_PAGINATION,
  UPDATE_SORT,
} = ACTION_TYPES;

const initialState: SupplierState = {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  filters: {
    search: '',
    domain: undefined,
    city: undefined,
  },
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: {
    field: 'name',
    order: undefined,
  },
  domains: [],
  cities: [],
  lookupsLoading: false,
};

export default function reducer(state = initialState, action: any): SupplierState {
  switch (action.type) {
    case FETCH_SUPPLIERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SUPPLIERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.items,
        totalCount: action.payload.totalCount,
        error: null,
      };

    case FETCH_SUPPLIERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_DOMAIN_TYPES_REQUEST:
      return {
        ...state,
        lookupsLoading: true,
        error: null,
      };

    case FETCH_DOMAIN_TYPES_SUCCESS:
      return {
        ...state,
        lookupsLoading: false,
        domains: action.payload,
        error: null,
      };

    case FETCH_DOMAIN_TYPES_FAILURE:
      return {
        ...state,
        lookupsLoading: false,
        error: action.payload,
      };

    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        lookupsLoading: true,
        error: null,
      };

    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        lookupsLoading: false,
        cities: action.payload,
        error: null,
      };

    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        lookupsLoading: false,
        error: action.payload,
      };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case UPDATE_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
}
