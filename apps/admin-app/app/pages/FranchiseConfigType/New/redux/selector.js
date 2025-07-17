import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_CONFIG_TYPE.NEW;

export const createFranchiseConfigTypeSelector = { getIsPending: state => state?.[reducerKey]?.createFranchiseConfigType?.isPending };
