import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createDtsCategorySettingRequest: {
    title: undefined,
    description: undefined,
    isActive: undefined,
  },
  createDtsCategorySettingSuccess: null,
  createDtsCategorySettingFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS_SETTING.CATEGORY.NEW}_` });
