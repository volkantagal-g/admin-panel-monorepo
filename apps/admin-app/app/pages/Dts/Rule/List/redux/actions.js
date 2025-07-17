import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.RULE.LIST}_`;

export const { Types, Creators } = createActions({
  getDtsRuleListRequest: { limit: undefined, offset: undefined },
  getDtsRuleListSuccess: { data: null, total: 0 },
  getDtsRuleListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
