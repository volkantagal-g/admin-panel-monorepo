import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createTransferGroupRequest: { name: null },
  createTransferGroupSuccess: { data: [] },
  createTransferGroupFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TRANSFER_GROUP.NEW}_` });
