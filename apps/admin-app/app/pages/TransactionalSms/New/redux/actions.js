import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  transactionalSmsSaveRequest: { body: {}, clientLanguage: null },
  transactionalSmsSaveSuccess: { data: [] },
  transactionalSmsSaveFailure: { error: null },

  getConfigRequest: { clientLanguage: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TRANSACTIONAL_SMS.NEW}_` });
