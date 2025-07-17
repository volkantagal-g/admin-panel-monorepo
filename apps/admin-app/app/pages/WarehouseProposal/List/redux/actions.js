import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getWarehouseProposalsRequest: { filters: {} },
  getWarehouseProposalsSuccess: { warehouseProposals: [], totalCount: 0 },
  getWarehouseProposalsFailure: { error: null },
  getWarehouseProposalsReportRequest: {},
  getWarehouseProposalsReportSuccess: {},
  getWarehouseProposalsReportFailure: { error: null },
  getCitiesRequest: {},
  getCitiesSuccess: { data: [] },
  getCitiesFailure: { error: null },
  getDistrictsRequest: { city: null },
  getDistrictsSuccess: { data: [] },
  getDistrictsFailure: { error: null },
  setFilters: { filters: {} },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.WAREHOUSE_PROPOSAL.LIST}_` });
