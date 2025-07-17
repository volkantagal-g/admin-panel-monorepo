import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.DETAIL}_`;

export const { Types, Creators } = createActions({
  getNotificationByIdRequest: { id: '' },
  getNotificationByIdSuccess: { data: undefined },
  getNotificationByIdFailure: { error: null },
  notificationUpdateRequest: {
    _id: '',
    courierIds: [],
    name: '',
    priority: '',
    notification: {},
    channel: {},
    category: '',
  },
  notificationUpdateSuccess: { data: undefined },
  notificationUpdateFailure: { error: null },
  getNotificationStats: { id: '' },
  getNotificationStatsSuccess: { data: undefined },
  getNotificationStatsFailure: { error: null },
  getCategoriesRequest: { fields: '' },
  getCategoriesSuccess: { data: [] },
  getCategoriesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
