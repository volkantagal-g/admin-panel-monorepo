import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.WAREHOUSE_PROPOSAL.SELECT.NEIGHBORHOOD}_`;

export const { Types, Creators } = createActions({
  getNeighborhoodsRequest: { district: null },
  getNeighborhoodsSuccess: { data: [] },
  getNeighborhoodsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
