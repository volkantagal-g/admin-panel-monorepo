import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const emailSave = data => axios({
  method: 'POST',
  url: '/email/save',
  data,
}).then(response => response.data);

export const getEmail = ({ id: emailId }) => axios({
  method: 'GET',
  url: `/email/getEmail/${emailId}`,
}).then(response => response.data);

export const emailUpdate = ({ id, body }) => axios({
  method: 'PUT',
  url: `/email/update/${id}`,
  data: { ...body },
}).then(response => response.data);

export const getS3UploadUrl = ({ csvName }) => {
  return axios({
    method: 'GET',
    url: `/email/getS3UploadUrl/${csvName}`,
  }).then(response => response.data);
};

export const previewImageRequest = ({ designId, domainType, phoneLanguage, emailCampaignId }) => axios({
  method: 'POST',
  url: '/email/design',
  data: { designId, phoneLanguage, emailCampaignId, domainType },
}).then(response => response.data);

export const testEmail = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/email/test',
    data: { ...body },
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
    url: '/email/search',
    data: params,
    params: queryParams,
  }).then(response => {
    return response.data;
  });
};

export const duplicate = id => {
  return axios({
    method: 'POST',
    url: `/email/duplicate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const cancelEmail = id => {
  return axios({
    method: 'POST',
    url: `/email/cancel/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const getStatistics = ({ id: emailId }) => axios({
  method: 'GET',
  url: `/email/getStatistics/${emailId}`,
}).then(response => response.data);

export const getTargetAudienceStatistics = ({ clientListName, clientListType, campaignId }) => {
  return axios({
    method: 'GET',
    url: `/email/getTargetAudienceStatistics/${clientListName}`,
    params: { clientListType, campaignId },
  }).then(response => {
    return response.data;
  });
};

// Global Settings
export const getGlobalSettings = () => {
  return axios({
    method: 'GET',
    url: '/email/global-settings',
  }).then(response => {
    return response.data;
  });
};

export const updateGlobalSettings = body => {
  return axios({
    method: 'PUT',
    url: '/email/global-settings',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};
