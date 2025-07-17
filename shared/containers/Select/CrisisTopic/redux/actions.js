import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.CRISIS_TOPIC}_`;

export const { Types, Creators } = createActions({
  getCrisisTopicsRequest: {},
  getCrisisTopicsSuccess: { data: [] },
  getCrisisTopicsFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
