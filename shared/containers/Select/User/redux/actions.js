import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.USER}_`;

export const { Types, Creators } = createActions({
  getUsersRequest: { searchVal: null },
  getUsersSuccess: { data: [] },
  getUsersFailure: { error: null },
  clearUsersData: null,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
