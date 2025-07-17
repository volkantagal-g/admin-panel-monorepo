import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCategoryRequest: { serviceType: null, textQuery: null },
  getCategorySuccess: { data: {} },
  getCategoryFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.CATEGORY}_` });
