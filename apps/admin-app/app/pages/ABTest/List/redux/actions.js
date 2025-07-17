import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.AB_TEST_PAGE.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getABTestsRequest: { requestData: {} },
    getABTestsSuccess: { data: null },
    getABTestsFailure: { error: null },
    setFilters: { requestData: {} },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
