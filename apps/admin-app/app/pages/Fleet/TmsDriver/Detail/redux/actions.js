import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TMS_DRIVER.DETAIL}_`;

export const { Types, Creators } = createActions({
  getTmsDriverRequest: { id: '' },
  getTmsDriverSuccess: { data: {} },
  getTmsDriverFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
