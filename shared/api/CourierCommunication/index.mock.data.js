export const notificationMockHandler = {
  notificationTasks: [
    {
      _id: '62fcc1ba554e952dbfd96c35',
      author: '62cfa4594d3054122c15b790',
      name: 'hebele7890',
      country: '507f1f77bcf86cd799439011',
      courierIds: [
        '507f1f77bcf86cd799439011',
      ],
      notification: {
        title: 'string',
        message: 'string',
      },
      status: 300,
      channel: {
        push: true,
        application: true,
      },
      priority: 100,
      createdAt: '2022-08-17T10:23:54.697Z',
      updatedAt: '2022-09-28T11:50:33.255Z',
    },
  ],
};

export const createNotificationMockHandler = {
  name: 'Test',
  courierIds: ['5ed4b73609cf3f225e359d6d', '6035ec25edf6a74e2fe48874'],
  notification: {
    title: {
      tr: 'test',
      en: 'test',
    },
    message: {
      tr: 'testMessage',
      en: 'testMessage',
    },
  },
  status: 100,
  channel: {
    push: false,
    application: true,
  },
  priority: 100,
};

export const notificationDetailMockHandler = {
  _id: '62fcc1ba554e952dbfd96c35',
  author: '62cfa4594d3054122c15b790',
  name: 'hebele7890',
  country: '507f1f77bcf86cd799439011',
  courierIds: ['507f1f77bcf86cd799439011'],
  notification: {
    title: 'string',
    message: 'string',
  },
  status: 300,
  channel: {
    push: true,
    application: true,
  },
  priority: 100,
  createdAt: '2022-08-17T10:23:54.697Z',
  updatedAt: '2022-09-28T11:50:33.255Z',
};
