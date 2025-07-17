import axios from '@shared/axios/common';

export const getCourierCrises = async body => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/getCards',
    data: body,
  });
  return response.data;
};

export const exportCourierCrises = async body => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/exportCards',
    data: body,
  });
  return response.data;
};

export const getCourierCrisesLogs = async body => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/getLogs',
    data: body,
  });
  return response.data;
};

export const exportCourierCrisesLogs = async body => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/exportLogs',
    data: body,
  });
  return response.data;
};

export const getUploadUrl = async body => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/generateUploadUrl',
    data: body,
  });
  return response.data;
};

export const delCourierCrisis = async ({ id, ...data }) => {
  const response = await axios({
    method: 'POST',
    url: `/courierCrisisManagement/deleteCard/${id}`,
    data,
  });
  return response.data;
};

export const saveCourierCrisis = async data => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/createCard',
    data,
  });
  return response.data;
};

export const updateCourierCrisis = async ({ _id, ...data }) => {
  const response = await axios({
    method: 'POST',
    url: `/courierCrisisManagement/updateCard/${_id}`,
    data,
  });
  return response.data;
};

export const downloadAttachments = async data => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/generateDownloadUrls',
    data,
  });
  return response.data;
};

export const deleteAttachments = async data => {
  const response = await axios({
    method: 'POST',
    url: '/courierCrisisManagement/deleteAttachment',
    data,
  });
  return response.data;
};
