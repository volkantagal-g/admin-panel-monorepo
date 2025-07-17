import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getRunnersRequest: { size: 10, page: 1, searchQuery: '', companyId: '', shoppingMallId: '' },
    getRunnersSuccess: { data: [] },
    getRunnersFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GL_RUNNER_LIST}_` },
);
