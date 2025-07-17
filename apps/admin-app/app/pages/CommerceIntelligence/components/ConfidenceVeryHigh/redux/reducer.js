import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  level3Categories: [],
  level4Categories: [],
  filters: {
    search: '',
    category: [],
    subCategory: [],
    competitor: [],
    level3: [],
    level4: [],
  },
  loading: {
    level3: false,
    level4: false,
  },
  error: null,
};

const fetchLevel3CategoriesRequest = state => ({
  ...state,
  loading: { ...state.loading, level3: true },
});

const fetchLevel3CategoriesSuccess = (state, { data }) => ({
  ...state,
  level3Categories: data,
  loading: { ...state.loading, level3: false },
});

const fetchLevel3CategoriesFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, level3: false },
  error,
});

const fetchLevel4CategoriesRequest = state => ({
  ...state,
  loading: { ...state.loading, level4: true },
});

const fetchLevel4CategoriesSuccess = (state, { data }) => ({
  ...state,
  level4Categories: data,
  loading: { ...state.loading, level4: false },
});

const fetchLevel4CategoriesFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, level4: false },
  error,
});

const updateFilters = (state, { filters }) => ({
  ...state,
  filters: { ...state.filters, ...filters },
});

const resetState = () => INITIAL_STATE;

const HANDLERS = {
  [Types.FETCH_LEVEL3_CATEGORIES_REQUEST]: fetchLevel3CategoriesRequest,
  [Types.FETCH_LEVEL3_CATEGORIES_SUCCESS]: fetchLevel3CategoriesSuccess,
  [Types.FETCH_LEVEL3_CATEGORIES_FAILURE]: fetchLevel3CategoriesFailure,

  [Types.FETCH_LEVEL4_CATEGORIES_REQUEST]: fetchLevel4CategoriesRequest,
  [Types.FETCH_LEVEL4_CATEGORIES_SUCCESS]: fetchLevel4CategoriesSuccess,
  [Types.FETCH_LEVEL4_CATEGORIES_FAILURE]: fetchLevel4CategoriesFailure,

  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.RESET_STATE]: resetState,
};

const reducer = createReducer(INITIAL_STATE, HANDLERS);

export { reducer };
