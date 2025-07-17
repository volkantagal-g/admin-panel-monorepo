import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.RULE.SELECT_CATEGORY}_`;

export const { Types, Creators } = createActions({
  getCategoryRequest: null,
  getCategorySuccess: { data: [] },
  getCategoryFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
