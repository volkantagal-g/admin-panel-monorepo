import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    uploadClientListRequest: { data: null },
    uploadClientListSuccess: null,
    uploadClientListFailure: { error: null },

    setCsvFileName: { csvFileName: '' },
    setCsvData: { csvData: null },
    setClientListName: { clientListName: '' },
    togglePermission: { permissionKey: '' },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.CLIENT_LIST_DOUBLE_CHECKER}_` },
);
