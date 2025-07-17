import { notificationMockHandler, createNotificationMockHandler, notificationDetailMockHandler } from './index.mock.data';

const getAllNotificationData = {
  url: '/courierCommunication/notifications/tasks/filter',
  method: 'post',
  successData: notificationMockHandler,
};

const createNotificationData = {
  url: '/courierCommunication/notifications/tasks',
  method: 'post',
  successData: createNotificationMockHandler,
};

const getNotificationDetailData = {
  url: '/courierCommunication/notifications/tasks/getOne',
  method: 'post',
  successData: notificationDetailMockHandler,
};

export default [
  getAllNotificationData,
  createNotificationData,
  getNotificationDetailData,
];
