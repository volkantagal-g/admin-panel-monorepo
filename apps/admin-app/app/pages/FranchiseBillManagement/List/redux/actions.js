import { createActions } from 'reduxsauce';

import { reducerKey } from './key';

export const { Types, Creators } = createActions({
  getFranchiseBillManagementListRequest: {
    franchiseId: undefined,
    warehouseIds: undefined,
    domainTypes: undefined,
    lastReadDateRange: {
      startDate: undefined,
      endDate: undefined,
    },
    limit: undefined,
    offset: undefined,
  },
  getFranchiseBillManagementListSuccess: { data: null, total: 0 },
  getFranchiseBillManagementListFailure: { error: null },
  exportFranchiseBillListRequest: {
    lang: undefined,
    domainTypes: undefined,
    franchiseId: undefined,
    warehouseIds: undefined,
    lastReadDateRange: {
      startDate: undefined,
      endDate: undefined,
    },
  },
  exportFranchiseBillListSuccess: null,
  exportFranchiseBillListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reducerKey}_` });
