import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getRatingTagsRequest: { domainType: null },
    getRatingTagsSuccess: { data: null },
    getRatingTagsFailure: { error: null },
    createRatingTagRequest: { body: null },
    createRatingTagSuccess: { data: null },
    createRatingTagFailure: { error: null },
    updateRatingTagRequest: { body: null },
    updateRatingTagSuccess: { data: null },
    updateRatingTagFailure: { error: null },
    updateRatingPlaceholderRequest: { body: null },
    updateRatingPlaceholderSuccess: { data: {} },
    updateRatingPlaceholderFailure: { error: null },
    createRatingPlaceholderRequest: { body: null },
    createRatingPlaceholderSuccess: { data: {} },
    createRatingPlaceholderFailure: { error: null },
    deleteRatingTagRequest: { id: null },
    deleteRatingTagSuccess: { id: null },
    deleteRatingTagFailure: { error: null },
    multiUpdateRatingTagsRequest: { tags: null, rating: null },
    multiUpdateRatingTagsSuccess: { data: {} },
    multiUpdateRatingTagsFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_MARKET_ORDER_RATINGS.RATING_TAGS}_` },
);
