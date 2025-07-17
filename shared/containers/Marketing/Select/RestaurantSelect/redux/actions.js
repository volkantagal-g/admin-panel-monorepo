import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getRestaurantsRequest: { searchString: '' },
    getRestaurantsSuccess: { data: [] },
    getRestaurantsFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.RESTAURANT}_` },
);
