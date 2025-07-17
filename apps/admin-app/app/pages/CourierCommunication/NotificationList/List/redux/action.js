import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  notificationList: {
    notificationID: '',
    notificationName: '',
    status: '',
    priority: null,
    creationDateTime: null,
    sendingDateTime: null,
    currentPage: 1,
    rowsPerPage: 10,
  },
  duplicateNotification: {
    courierIds: [],
    notificationName: '',
    channel: null,
    priority: null,
    notification: null,
    category: '',
  },
  notificationListSuccess: { data: [] },
  notificationListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.LIST}_` });
