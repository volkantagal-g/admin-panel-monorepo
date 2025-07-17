import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.DETAIL}_`;

export const { Types, Creators } = createActions({
  getDtsFeedbackSettingDetailRequest: { id: undefined },
  getDtsFeedbackSettingDetailSuccess: { data: {} },
  getDtsFeedbackSettingDetailFailure: { error: null },
  updateDtsFeedbackSettingDetailRequest: { data: undefined },
  updateDtsFeedbackSettingDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
