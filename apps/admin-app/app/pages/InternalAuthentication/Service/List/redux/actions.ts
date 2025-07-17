import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.INTERNAL_AUTHENTICATION.SERVICE.LIST}_`;

export const { Types, Creators } = createActions({
  getServicesRequest: null,
  getServicesSuccess: { data: null },
  getServicesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
