import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const communicationBulkSmsSave = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/communicationBulkSms/create',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getResults = filters => {
  return axios({
    method: 'GET',
    url: '/communicationBulkSms/filter',
    params: removeEmptyFieldsFromParams(filters),
  }).then(response => {
    return response.data;
  });
};
export const getConfig = clientLanguage => {
  return axios({
    method: 'POST',
    url: '/communicationBulkSms/config',
    data: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const getS3CsvUploadUrl = ({ fileName, presignedMethodType }) => axios({
  method: 'GET',
  url: '/communicationBulkSms/getS3CsvUploadUrl',
  params: { fileName, presignedMethodType },
}).then(response => response.data);

export const communicationBulkSmsGet = ({ id: communicationBulkSmsId }) => {
  return axios({
    method: 'GET',
    url: `/communicationBulkSms/get/${communicationBulkSmsId}`,
  }).then(response => {
    return response.data;
  });
};
export const communicationBulkSmsUpdate = ({ id, body }) => {
  return axios({
    method: 'PUT',
    url: `/communicationBulkSms/update/${id}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const duplicate = ({ id, clientId }) => {
  return axios({
    method: 'POST',
    url: `/communicationBulkSms/copy/${id}`,
    data: { sourceId: id, clientId },
  }).then(response => {
    return response.data;
  });
};

export const cancelBulkSms = ({ id, clientId }) => {
  return axios({
    method: 'PUT',
    url: `/communicationBulkSms/cancel/${id}`,
    data: { clientId },
  }).then(response => {
    return response.data;
  });
};
