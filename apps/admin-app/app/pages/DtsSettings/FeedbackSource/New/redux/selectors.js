import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.NEW;

export const createDtsFeedbackSettingSelector = { getIsPending: state => state?.[reducerKey]?.createDtsFeedbackSetting?.isPending };
