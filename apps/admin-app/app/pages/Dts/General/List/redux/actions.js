import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.GENERAL.LIST}_`;

export const { Types, Creators } = createActions({
  getDtsListRequest: { filters: undefined, limit: undefined, offset: undefined },
  getDtsListSuccess: { data: null, total: 0 },
  getDtsListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
