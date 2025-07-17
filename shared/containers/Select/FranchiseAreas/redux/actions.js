import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.FRANCHISES_AREAS}_`;

export const { Types, Creators } = createActions({
  getFranchisesAreasRequest: { franchiseIds: undefined },
  getFranchisesAreasSuccess: { data: [] },
  getFranchisesAreasFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
