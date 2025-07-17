import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.RULE.DETAIL}_`;

export const { Types, Creators } = createActions({
  getDtsRuleDetailRequest: { id: undefined },
  getDtsRuleDetailSuccess: { data: {} },
  getDtsRuleDetailFailure: { error: null },
  updateDtsRuleDetailRequest: { data: undefined },
  updateDtsRuleDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
