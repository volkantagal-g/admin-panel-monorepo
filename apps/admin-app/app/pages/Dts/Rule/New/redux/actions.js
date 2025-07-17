import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createDtsRuleRequest: {
    ruleNumber: undefined,
    title: undefined,
    category: undefined,
    priority: undefined,
    description: undefined,
    closeAs: undefined,
    closeMessage: undefined,
    isActive: undefined,
    defaultNote: undefined,
  },
  createDtsRuleSuccess: null,
  createDtsRuleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS.RULE.NEW}_` });
