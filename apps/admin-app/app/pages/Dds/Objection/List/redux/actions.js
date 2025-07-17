import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DDS.OBJECTION.LIST}_`;

export const { Types, Creators } = createActions({
  getDdsObjectionListRequest: {
    franchiseId: undefined,
    warehouseIds: undefined,
    statuses: undefined,
    criterionNames: undefined,
    startDate: undefined,
    endDate: undefined,
    limit: undefined,
    offset: undefined,
  },
  getDdsObjectionListSuccess: { data: null, total: 0 },
  getDdsObjectionListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
