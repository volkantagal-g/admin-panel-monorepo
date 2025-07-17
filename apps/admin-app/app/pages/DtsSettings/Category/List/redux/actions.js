import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS_SETTING.CATEGORY.LIST}_`;

export const { Types, Creators } = createActions({
  getDtsCategorySettingListRequest: { limit: undefined, offset: undefined },
  getDtsCategorySettingListSuccess: { data: null, total: 0 },
  getDtsCategorySettingListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
