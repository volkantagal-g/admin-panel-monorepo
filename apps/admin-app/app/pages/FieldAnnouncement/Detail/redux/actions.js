import { createActions } from 'reduxsauce';

import { reducerKey } from './key';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getAnnouncementDetailRequest: { requestBody: {} },
  getAnnouncementDetailSuccess: { data: {} },
  getAnnouncementDetailFailure: { error: null },
  updateWarehouseAnnouncementDetailRequest: { requestBody: {} },
  updateWarehouseAnnouncementDetailSuccess: { data: {} },
  updateWarehouseAnnouncementDetailFailure: { error: null },
}, { prefix: `${reducerKey}_` });
