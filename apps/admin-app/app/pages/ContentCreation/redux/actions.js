import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getContentCreationTransactionIdRequest: { filters: {} },
  getContentCreationTransactionIdSuccess: { data: {} },
  getContentCreationTransactionIdFailure: { error: null },
  getContentCreationTransactionDetailsRequest: { transactionId: undefined },
  getContentCreationTransactionDetailsSuccess: { data: {} },
  getContentCreationTransactionDetailsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.CONTENT_CREATION}_` });
