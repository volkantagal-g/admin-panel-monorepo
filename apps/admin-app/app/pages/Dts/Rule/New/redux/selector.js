import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.RULE.NEW;

export const createDtsRuleSelector = { getIsPending: state => state?.[reducerKey]?.createDtsRule?.isPending };
