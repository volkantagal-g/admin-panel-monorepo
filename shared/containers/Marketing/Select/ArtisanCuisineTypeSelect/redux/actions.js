import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getArtisanCuisineTypesRequest: {},
    getArtisanCuisineTypesSuccess: { data: [] },
    getArtisanCuisineTypesFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.ARTISAN_CUISINE_TYPE}_` },
);
