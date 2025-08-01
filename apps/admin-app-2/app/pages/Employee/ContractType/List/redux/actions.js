import { createActions } from 'reduxsauce';

import prefix from './key';

export const { Types, Creators } = createActions({
  getContractRequest: { },
  getContractSuccess: { data: null },
  getContractFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
