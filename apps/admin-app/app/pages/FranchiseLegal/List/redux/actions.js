import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_LEGAL.LIST}_`;

export const { Types, Creators } = createActions({
  getFranchiseLegalListRequest: { limit: undefined, offset: undefined },
  getFranchiseLegalListSuccess: { data: null, total: 0 },
  getFranchiseLegalListFailure: { error: null },
  changeFranchiseLegalStatusRequest: { status: undefined, id: undefined },
  changeFranchiseLegalStatusSuccess: {},
  changeFranchiseLegalStatusFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
