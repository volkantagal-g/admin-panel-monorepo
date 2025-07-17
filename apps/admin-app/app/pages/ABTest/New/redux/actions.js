import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.AB_TEST_PAGE.NEW}_`;

export const { Types, Creators } = createActions(
  {
    createABTestRequest: { requestData: {} },
    createABTestSuccess: { data: null },
    createABTestFailure: { error: null },
    importVariationsCSVFileRequest: { fileData: null, variationIndex: null, variationDescription: null, totalCount: null, callback: () => {} },
    importVariationsCSVFileSuccess: { },
    importVariationsCSVFileFailure: { error: null },
    getClientListTemplatesRequest: { name: null },
    getClientListTemplatesSuccess: { data: null },
    getClientListTemplatesFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
