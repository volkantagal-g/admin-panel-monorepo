import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.LIST;

export const getDtsFeedbackSettingListSelector = {
  getData: state => state?.[reducerKey]?.dtsFeedbackSettingList?.data,
  getTotal: state => state?.[reducerKey]?.dtsFeedbackSettingList?.total,
  getIsPending: state => state?.[reducerKey]?.dtsFeedbackSettingList?.isPending,
};
