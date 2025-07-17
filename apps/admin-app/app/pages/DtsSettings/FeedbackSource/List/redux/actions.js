import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.LIST}_`;

export const { Types, Creators } = createActions({
  getDtsFeedbackSettingListRequest: { limit: undefined, offset: undefined },
  getDtsFeedbackSettingListSuccess: { data: null, total: 0 },
  getDtsFeedbackSettingListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
