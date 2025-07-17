import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductCategoryByIdRequest: { id: null },
  getMarketProductCategoryByIdSuccess: { data: {} },
  getMarketProductCategoryByIdFailure: { error: null },
  updateMarketProductCategoryRequest: { id: null, body: null },
  updateMarketProductCategorySuccess: { data: {} },
  updateMarketProductCategoryFailure: { error: null },
  updateMarketProductCategoryAdditionalInfoRequest: { id: null, body: null },
  updateMarketProductCategoryAdditionalInfoSuccess: { data: {} },
  updateMarketProductCategoryAdditionalInfoFailure: { error: null },
  updateMarketProductCategoryImageUrlRequest: {
    id: null,
    loadedImage: null,
    extension: null,
    body: null,
    imagePath: null,
    isAppliedToOtherLanguages: null,
  },
  updateMarketProductCategoryImageUrlSuccess: { data: {} },
  updateMarketProductCategoryImageUrlFailure: { error: null },
  activateMarketProductCategoryRequest: { id: null },
  activateMarketProductCategorySuccess: { data: {} },
  activateMarketProductCategoryFailure: { error: null },
  deactivateMarketProductCategoryRequest: { id: null },
  deactivateMarketProductCategorySuccess: { data: {} },
  deactivateMarketProductCategoryFailure: { error: null },
  getMarketProductCategorySlugsRequest: { id: null },
  getMarketProductCategorySlugsSuccess: { data: {} },
  getMarketProductCategorySlugsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.DETAIL}_` });
