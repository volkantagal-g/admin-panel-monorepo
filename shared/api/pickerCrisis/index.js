import axios from '@shared/axios/common';

export const getPickerCrises = async body => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/getCards',
    data: body,
  });
  return response.data;
};

export const exportPickerCrises = async body => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/exportCards',
    data: body,
  });
  return response.data;
};

export const getPickerCrisesLogs = async body => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/getLogs',
    data: body,
  });
  return response.data;
};

export const exportPickerCrisesLogs = async body => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/exportLogs',
    data: body,
  });
  return response.data;
};

export const getUploadUrl = async body => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/generateUploadUrl',
    data: body,
  });
  return response.data;
};

export const delPickerCrisis = async ({ id, ...data }) => {
  const response = await axios({
    method: 'POST',
    url: `/picker/crises/deleteCard/${id}`,
    data,
  });
  return response.data;
};

export const savePickerCrisis = async data => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/createCard',
    data,
  });
  return response.data;
};

export const updatePickerCrisis = async ({ _id, ...data }) => {
  const response = await axios({
    method: 'POST',
    url: `/picker/crises/updateCard/${_id}`,
    data,
  });
  return response.data;
};

export const downloadAttachments = async data => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/generateDownloadUrls',
    data,
  });
  return response.data;
};

export const deleteAttachments = async data => {
  const response = await axios({
    method: 'POST',
    url: '/picker/crises/deleteAttachment',
    data,
  });
  return response.data;
};
