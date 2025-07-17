import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS_SETTING.PRIORITY.LIST}_`;

export const { Types, Creators } = createActions({
  getDtsPrioritySettingListRequest: { limit: undefined, offset: undefined },
  getDtsPrioritySettingListSuccess: { data: null, total: 0 },
  getDtsPrioritySettingListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
