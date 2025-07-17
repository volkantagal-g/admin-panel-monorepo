import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.RULE.SELECT_PRIORITY}_`;

export const { Types, Creators } = createActions({
  getPriorityRequest: null,
  getPrioritySuccess: { data: [] },
  getPriorityFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
