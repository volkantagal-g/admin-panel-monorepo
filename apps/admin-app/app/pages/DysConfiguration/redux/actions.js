import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getDysConfigsRequest: {},
  getDysConfigsSuccess: { data: {} },
  getDysConfigsFailure: { error: null },
  updateDysConfigsRequest: { updateData: {} },
  updateDysConfigsFailure: { error: null },
}, { prefix: `${REDUX_KEY.DYS_CONFIGS.UPDATE}_` });
