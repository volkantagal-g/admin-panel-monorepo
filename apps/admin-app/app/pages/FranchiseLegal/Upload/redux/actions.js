import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  uploadFranchiseLegalRequest: {
    data: undefined,
    contentType: undefined,
    fileName: undefined,
  },
  uploadFranchiseLegalSuccess: null,
  uploadFranchiseLegalFailure: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_LEGAL.NEW}_` });
