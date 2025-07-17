import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.DETAIL;

export const getDtsFeedbackDetailSelector = {
  getData: state => state?.[reducerKey]?.dtsFeedbackSettingDetail?.data,
  getIsPending: state => state?.[reducerKey]?.dtsFeedbackSettingDetail?.isPending,
};
