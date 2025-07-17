import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS_SETTING.PRIORITY.DETAIL}_`;

export const { Types, Creators } = createActions({
  getDtsPrioritySettingDetailRequest: { id: undefined },
  getDtsPrioritySettingDetailSuccess: { data: {} },
  getDtsPrioritySettingDetailFailure: { error: null },
  updateDtsPrioritySettingDetailRequest: { data: undefined },
  updateDtsPrioritySettingDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
