import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getLocalsChainsRequest: {},
    getLocalsChainsSuccess: { data: [] },
    getLocalsChainsFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.LOCALS_CHAIN}_` },
);
