import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getChainsShopsRequest: { chainId: null, onSuccess: null },
    getChainsShopsSuccess: { data: [] },
    getChainsShopsFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.OPTIONAL_CONTROL.LOCALS_STORE_CONTROL}_` },
);
