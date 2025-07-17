import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createUserRequest: { body: null, afterSuccess: null },
  createUserSuccess: { data: [] },
  createUserFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.USER.NEW}_` });
