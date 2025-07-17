import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.PERSON}_`;

export const { Types, Creators } = createActions({
  getPeopleRequest: { franchiseId: undefined },
  getPeopleSuccess: { data: [] },
  getPeopleFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
