import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  searchClientsRequest: { name: '', gsm: '', email: '' },
  searchClientsSuccess: { clients: [] },
  searchClientsFailure: { error: null },
  searchClientsClear: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.CLIENT.LIST}_` });
