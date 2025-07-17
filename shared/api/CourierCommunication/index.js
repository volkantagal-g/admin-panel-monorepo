import axios from '@shared/axios/common';

export const getAllNotification = async ({ status, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/notifications/tasks/filter',
    data: { status, limit, offset },
  });
  return data;
};

export const getNotificationById = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/notifications/tasks/getOne',
    data: { id },
  });
  return data;
};

export const getNotificationStats = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/notifications/stats',
    data: { id },
  });
  return data;
};

export const updateNotification = async ({
  _id,
  courierIds,
  name,
  channel,
  priority,
  notification,
  category,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/notifications/tasks/update',
    data: {
      _id,
      courierIds,
      name,
      channel,
      priority,
      notification,
      category,
    },
  });
  return data;
};

export const createNotification = async ({
  courierIds,
  notificationName,
  channel,
  priority,
  notification,
  notificationDateTime,
  category,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/notifications/tasks',
    data: {
      courierIds,
      name: notificationName,
      channel,
      priority,
      notification,
      scheduledAt: notificationDateTime,
      category,
    },
  });
  return data;
};

export const getCategories = async ({ fields }) => {
  const { data } = await axios({
    method: 'GET',
    url: '/courierNotification/notifications/categories',
    params: { fields },
  });
  return data;
};

export const filterNotification = async ({
  notificationId,
  notificationName,
  status,
  priority,
  createdAt,
  scheduledAt,
  limit,
  offset,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/notifications/tasks/filter',
    data: {
      notificationId,
      notificationName,
      status,
      priority,
      createdAt,
      scheduledAt,
      limit,
      offset,
    },
  });
  return data;
};

export const segmentList = async ({
  client,
  name,
  startDate,
  endDate,
  limit,
  offset,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/segmentList',
    data: { client, name, startDate, endDate, limit, offset },
  });
  return data;
};

export const getCourierIds = async ({ cityIds, warehouseIds, startDate, endDate, orderCountRange, starRatingRange }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/getCourierIds',
    data: { cityIds, warehouseIds, startDate, endDate, orderCountRange, starRatingRange },
  });
  return data;
};

export const createSegmentRequest = async ({ name, type, criteria, targetIds, client }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierCommunication/createSegment',
    data: { name, type, criteria, targetIds, client },
  });
  return data;
};
