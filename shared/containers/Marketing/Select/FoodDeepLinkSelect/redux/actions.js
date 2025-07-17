import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getFoodDeepLinksRequest: { keyword: '' },
    getFoodDeepLinksSuccess: { data: [] },
    getFoodDeepLinksFailure: { error: null },

    getFoodDeepLinkDetailRequest: { id: null },
    getFoodDeepLinkDetailSuccess: { data: [] },
    getFoodDeepLinkDetailFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.FOOD_DEEP_LINK}_` },
);
