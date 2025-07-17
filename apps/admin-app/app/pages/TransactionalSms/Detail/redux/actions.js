import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getTransactionalSmsRequest: { transactionalSmsId: null, clientLanguage: null },
  getTransactionalSmsSuccess: { data: {} },
  getTransactionalSmsFailure: { error: null },

  updateTransactionalSmsRequest: { id: null, body: null, clientLanguage: null },
  updateTransactionalSmsSuccess: { data: [] },
  updateTransactionalSmsFailure: { error: null },

  getConfigRequest: { clientLanguage: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TRANSACTIONAL_SMS.NEW}_` });
