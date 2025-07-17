import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFranchiseAreasRequest: { franchiseId: null },
  getFranchiseAreasSuccess: { data: [] },
  getFranchiseAreasFailure: { error: null },
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.COMMON}_` });
