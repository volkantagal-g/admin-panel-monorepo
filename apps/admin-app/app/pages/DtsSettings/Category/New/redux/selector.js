import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.CATEGORY.NEW;

export const createDtsCategorySettingSelector = { getIsPending: state => state?.[reducerKey]?.createDtsCategorySetting?.isPending };
