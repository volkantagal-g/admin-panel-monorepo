import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const smsSave = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/sms/create',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getSms = ({ id: smsId }) => {
  return axios({
    method: 'GET',
    url: `/sms/get/${smsId}`,
  }).then(response => {
    return response.data;
  });
};

export const smsUpdate = ({ id, body }) => {
  return axios({
    method: 'PUT',
    url: `/sms/update/${id}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getS3UploadUrl = ({ csvName }) => {
  return axios({
    method: 'GET',
    url: `/sms/getS3UploadUrl/${csvName}`,
  }).then(response => response.data);
};

// List Page Requests
export const getResults = filters => {
  const queryParams = removeEmptyFieldsFromParams(filters?.queryParams);
  const params = removeEmptyFieldsFromParams(filters?.params);
  return axios({
    method: 'POST',
    url: '/sms/search',
    data: params,
    params: queryParams,
  }).then(response => {
    return response.data;
  });
};

export const duplicate = id => {
  return axios({
    method: 'POST',
    url: `/sms/duplicate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const sendTestSms = ({ id, phoneNumbers }) => {
  return axios({
    method: 'POST',
    url: `/sms/send-test-sms/${id}`,
    data: { phoneNumbers },
  }).then(response => {
    return response.data;
  });
};

export const cancelSms = id => {
  return axios({
    method: 'POST',
    url: `/sms/cancel/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const getStatistics = ({ id: smsId }) => {
  return axios({
    method: 'GET',
    url: `/sms/getStatistics/${smsId}`,
  }).then(response => {
    return response.data;
  });
};

export const getTargetAudienceStatistics = ({ clientListName, clientListType, campaignId }) => {
  return axios({
    method: 'GET',
    url: `/sms/getTargetAudienceStatistics/${clientListName}`,
    params: { clientListType, campaignId },
  }).then(response => {
    return response.data;
  });
};

// Global Settings
export const getGlobalSettings = () => {
  return axios({
    method: 'GET',
    url: '/sms/global-settings',
  }).then(response => {
    return response.data;
  });
};

export const updateGlobalSettings = body => {
  return axios({
    method: 'PUT',
    url: '/sms/global-settings',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const validateContent = ({ content }) => {
  return axios({
    method: 'POST',
    url: '/sms/validate-content',
    data: { body: content },
  }).then(response => {
    return response.data;
  });
};
