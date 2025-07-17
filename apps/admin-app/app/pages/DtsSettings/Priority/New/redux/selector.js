import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.PRIORITY.NEW;

export const createDtsPrioritySettingSelector = { getIsPending: state => state?.[reducerKey]?.createDtsPrioritySetting?.isPending };
