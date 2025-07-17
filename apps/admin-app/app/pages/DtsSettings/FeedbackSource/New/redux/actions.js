import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createDtsFeedbackSettingRequest: {
    title: undefined,
    description: undefined,
    isActive: undefined,
  },
  createDtsFeedbackSettingSuccess: null,
  createDtsFeedbackSettingFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.NEW}_` });
