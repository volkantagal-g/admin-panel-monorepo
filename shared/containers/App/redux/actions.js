import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getPageOwnersRequest: { pageId: null },
    getPageOwnersSuccess: { data: null },
    getPageOwnersFailure: { error: null },

    initAppLayout: null,
    destroyAppLayout: null,
  },
  { prefix: `${REDUX_KEY.APP_LAYOUT}_` },
);
