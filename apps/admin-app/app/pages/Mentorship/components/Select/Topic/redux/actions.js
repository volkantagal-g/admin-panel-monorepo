import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MENTORSHIP.SELECT.TOPIC}_`;

export const {
  Types,
  Creators,
} = createActions({
  getTopicsRequest: { filters: {} },
  getTopicsSuccess: { data: [] },
  getTopicsFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
