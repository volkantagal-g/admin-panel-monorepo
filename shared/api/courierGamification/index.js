import axios from '@shared/axios/common';

export const getCourierLoyalty = async config => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierGamification/getCourierList',
    data: config,
  });
  return data;
};

export const getCourierGamificationKPI = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/courierGamificationTask/tasks/kpis',
  });
  return data;
};

export const getCourierGamificationTasks = async config => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierGamificationTask/tasks/filter',
    data: config,
  });
  return data;
};

export const filterCourier = async ({ limit, offset, reqParams }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierHandler/couriers/filter',
    data: {
      limit,
      offset,
      ...reqParams,
    },
  });

  return data;
};

export const createCourierGamificationTask = async config => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierGamificationTask/tasks',
    data: config,
  });
  return data;
};

export const getCourierGamificationTaskById = async id => {
  const { data } = await axios({
    method: 'GET',
    url: `/courierGamificationTask/tasks/${id}`,
  });
  return data;
};

export const updateCourierGamificationTask = async config => {
  const { data } = await axios({
    method: 'PUT',
    url: `/courierGamificationTask/tasks/${config?.id}`,
    data: config?.requestBody,
  });
  return data;
};

export const getSummaryOfGMFCTaskById = async config => {
  const { id, requestBody, limit, offset, sortKey, sortDirection } = config;
  const url = `/courierGamificationTask/tasks/${id}/summary${
    `?${new URLSearchParams({ limit, offset, sortKey, sortDirection })}`}`;

  const { data } = await axios({
    method: 'POST',
    url,
    data: requestBody,
  });

  return data;
};

export const deleteGMFCTaskById = async id => {
  const { data } = await axios({
    method: 'DELETE',
    url: `/courierGamificationTask/tasks/${id}`,
  });
  return data;
};

export const getUploadSignedUrl = ({
  fileName,
  contentType,
  folderPath,
  bucketName,
}) => {
  return axios({
    method: 'POST',
    url: '/courierGamificationTask/getUploadSignedUrl',
    data: { fileName, contentType, folderPath, bucketName },
  }).then(response => {
    return response.data;
  });
};

export const getTaskHistory = ({
  limit,
  offset,
  id,
}) => {
  return axios({
    method: 'GET',
    url: `/courierGamificationTask/tasks/${id}/history`,
    params: { limit, offset },
  }).then(response => {
    return response.data;
  });
};
