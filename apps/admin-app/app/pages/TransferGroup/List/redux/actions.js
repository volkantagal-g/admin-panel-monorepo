import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getTransferGroupsRequest: { limit: 10, offset: 0 },
  getTransferGroupsSuccess: { data: [] },
  getTransferGroupsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TRANSFER_GROUP.LIST}_` });
