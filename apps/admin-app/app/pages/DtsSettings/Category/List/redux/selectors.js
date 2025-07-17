import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.CATEGORY.LIST;

export const getDtsCategorySettingSelector = {
  getData: state => state?.[reducerKey]?.dtsCategorySettingList?.data,
  getTotal: state => state?.[reducerKey]?.dtsCategorySettingList?.total,
  getIsPending: state => state?.[reducerKey]?.dtsCategorySettingList?.isPending,
};
