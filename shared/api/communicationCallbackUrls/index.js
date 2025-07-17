import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { serviceUrls } from '@app/pages/CommunicationCallbackUrls/constantValues';

export const communicationCallbackUrlsSave = ({ body, serviceType }) => {
  const url = serviceUrls.communicationCallbackUrlsSave[serviceType];
  return axios({
    method: 'POST',
    url,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const communicationCallbackUrlsUpdate = ({ id, body, serviceType }) => {
  const url = serviceUrls.communicationCallbackUrlsUpdate[serviceType] + id;
  return axios({
    method: 'PUT',
    url,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const communicationCallbackUrlsGet = ({ id: communicationCallbackUrlsId, serviceType }) => {
  const url = serviceUrls.communicationCallbackUrlsGet[serviceType] + communicationCallbackUrlsId;
  return axios({
    method: 'GET',
    url,
  }).then(response => {
    return response.data;
  });
};

// List Page Requests
export const getResults = (filters, serviceType) => {
  const url = serviceUrls.getResults[serviceType];
  return axios({
    method: 'GET',
    url,
    params: removeEmptyFieldsFromParams(filters),
  }).then(response => {
    return response.data;
  });
};
