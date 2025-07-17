import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getLocalsShopsRequest: { name: '' },
    getLocalsShopsSuccess: { data: [] },
    getLocalsShopsFailure: { error: null },

    getLocalsShopDetailByIdRequest: { id: '' },
    getLocalsShopDetailByIdSuccess: { data: [] },
    getLocalsShopDetailByIdFailure: { error: null },

    getLocalsShopDetailsByIdArrayRequest: { shopIds: [], onSuccess: null },
    getLocalsShopDetailsByIdArraySuccess: { data: [] },
    getLocalsShopDetailsByIdArrayFailure: { error: null },

    setLocalShopOptions: { options: [] },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.LOCAL_SHOP}_` },
);
