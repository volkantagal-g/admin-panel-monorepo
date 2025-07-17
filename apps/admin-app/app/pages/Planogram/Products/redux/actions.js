import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  importPlanogramProductsRequest: { loadedFile: null },
  exportPlanogramProductRequest: {},
  getPlanogramProductListRequest: { body: null },
  getPlanogramProductListSuccess: { data: [] },
  getPlanogramProductListFailure: { error: null },
  getSizesRequest: {},
  getSizesSuccess: { data: {} },
  getSizesFailure: { error: null },
  getDemographiesRequest: {},
  getDemographiesSuccess: { data: {} },
  getDemographiesFailure: { error: null },
  getWarehouseTypesRequest: {},
  getWarehouseTypesSuccess: { data: {} },
  getWarehouseTypesFailure: { error: null },
  getMainWarehousesAndCitiesRequest: {},
  getMainWarehousesAndCitiesSuccess: { data: {} },
  getMainWarehousesAndCitiesFailure: { error: null },
  getPlanogramProductDetailsRequest: { id: null },
  getPlanogramProductDetailsSuccess: { data: {} },
  getPlanogramProductDetailsFailure: { error: null },
  filterPlanogramWarehouseRequest: { body: null },
  filterPlanogramWarehouseSuccess: { data: {} },
  filterPlanogramWarehouseFailure: { error: null },
  updatePlanogramProductRequest: { productId: null, body: {} },
  updatePlanogramProductSuccess: { data: [] },
  updatePlanogramProductFailure: { error: null },
}, { prefix: `${REDUX_KEY.PLANOGRAM.PRODUCTS}_` });
