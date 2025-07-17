import { createActions } from 'reduxsauce';

import { reducerKey } from './key';

export const { Types, Creators } = createActions(
  {
    getAnnouncementListRequest: {
      description: undefined,
      announcementType: undefined,
      title: undefined,
      active: undefined,
      limit: undefined,
      offset: undefined,
    },
    getAnnouncementListSuccess: { data: [], count: 0 },
    getAnnouncementListFailure: { error: null },
    deleteAnnouncementRequest: { id: undefined },
    deleteAnnouncementSuccess: {},
    deleteAnnouncementFailure: { error: null },
    deleteAnnouncementReset: {},
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${reducerKey}_` },
);
