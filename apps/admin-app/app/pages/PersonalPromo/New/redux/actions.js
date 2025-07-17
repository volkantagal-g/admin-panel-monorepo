import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSONAL_PROMO.NEW}_`;

export const { Types, Creators } = createActions(
  {
    getClientsRequest: { gsm: '' },
    getClientsSuccess: { data: [] },
    getClientsFailure: { error: null },
    createPersonalPromoRequest: { body: null },
    createPersonalPromoSuccess: { data: {} },
    createPersonalPromoFailure: { error: null },
    initContainer: null,
    destroyContainer: null,
  },
  { prefix },
);
