import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    codeBulkEditRequest: { body: null },
    codeBulkEditSuccess: { data: {} },
    codeBulkEditFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.CODE_BULK}_` },
);
