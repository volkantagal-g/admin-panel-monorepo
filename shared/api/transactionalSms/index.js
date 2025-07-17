import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { getUser } from '@shared/redux/selectors/auth';

export const getTransactionalSms = ({ id: transactionalSmsId, clientLanguage }) => {
  return axios({
    method: 'GET',
    url: `/transactionalSms/get/${transactionalSmsId}`,
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const transactionalSmsUpdate = ({ id, body, clientLanguage }) => {
  return axios({
    method: 'PUT',
    url: `/transactionalSms/update/${id}`,
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
    url: '/transactionalSms/filter',
    params: removeEmptyFieldsFromParams(filters),
  }).then(response => {
    return response.data;
  });
};

export const getConfig = clientLanguage => {
  return axios({
    method: 'POST',
    url: '/transactionalSms/config',
    data: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const transactionalSmsSave = ({ body, clientLanguage }) => {
  return axios({
    method: 'POST',
    url: '/transactionalSms/create',
    data: { ...body },
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const getExportSmsList = filters => {
  const { email } = getUser();
  return axios({
    method: 'POST',
    url: '/transactionalSms/getExportSmsList',
    data: { ...removeEmptyFieldsFromParams(filters), userEmail: email },
  }).then(response => {
    return response.data;
  });
};

export const duplicate = ({ id, clientLanguage }) => {
  return axios({
    method: 'POST',
    url: `/transactionalSms/copy/${id}`,
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};
