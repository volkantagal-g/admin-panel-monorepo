import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { RuleModalData } from '../components/FraudControl';

export type RuleType = {
  id: string;
  createdAt: string;
  name: string;
  eventKeyField: string;
  eventType: string;
  ruleOperator: string;
  ruleValue: number | string;
  ruleValueType: string;
  score: number;
  enable: boolean;
  force3dEvent: boolean;
  blockEvent: boolean;
  whiteEvent: boolean;
  useRequestEventKeyFieldValue: boolean;
};

export type State = {
  allRules: {
    isPending: boolean;
    data: RuleType[];
  };
  ruleDetail: {
    isPending: boolean;
    data: RuleType | null;
  };
  ruleModalData: RuleModalData;
  createRule: {
    isPending: boolean;
    data: RuleType | null;
    error: any;
  };
  updateRule: {
    isPending: boolean;
    data: RuleType | null;
    error: any;
  };
};

export const INITIAL_STATE: State = {
  allRules: {
    isPending: false,
    data: [],
  },
  ruleDetail: {
    isPending: false,
    data: null,
  },
  ruleModalData: {
    isModalOpen: false,
    ruleId: null,
    name: null,
  },
  createRule: {
    isPending: false,
    data: null,
    error: null,
  },
  updateRule: {
    isPending: false,
    data: null,
    error: null,
  },
};

const allRulesRequest = (state: State) => ({
  ...state,
  allRules: {
    ...state?.allRules,
    isPending: true,
    data: [],
  },
});
const allRulesSuccess = (state: State, { data }: any) => ({
  ...state,
  allRules: {
    ...state?.allRules,
    isPending: false,
    data,
  },
});
const allRulesFailure = (state: State) => ({
  ...state,
  allRules: {
    ...state?.allRules,
    isPending: false,
  },
});

const ruleDetailRequest = (state: State) => ({
  ...state,
  ruleDetail: {
    ...state?.ruleDetail,
    isPending: true,
    data: null,
  },
});
const ruleDetailSuccess = (state: State, { data }: any) => ({
  ...state,
  ruleDetail: {
    ...state?.ruleDetail,
    isPending: false,
    data,
  },
});
const ruleDetailFailure = (state: State) => ({
  ...state,
  ruleDetail: {
    ...state?.ruleDetail,
    isPending: false,
  },
});

const createRuleRequest = (state: State) => ({
  ...state,
  createRule: {
    ...state?.createRule,
    isPending: true,
    data: null,
  },
});
const createRuleSuccess = (state: State, { data }: any) => ({
  ...state,
  createRule: {
    ...state?.createRule,
    isPending: false,
    data,
  },
});
const createRuleFailure = (state: State, { error }: any) => ({
  ...state,
  createRule: {
    ...state?.createRule,
    isPending: false,
    error,
  },
});

const updateRuleRequest = (state: State) => ({
  ...state,
  updateRule: {
    ...state?.updateRule,
    isPending: true,
    data: null,
  },
});
const updateRuleSuccess = (state: State, { data }: any) => ({
  ...state,
  updateRule: {
    ...state?.updateRule,
    isPending: false,
    data,
  },
});
const updateRuleFailure = (state: State, { error }: any) => ({
  ...state,
  updateRule: {
    ...state?.updateRule,
    isPending: false,
    error,
  },
});

const setRuleModalData = (
  state: State,
  { isModalOpen, ruleId, name }: any,
) => ({
  ...state,
  ruleModalData: {
    isModalOpen,
    ruleId,
    name,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ALL_RULES_REQUEST]: allRulesRequest,
  [Types.GET_ALL_RULES_SUCCESS]: allRulesSuccess,
  [Types.GET_ALL_RULES_FAILURE]: allRulesFailure,

  [Types.GET_RULE_DETAIL_REQUEST]: ruleDetailRequest,
  [Types.GET_RULE_DETAIL_SUCCESS]: ruleDetailSuccess,
  [Types.GET_RULE_DETAIL_FAILURE]: ruleDetailFailure,

  [Types.CREATE_RULE_REQUEST]: createRuleRequest,
  [Types.CREATE_RULE_SUCCESS]: createRuleSuccess,
  [Types.CREATE_RULE_FAILURE]: createRuleFailure,

  [Types.UPDATE_RULE_REQUEST]: updateRuleRequest,
  [Types.UPDATE_RULE_SUCCESS]: updateRuleSuccess,
  [Types.UPDATE_RULE_FAILURE]: updateRuleFailure,

  [Types.SET_RULE_MODAL_DATA]: setRuleModalData,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
