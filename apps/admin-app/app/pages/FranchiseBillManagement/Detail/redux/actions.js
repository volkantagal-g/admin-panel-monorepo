import { createActions } from 'reduxsauce';

import { reducerKey } from './key';

export const { Types, Creators } = createActions({
  getFranchiseBillDetailRequest: { billId: undefined },
  getFranchiseBillDetailSuccess: { data: null },
  getFranchiseBillDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reducerKey}_` });
