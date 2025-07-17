import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.PRIORITY.DETAIL;

export const getDtsPrioritySettingDetailSelector = {
  getData: state => state?.[reducerKey]?.dtsPrioritySettingDetail?.data,
  getIsPending: state => state?.[reducerKey]?.dtsPrioritySettingDetail?.isPending,
};
