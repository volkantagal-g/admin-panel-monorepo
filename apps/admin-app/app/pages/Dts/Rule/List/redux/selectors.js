import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.RULE.LIST;

export const getDtsRuleListSelector = {
  getData: state => state?.[reducerKey]?.dtsRuleList?.data,
  getTotal: state => state?.[reducerKey]?.dtsRuleList?.total,
  getIsPending: state => state?.[reducerKey]?.dtsRuleList?.isPending,
};
