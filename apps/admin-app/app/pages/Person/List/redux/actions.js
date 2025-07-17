import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PERSON.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getPersonListRequest: {
      query: undefined,
      sort: undefined,
      fields: undefined,
      limit: undefined,
      offset: undefined,
    },
    getPersonListSuccess: { people: [], total: 0 },
    getPersonListFailure: null,
    getPersonListExcelRequest: { query: undefined, sort: undefined, fields: undefined },
    getPersonListExcelSuccess: {},
    getPersonListExcelFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
