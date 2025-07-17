import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.WAREHOUSE_PROPOSAL.SELECT.DISTRICT}_`;

export const { Types, Creators } = createActions({
  getDistrictsRequest: { city: null },
  getDistrictsSuccess: { data: [] },
  getDistrictsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
