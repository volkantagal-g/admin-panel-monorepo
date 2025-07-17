import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { getUser } from '@shared/redux/selectors/auth';

export const getTransactionalNotification = ({
  id: transactionalNotificationId,
  clientLanguage,
}) => {
  return axios({
    method: 'GET',
    url: `/transactionalNotification/get/${transactionalNotificationId}`,
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const transactionalNotificationUpdate = ({
  id,
  body,
  clientLanguage,
}) => {
  return axios({
    method: 'PUT',
    url: `/transactionalNotification/update/${id}`,
    data: { ...body },
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

// List Page Requests
export const getResults = filters => {
  return axios({
    method: 'POST',
    url: '/transactionalNotification/filter',
    params: removeEmptyFieldsFromParams(filters),
  }).then(response => {
    return response.data;
  });
};

export const getS3SignedUrl = ({ name }) => axios({
  method: 'GET',
  url: '/transactionalNotification/getS3ImageUploadUrl',
  params: { imageName: name },
}).then(response => response.data);

export const getConfig = clientLanguage => {
  return axios({
    method: 'POST',
    url: '/transactionalNotification/config',
    data: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const getNotificationCenter = () => {
  return axios({
    method: 'GET',
    url: '/transactionalNotification/center',
  }).then(response => {
    return response.data;
  });
};
export const transactionalNotificationSave = ({ body, clientLanguage }) => {
  return axios({
    method: 'POST',
    url: '/transactionalNotification/create',
    data: { ...body },
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const getExportNotificationList = filters => {
  const { email } = getUser();
  return axios({
    method: 'POST',
    url: '/transactionalNotification/getExportNotificationList',
    data: { ...removeEmptyFieldsFromParams(filters), userEmail: email },
  }).then(response => {
    return response.data;
  });
};

export const duplicate = ({ id, clientLanguage }) => {
  return axios({
    method: 'POST',
    url: `/transactionalNotification/copy/${id}`,
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};
