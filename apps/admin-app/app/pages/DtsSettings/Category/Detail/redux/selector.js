import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.CATEGORY.DETAIL;

export const getDtsCategoryDetailSelector = {
  getData: state => state?.[reducerKey]?.dtsCategorySettingDetail?.data,
  getIsPending: state => state?.[reducerKey]?.dtsCategorySettingDetail?.isPending,
};
