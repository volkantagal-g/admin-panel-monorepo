import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getAnnouncementsRequest: { data: {} },
  getAnnouncementsSuccess: { data: [] },
  getAnnouncementsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS}_` });
