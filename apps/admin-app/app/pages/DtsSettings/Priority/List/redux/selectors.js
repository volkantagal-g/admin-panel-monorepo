import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.PRIORITY.LIST;

export const getDtsPrioritySettingListSelector = {
  getData: state => state?.[reducerKey]?.dtsPrioritySettingList?.data,
  getTotal: state => state?.[reducerKey]?.dtsPrioritySettingList?.total,
  getIsPending: state => state?.[reducerKey]?.dtsPrioritySettingList?.isPending,
};
