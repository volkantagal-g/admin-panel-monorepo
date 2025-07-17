import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getAnnouncementsByTextRequest: { searchString: '' },
  getAnnouncementsByTextSuccess: { data: [] },
  getAnnouncementsByTextFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.ANNOUNCEMENTS}_` });
