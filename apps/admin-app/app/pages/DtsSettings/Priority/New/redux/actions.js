import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createDtsPrioritySettingRequest: {
    title: undefined,
    description: undefined,
    rejectionPoint: undefined,
    warningPoint: undefined,
    isActive: undefined,
  },
  createDtsPrioritySettingFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS_SETTING.PRIORITY.NEW}_` });
