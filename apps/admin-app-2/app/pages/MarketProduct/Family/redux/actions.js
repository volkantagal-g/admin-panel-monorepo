import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    openNewFamilyModal: null,
    closeNewFamilyModal: null,
    createMarketProductFamilyRequest: { body: null },
    createMarketProductFamilySuccess: { data: [] },
    createMarketProductFamilyFailure: { error: null },
    getMarketProductFamilyListRequest: {
      name: undefined,
      limit: 100,
      sortOrder: 'DESC',
      sort: 'createdAt',
      page: 1,
    },
    getMarketProductFamilyListSuccess: { data: [] },
    getMarketProductFamilyListFailure: { error: null },
    getMarketProductFamilyDetailRequest: { id: undefined },
    getMarketProductFamilyDetailSuccess: { data: {} },
    getMarketProductFamilyDetailFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.MARKET_PRODUCT.FAMILY}_` },
);
