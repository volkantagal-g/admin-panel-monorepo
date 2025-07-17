import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.AB_TEST_V2_PAGE.DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    getTestRequest: { testId: null },
    getTestSuccess: { data: null },
    getTestFailure: { error: null },

    getTestStatusRequest: { testId: null },
    getTestStatusSuccess: { testStatus: null },
    getTestStatusFailure: { error: null },

    getClientListTemplatesRequest: { requestData: {} },
    getClientListTemplatesSuccess: { data: null },
    getClientListTemplatesFailure: { error: null },

    updateABTestRequest: { requestData: {} },
    updateABTestSuccess: { data: null },
    updateABTestFailure: { error: null },

    startABTestRequest: { testId: null },
    startABTestSuccess: { data: null },
    startABTestFailure: { error: null },

    stopABTestRequest: { testId: null },
    stopABTestSuccess: { data: null },
    stopABTestFailure: { error: null },

    completeABTestRequest: { requestData: {} },
    completeABTestSuccess: { data: null },
    completeABTestFailure: { error: null },

    setExcludeDates: { excludeDates: [] },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
