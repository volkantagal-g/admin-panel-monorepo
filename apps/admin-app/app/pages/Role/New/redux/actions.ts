import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createRoleRequest: { body: null, afterSuccess: null },
  createRoleSuccess: { data: [] },
  createRoleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.ROLE.NEW}_` });
