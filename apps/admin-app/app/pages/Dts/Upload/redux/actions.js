import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  uploadDTSLogsRequest: {
    data: undefined,
    contentType: undefined,
    fileName: undefined,
  },
  uploadDTSLogsSuccess: null,
  uploadDTSLogsFailure: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS.UPLOAD}_` });
