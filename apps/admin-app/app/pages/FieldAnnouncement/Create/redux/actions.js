import { createActions } from 'reduxsauce';

import { reducerKey } from './key';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  createWarehouseAnnouncementRequest: { requestBody: {} },
  createWarehouseAnnouncementSuccess: { data: {} },
  createWarehouseAnnouncementFailure: { error: null },
  createFranchiseAnnouncementRequest: { requestBody: {} },
  createFranchiseAnnouncementSuccess: { data: {} },
  createFranchiseAnnouncementFailure: { error: null },
}, { prefix: `${reducerKey}_` });
