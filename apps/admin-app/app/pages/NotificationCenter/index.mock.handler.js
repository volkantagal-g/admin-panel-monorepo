import { sampleNotificationCenterResponse, SAMPLE_NOTIFICATION_CENTER_ID } from './index.mock.data';

const getNotificationCenterUrl = `/notificationCenter/get/${SAMPLE_NOTIFICATION_CENTER_ID}`;

export const getNotificationCenterMock = {
  url: getNotificationCenterUrl,
  successData: { data: sampleNotificationCenterResponse },
  method: 'get',
};
