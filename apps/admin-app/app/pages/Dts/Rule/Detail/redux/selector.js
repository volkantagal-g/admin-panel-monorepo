import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.RULE.DETAIL;

export const getDtsRuleDetailSelector = {
  getData: state => state?.[reducerKey]?.dtsRuleDetail?.data,
  getIsPending: state => state?.[reducerKey]?.dtsRuleDetail?.isPending,
};
