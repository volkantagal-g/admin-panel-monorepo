import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.GENERAL.NEW;

export const createDtsSelector = { getIsPending: state => state?.[reducerKey]?.createDts?.isPending };
