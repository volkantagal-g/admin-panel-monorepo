import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSON.NEW}_`;

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    createPersonRequest: { requestBody: {} },
    createPersonSuccess: null,
    createPersonFailure: null,
  },
  { prefix },
);
