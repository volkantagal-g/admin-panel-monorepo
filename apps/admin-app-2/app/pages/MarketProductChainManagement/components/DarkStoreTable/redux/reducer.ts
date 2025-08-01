import { DARK_STORES_TABLE_ACTIONS } from './actions';
import type { DarkStoresState } from '../types';

const INITIAL_STATE: DarkStoresState = {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 10,
  },
  sort: {
    field: 'name',
    order: 'asc',
  },
  lookups: {
    cities: [],
    regions: [],
    domains: [],
    demographies: [],
    sizes: [],
    loading: false,
    error: null,
  },
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_SUCCESS:
      return {
        ...state,
        data: action.payload.darkstoreList || [],
        totalCount: action.payload.totalCount || 0,
        loading: false,
        error: null,
      };

    case DARK_STORES_TABLE_ACTIONS.FETCH_DARK_STORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_REQUEST:
      return {
        ...state,
        lookups: {
          ...state.lookups,
          loading: true,
          error: null,
        },
      };

    case DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_SUCCESS:
      return {
        ...state,
        lookups: {
          cities: action.payload.cities || [],
          regions: action.payload.regions || [],
          domains: action.payload.domains || [],
          demographies: action.payload.demographies || [],
          sizes: action.payload.sizes || [],
          loading: false,
          error: null,
        },
      };

    case DARK_STORES_TABLE_ACTIONS.FETCH_LOOKUPS_FAILURE:
      return {
        ...state,
        lookups: {
          ...state.lookups,
          loading: false,
          error: action.payload,
        },
      };

    case DARK_STORES_TABLE_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case DARK_STORES_TABLE_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };

    case DARK_STORES_TABLE_ACTIONS.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
