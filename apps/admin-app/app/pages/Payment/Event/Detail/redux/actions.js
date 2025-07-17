import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PAYMENT_EVENT.DETAIL}_`;

export const { Types, Creators } = createActions({
  getEventDetailRequest: { id: null },
  getEventDetailSuccess: { data: [] },
  getEventDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
