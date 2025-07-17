import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getNotificationTagsRequest: { userLangKey: null },
    getNotificationTagsSuccess: { data: [] },
    getNotificationTagsFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.NOTIFICATION_TAG}_` },
);
