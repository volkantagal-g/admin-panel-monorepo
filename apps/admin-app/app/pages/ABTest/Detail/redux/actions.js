import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.AB_TEST_PAGE.DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    getTestRequest: { testId: null },
    getTestSuccess: { data: null },
    getTestFailure: { error: null },
    getClientListTemplatesRequest: { requestData: {} },
    getClientListTemplatesSuccess: { data: null },
    getClientListTemplatesFailure: { error: null },
    updateABTestRequest: { requestData: {} },
    updateABTestSuccess: { data: null },
    updateABTestFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
