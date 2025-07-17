import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.FRANCHISE}_`;

export const { Types, Creators } = createActions({
  getFranchisesRequest: { isActivated: undefined, cities: undefined },
  getFranchisesSuccess: { data: [] },
  getFranchisesFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
