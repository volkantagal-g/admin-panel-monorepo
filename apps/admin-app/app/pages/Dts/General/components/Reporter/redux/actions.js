import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.REPORTERS}_`;

export const { Types, Creators } = createActions({
  getReportersRequest: {},
  getReportersSuccess: { data: [] },
  getReportersFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
