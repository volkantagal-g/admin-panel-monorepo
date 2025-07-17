import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getInAppRedirectionRequest: { body: null },
    getInAppRedirectionSuccess: { data: {} },
    getInAppRedirectionFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.IN_APP_REDIRECTION}_` },
);
