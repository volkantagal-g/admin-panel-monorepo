import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSONAL_PROMO.GENERATOR}_`;

export const { Types, Creators } = createActions({
  createPersonalPromosBulkRequest: { body: null },
  createPersonalPromosBulkSuccess: { data: [] },
  createPersonalPromosBulkFailure: { error: null },
  getDepartmentsRequest: null,
  getDepartmentsSuccess: { data: [] },
  getDepartmentsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
