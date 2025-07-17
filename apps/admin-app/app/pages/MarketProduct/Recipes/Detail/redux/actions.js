import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getRecipeByIdRequest: { recipeId: null },
  getRecipeByIdSuccess: { data: {} },
  getRecipeByIdFailure: { error: null },
  createMarketProductRequest: { body: null },
  createMarketProductSuccess: { data: [] },
  createMarketProductFailure: { error: null },
  updateRecipeRequest: { id: null, body: null },
  updateRecipeSuccess: { data: {} },
  updateRecipeFailure: { error: null },
  getMarketProductsRequest: { filters: {} },
  getMarketProductsSuccess: { data: [] },
  getMarketProductsFailure: { error: null },
  getTableMarketProductsRequest: { filters: {} },
  getTableMarketProductsSuccess: { data: [] },
  getTableMarketProductsFailure: { error: null },
  getModalMarketProductsRequest: { filters: {} },
  getModalMarketProductsSuccess: { data: [] },
  getModalMarketProductsFailure: { error: null },
  getSegmentsRequest: { filters: {} },
  getSegmentsSuccess: { data: [] },
  getSegmentsFailure: { error: null },
  createRecipeImageUrlRequest: {
    key: null,
    loadedImage: null,
    extension: null,
  },
  createRecipeImageUrlSuccess: { data: {} },
  createRecipeImageUrlFailure: { key: null, error: null },
  clearMarketProducts: null,
  openSubstituteProductsModal: null,
  closeSubstituteProductsModal: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.RECIPES.DETAIL}_` });
