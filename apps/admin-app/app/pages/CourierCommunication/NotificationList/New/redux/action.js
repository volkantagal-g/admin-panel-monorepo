import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createNotification: {
    courierIds: [],
    notificationDateTime: '',
    notificationName: '',
    notificationChannel: '',
    priority: '',
    notification: {},
    channel: {},
    category: '',
  },
  createNotificationSuccess: { data: [] },
  createNotificationFailure: { error: null },
  getCategoriesRequest: { fields: '' },
  getCategoriesSuccess: { data: [] },
  getCategoriesFailure: { error: null },
  getCourierIdsListRequest: { warehouseIds: [] },
  getCourierIdsListSuccess: { data: null },
  getCourierIdsListFailure: { error: null },
  cleanCourierIds: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.CREATE}_` });
