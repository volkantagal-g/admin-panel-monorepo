import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.INIT}_`;

export const { Types, Creators } = createActions(
  {
    initAfterLogin: {},
    failAfterLoginInit: {},
    finishAfterLoginInit: {},
  },
  { prefix },
);
