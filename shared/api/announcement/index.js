import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const announcementSave = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/announcement/create',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncement = ({ id: announcementId }) => {
  return axios({
    method: 'GET',
    url: `/announcement/get/${announcementId}`,
  }).then(response => {
    return response.data;
  });
};

export const announcementUpdate = ({ id, body }) => {
  return axios({
    method: 'PUT',
    url: `/announcement/update/${id}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getS3ImageUploadUrl = ({ extension, language }) => {
  return axios({
    method: 'GET',
    url: `/announcement/getS3ImageUploadUrl/${extension}`,
    params: { language },
  }).then(response => response.data);
};

export const searchUserDraftList = ({ body: name }) => {
  return axios({
    method: 'POST',
    url: '/announcement/getClientListTemplateFilter',
    data: { name },
  }).then(response => {
    return response.data;
  });
};

export const getClientListTemplateId = ({ clientListTemplateId }) => {
  return axios({
    method: 'POST',
    url: '/announcement/getClientListTemplateId',
    data: { clientListTemplateId },
  }).then(response => {
    return response.data;
  });
};

// List Page Requests
export const getResults = filters => {
  const queryParams = removeEmptyFieldsFromParams(filters?.queryParams);
  const params = removeEmptyFieldsFromParams(filters?.params);
  return axios({
    method: 'POST',
    url: '/announcement/search',
    data: params,
    params: queryParams,
  }).then(response => {
    return response.data;
  });
};

export const duplicate = id => {
  return axios({
    method: 'POST',
    url: `/announcement/duplicate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const sendTestAnnouncement = ({ id, phoneNumbers }) => {
  return axios({
    method: 'POST',
    url: `/announcement/send-test-announcement/${id}`,
    data: { phoneNumbers },
  }).then(response => {
    return response.data;
  });
};

export const cancelAnnouncement = id => {
  return axios({
    method: 'POST',
    url: `/announcement/cancel/${id}`,
  }).then(response => {
    return response.data;
  });
};
