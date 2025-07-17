import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SERVICE_AVAILABILITY_AREA.NEW}_`;

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    createSaaRequest: { data: null, countries: null },
    createSaaSuccess: { data: null },
    createSaaFailure: { error: null },
  },
  { prefix },
);
