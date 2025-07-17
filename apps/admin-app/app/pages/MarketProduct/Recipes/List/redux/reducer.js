import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_SELECTED_DOMAINS_OPTIONS = [];
export const INITIAL_SELECTED_STATUS_OPTION = null;

export const INITIAL_STATE = {
  recipes: {
    data: null,
    isPending: false,
    totalCount: null,
    error: null,
    currentPage: 1,
    currentPageSize: 10,
  },
  filters: {
    selectedDomains: INITIAL_SELECTED_DOMAINS_OPTIONS,
    selectedStatus: INITIAL_SELECTED_STATUS_OPTION,
  },
  isNewRecipeModalOpen: false,
  countryCode: null,
  createRecipe: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getRecipesRequest = state => {
  return {
    ...state,
    recipes: {
      ...INITIAL_STATE.recipes,
      isPending: true,
      totalCount: null,
      currentPage: state.recipes.currentPage,
      currentPageSize: state.recipes.currentPageSize,
    },
  };
};

export const getRecipesSuccess = (state, { data }) => {
  return {
    ...state,
    recipes: {
      ...INITIAL_STATE.recipes,
      data: data.recipes,
      isPending: false,
      totalCount: data.totalCount,
      currentPage: state.recipes.currentPage,
      currentPageSize: state.recipes.currentPageSize,
    },
  };
};

export const getRecipesFailure = (state, { error }) => {
  return {
    ...state,
    recipes: {
      ...INITIAL_STATE.recipes,
      isPending: false,
      totalCount: null,
      currentPage: state.recipes.currentPage,
      currentPageSize: state.recipes.currentPageSize,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const setSelectedDomains = (state, { selectedDomains }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedDomains,
    },
  };
};

export const setSelectedStatus = (state, { selectedStatus }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedStatus,
    },
  };
};

export const setQueryText = (state, { queryText }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      queryText,
    },
  };
};

export const createRecipeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createRecipe: {
      ...INITIAL_STATE.createRecipe,
      isPending: true,
    },
  };
};

export const createRecipeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createRecipe: {
      ...INITIAL_STATE.createRecipe,
      data,
      isPending: false,
    },
  };
};

export const createRecipeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createRecipe: {
      ...INITIAL_STATE.createRecipe,
      isPending: false,
      error,
    },
  };
};

export const openNewRecipeModal = state => ({
  ...state,
  isNewRecipeModalOpen: true,
});

export const closeNewRecipeModal = state => ({
  ...state,
  isNewRecipeModalOpen: false,
});

export const setCountryCode = (state, { countryCode }) => {
  return {
    ...state,
    countryCode,
  };
};

export const setCurrentPage = (state, { currentPage }) => {
  return {
    ...state,
    recipes: {
      ...state.recipes,
      currentPage,
    },
  };
};

export const setCurrentPageSize = (state, { currentPageSize }) => {
  return {
    ...state,
    recipes: {
      ...state.recipes,
      currentPageSize,
    },
  };
};

export const HANDLERS = {
  [Types.GET_RECIPES_REQUEST]: getRecipesRequest,
  [Types.GET_RECIPES_SUCCESS]: getRecipesSuccess,
  [Types.GET_RECIPES_FAILURE]: getRecipesFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_SELECTED_DOMAINS]: setSelectedDomains,
  [Types.SET_SELECTED_STATUS]: setSelectedStatus,
  [Types.SET_QUERY_TEXT]: setQueryText,
  [Types.OPEN_NEW_RECIPE_MODAL]: openNewRecipeModal,
  [Types.CLOSE_NEW_RECIPE_MODAL]: closeNewRecipeModal,
  [Types.CREATE_RECIPE_REQUEST]: createRecipeRequest,
  [Types.CREATE_RECIPE_SUCCESS]: createRecipeSuccess,
  [Types.CREATE_RECIPE_FAILURE]: createRecipeFailure,
  [Types.SET_COUNTRY_CODE]: setCountryCode,
  [Types.SET_CURRENT_PAGE]: setCurrentPage,
  [Types.SET_CURRENT_PAGE_SIZE]: setCurrentPageSize,
};

export default createReducer(INITIAL_STATE, HANDLERS);
