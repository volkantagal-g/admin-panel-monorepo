import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.CLIENT_APP_ACTION}_` },
);
