import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const saveAnnouncement = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketing/notificationCenter/create',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncement = ({ id: announcementId }) => {
  return axios({
    method: 'GET',
    url: `/marketing/notificationCenter/get/${announcementId}`,
  }).then(response => {
    return response.data;
  });
};

export const updateAnnouncement = ({ id, body }) => {
  return axios({
    method: 'PUT',
    url: `/marketing/notificationCenter/update/${id}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getS3ImageUploadUrl = ({ fileExtension, language, type }) => {
  return axios({
    method: 'GET',
    url: `/marketing/notificationCenter/getS3ImageUploadUrl/${fileExtension}`,
    params: { language, type },
  }).then(response => response.data);
};

// List Page Requests
export const getResults = filters => {
  const queryParams = removeEmptyFieldsFromParams(filters?.queryParams);
  const params = removeEmptyFieldsFromParams(filters?.params);
  return axios({
    method: 'POST',
    url: '/marketing/notificationCenter/search',
    data: params,
    params: queryParams,
  }).then(response => {
    return response.data;
  });
};

export const duplicate = id => {
  return axios({
    method: 'POST',
    url: `/marketing/notificationCenter/duplicate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const sendTestAnnouncement = ({ id, phoneNumbers }) => {
  return axios({
    method: 'POST',
    url: `/marketing/notificationCenter/send-test-notificationCenter/${id}`,
    data: { phoneNumbers },
  }).then(response => {
    return response.data;
  });
};

export const cancelAnnouncement = id => {
  return axios({
    method: 'POST',
    url: `/marketing/notificationCenter/cancel/${id}`,
  }).then(response => {
    return response.data;
  });
};

// Icon management
export const getIcons = () => {
  return axios({
    method: 'GET',
    url: '/marketing/notificationCenter/icon/list',
  }).then(response => {
    return response.data;
  });
};

export const createIcon = ({ formValues }) => {
  return axios({
    method: 'POST',
    url: '/marketing/notificationCenter/icon/create',
    data: { ...formValues },
  }).then(response => {
    return response.data;
  });
};

export const updateIcon = ({ formValues, iconId }) => {
  return axios({
    method: 'PUT',
    url: `/marketing/notificationCenter/icon/update/${iconId}`,
    data: { ...formValues },
  }).then(response => {
    return response.data;
  });
};

export const deleteIcon = ({ iconId }) => {
  return axios({
    method: 'DELETE',
    url: `/marketing/notificationCenter/icon/delete/${iconId}`,
  }).then(response => {
    return response.data;
  });
};

export const uploadIconImageToS3 = ({ imageName }) => {
  return axios({
    method: 'GET',
    url: `/marketing/notificationCenter/icon/getS3ImageSignedUrl/${imageName}`,
  }).then(response => {
    return response.data;
  });
};

export const setDefaultIconUrl = ({ url }) => {
  return axios({
    method: 'POST',
    data: { url },
    url: '/marketing/notificationCenter/icon/defaultIconUrl',
  }).then(response => {
    return response.data;
  });
};

export const getDefaultIconUrl = () => {
  return axios({
    method: 'GET',
    url: '/marketing/notificationCenter/icon/defaultIconUrl',
  }).then(response => {
    return response.data;
  });
};

// Get notification categories from notif-center
export const getNotificationCategories = textQuery => {
  return axios({
    method: 'POST',
    data: { textQuery },
    url: '/marketing/notificationCenter/icon/getCategories',
  }).then(response => {
    return response.data;
  });
};

export const getNotificationCategoryDetail = categoryId => {
  return axios({
    method: 'GET',
    url: `/marketing/notificationCenter/icon/getCategoryDetail/${categoryId}`,
  }).then(response => {
    return response.data;
  });
};
