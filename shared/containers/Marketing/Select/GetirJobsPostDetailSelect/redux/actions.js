import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getPostDetailRequest: { id: null, onGetDetailSuccess: null, onGetDetailFail: null },
    getPostDetailSuccess: { data: {} },
    getPostDetailFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.POST_DETAIL}_` },
);
