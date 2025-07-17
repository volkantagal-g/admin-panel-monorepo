import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SERVICE_AVAILABILITY_AREA.EDIT}_`;

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    getSaaByIdRequest: { id: null },
    getSaaByIdSuccess: { data: null },
    getSaaByIdFailure: { error: null },
    editFirstPartRequest: { data: null },
    editFirstPartSuccess: { data: null },
    editFirstPartFailure: { data: null },

    editGeoRequest: { data: null },
    editGeoSuccess: { data: null },
    editGeoFailure: { error: null },
  },
  { prefix },
);
