import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.ROLE}_`;

export const { Types, Creators } = createActions({
  getRolesRequest: { searchVal: null },
  getRolesSuccess: { data: [] },
  getRolesFailure: { error: null },
  clearRolesData: null,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
