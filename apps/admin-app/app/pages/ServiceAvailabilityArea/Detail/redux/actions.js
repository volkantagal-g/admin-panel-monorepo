import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SERVICE_AVAILABILITY_AREA.DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    getSaaByIdRequest: { id: null },
    getSaaByIdSuccess: { data: null },
    getSaaByIdFailure: { error: null },
  },
  { prefix },
);
