import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCitiesRequest: { countryId: null },
  getCitiesSuccess: { data: [] },
  getCitiesFailure: { error: null },
  getWarehousesRequest: { countryId: null, cityId: null },
  getWarehousesSuccess: { data: [] },
  getWarehousesFailure: { error: null },
  getBrandsRequest: { limit: null, offset: null },
  getBrandsSuccess: { data: [] },
  getBrandsFailure: { error: null },
  getSuppliersRequest: { limit: null, offset: null },
  getSuppliersSuccess: { data: [] },
  getSuppliersFailure: { error: null },
  getMarketProductCategoriesRequest: { limit: null, offset: null, isSubCategory: null },
  getMarketProductCategoriesSuccess: { data: [] },
  getMarketProductCategoriesFailure: { error: null },
  getMarketProductsRequest: { isActive: null, limit: null, offset: null },
  getMarketProductsSuccess: { data: [] },
  getMarketProductsFailure: { error: null },
}, { prefix: `${REDUX_KEY.COMMON}_` });
