import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  uploadFranchiseEarningsRequest: {
    data: undefined,
    contentType: undefined,
    fileName: undefined,
    earningType: undefined,
  },
  uploadFranchiseEarningsSuccess: null,
  uploadFranchiseEarningsFailure: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_EARNINGS.UPLOAD}_` });
