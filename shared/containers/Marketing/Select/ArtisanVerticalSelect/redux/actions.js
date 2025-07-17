import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getArtisanVerticalsRequest: {},
    getArtisanVerticalsSuccess: { data: [] },
    getArtisanVerticalsFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.ARTISAN_VERTICAL}_` },
);
