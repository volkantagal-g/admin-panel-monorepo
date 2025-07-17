import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createConfigRequest: {
    // because type is reserved word for reduxsauce
    configType: undefined,
    key: undefined,
    value: undefined,
    description: undefined,
    responsibleSquad: undefined,
  },
  createConfigSuccess: null,
  createConfigFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.CONFIG.NEW}_` });
