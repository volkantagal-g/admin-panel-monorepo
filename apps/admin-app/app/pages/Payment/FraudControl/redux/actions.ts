import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PAYMENT_FRAUD_CONTROL_LIST}_`;

export const { Types, Creators } = createActions(
  {
    getAllRulesRequest: { enable: null },
    getAllRulesSuccess: { data: null },
    getAllRulesFailure: { error: null },

    getRuleDetailRequest: { id: null },
    getRuleDetailSuccess: { data: null },
    getRuleDetailFailure: { error: null },

    createRuleRequest: {
      name: null,
      eventKeyField: null,
      eventType: null,
      ruleOperator: null,
      ruleValue: null,
      ruleValueType: null,
      score: null,
      enable: null,
      force3dEvent: null,
      blockEvent: null,
      whiteEvent: null,
      useRequestEventKeyFieldValue: null,
    },
    createRuleSuccess: { data: null },
    createRuleFailure: { error: null },

    updateRuleRequest: {
      id: null,
      name: null,
      eventKeyField: null,
      eventType: null,
      ruleOperator: null,
      ruleValue: null,
      ruleValueType: null,
      score: null,
      enable: null,
      force3dEvent: null,
      blockEvent: null,
      whiteEvent: null,
      useRequestEventKeyFieldValue: null,
    },
    updateRuleSuccess: { data: null },
    updateRuleFailure: { error: null },

    setRuleModalData: { isModalOpen: null, ruleId: null, name: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
