import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getWarehouseAnnouncementsListByWarehouseRequest: {
      warehouses: undefined,
      limit: undefined,
      offset: undefined,
    },
    getWarehouseAnnouncementsListByWarehouseSuccess: { announcements: [], total: 0 },
    getWarehouseAnnouncementsListByWarehouseFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.FIELD_ANNOUNCEMENT.LIST_BY_WAREHOUSE}_` },
);
