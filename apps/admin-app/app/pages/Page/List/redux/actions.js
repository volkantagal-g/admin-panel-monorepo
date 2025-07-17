import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  exportPagesExcel: { t: null },
  exportPagesExcelFailure: { error: null },
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PAGE.LIST}_` });
