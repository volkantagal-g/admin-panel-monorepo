import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getBadgeRequest: { id: null },
  getBadgeSuccess: { data: {} },
  getBadgeFailure: { error: null },
  updateBadgeRequest: { id: null, body: null },
  updateBadgeSuccess: {},
  updateBadgeFailure: { error: null },
  updateBadgeImageUrlRequest: {
    id: null,
    loadedImage: null,
    extension: null,
    body: null,
    imagePath: null,
    isAppliedToOtherLanguanges: false,
  },
  updateBadgeImageUrlSuccess: {},
  updateBadgeImageUrlFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.BADGE.DETAIL}_` });
