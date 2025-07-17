import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getCourierListRequest: {
      filters: {
        name: undefined,
        isActivated: undefined,
        status: undefined,
        isLoggedIn: undefined,
      },
      pagination: { currentPage: 1, rowsPerPage: 10 },
    },
    getCourierListSuccess: { data: [], totalCount: 0 },
    getCourierListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
