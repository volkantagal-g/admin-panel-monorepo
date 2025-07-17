import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS_SETTING.CATEGORY.DETAIL}_`;

export const { Types, Creators } = createActions({
  getDtsCategorySettingDetailRequest: { id: undefined },
  getDtsCategorySettingDetailSuccess: { data: {} },
  getDtsCategorySettingDetailFailure: { error: null },
  updateDtsCategorySettingDetailRequest: { data: undefined },
  updateDtsCategorySettingDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
