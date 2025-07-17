import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.PAYMENT_FRAUD_CONTROL_LIST;

export const allRulesSelector = {
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.allRules.isPending,
  getData: (state: { [reduxKey: string]: State }) => state[reduxKey]?.allRules.data,
};

export const ruleDetailSelector = {
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.ruleDetail.isPending,
  getData: (state: { [reduxKey: string]: State }) => state[reduxKey]?.ruleDetail.data,
};

export const ruleModalDataSelector = { getData: (state: { [reduxKey: string]: State }) => state[reduxKey]?.ruleModalData };

export const createRuleSelector = {
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.createRule.isPending,
  getError: (state: { [reduxKey: string]: State }) => state[reduxKey]?.createRule.error,
};

export const updateRuleSelector = {
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.updateRule.isPending,
  getError: (state: { [reduxKey: string]: State }) => state[reduxKey]?.updateRule.error,
};
