import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.GENERAL.SELECT_RULE;

export const ruleSelector = {
  getData: state => state?.[reducerKey]?.rules?.data,
  getIsPending: state => state?.[reducerKey]?.rules?.isPending,
};
