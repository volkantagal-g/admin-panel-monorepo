import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getLocalsChainsRequest: { body: null },
  getLocalsChainsSuccess: { data: {} },
  getLocalsChainsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.LOCALS_CHAIN}_` });
