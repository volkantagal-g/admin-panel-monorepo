import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.AB_TEST_V2_PAGE.NEW}_`;

export const { Types, Creators } = createActions(
  {
    getTestTypeListRequest: null,
    getTestTypeListSuccess: { data: null },
    getTestTypeListFailure: { error: null },
    createABTestRequest: { requestData: {} },
    createABTestSuccess: { data: null },
    createABTestFailure: { error: null },
    getClientListTemplatesRequest: { name: null },
    getClientListTemplatesSuccess: { data: null },
    getClientListTemplatesFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
