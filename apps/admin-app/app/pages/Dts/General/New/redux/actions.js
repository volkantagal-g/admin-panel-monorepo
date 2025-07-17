import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createDtsRequest: {
    description: undefined,
    feedbackSource: undefined,
    person: undefined,
    realized: undefined,
    rule: undefined,
    warehouse: undefined,
    files: undefined,
    isActive: undefined,
  },
  createDtsSuccess: null,
  createDtsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS.GENERAL.NEW}_` });
