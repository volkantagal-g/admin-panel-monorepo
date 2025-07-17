import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getNotificationCategoriesRequest: { textQuery: '' },
    getNotificationCategoriesSuccess: { content: [] },
    getNotificationCategoriesFailure: { error: null },

    getNotificationCategoryDetailRequest: { categoryId: '' },
    getNotificationCategoryDetailSuccess: { data: [] },
    getNotificationCategoryDetailFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.NOTIFICATION_CATEGORY}_` },
);
