import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { INIT_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.PAYOUTS_FOR_DOMAINS}_`;

export const { Types, Creators } = createActions({

  getPayoutReportsRequest: { filters: null },
  getPayoutReportsSuccess: { data: [] },
  getPayoutReportsFailure: { error: null },

  handleDomainTab: { domain: 'food' },
  submitFilters: { filters: INIT_FILTERS },

  initPage: null,
  destroyPage: null,
}, { prefix });
