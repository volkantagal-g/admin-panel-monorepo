import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  exportPlanogramWarehouseRequest: {},
  importPlanogramWarehousesRequest: { loadedFile: null },
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
  listPlanogramWarehousesRequest: { body: {} },
  listPlanogramWarehousesSuccess: { data: {} },
  listPlanogramWarehousesFailure: { error: null },
  listPlanogramWarehousesInitialRequest: {},
  listPlanogramWarehousesInitialSuccess: { data: {} },
  listPlanogramWarehousesInitialFailure: { error: null },
  getPlanogramWarehouseDetailsRequest: { body: {} },
  getPlanogramWarehouseDetailsSuccess: { data: {} },
  getPlanogramWarehouseDetailsFailure: { error: null },
  updatePlanogramWarehouseRequest: { warehouseId: null, body: null },
  updatePlanogramWarehouseSuccess: { data: {} },
  updatePlanogramWarehouseFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PLANOGRAM.WAREHOUSES}_` });
