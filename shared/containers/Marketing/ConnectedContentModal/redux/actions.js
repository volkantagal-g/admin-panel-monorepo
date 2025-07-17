import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    createConnectedContentRequest: { formBody: {} },
    createConnectedContentSuccess: { content: '' },
    createConnectedContentFailure: { error: null },

    resetConnectedContent: {},

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.CONNECTED_CONTENT_MODAL}_` },
);
