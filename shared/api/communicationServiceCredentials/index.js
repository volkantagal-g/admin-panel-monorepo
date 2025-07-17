import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { SERVICE_TYPES } from '@app/pages/CommunicationServiceCredentials/constants';

export const communicationServiceCredentialsSave = ({ body, serviceType }) => {
  let url;
  if (serviceType === SERVICE_TYPES.NOTIF) {
    url = '/communicationServiceCredentials/notificationCreate';
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    url = '/communicationServiceCredentials/smsCreate';
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    url = '/communicationServiceCredentials/emailCreate';
  }
  return axios({
    method: 'POST',
    url,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const communicationServiceCredentialsUpdate = ({ id, body, serviceType }) => {
  let url;
  if (serviceType === SERVICE_TYPES.NOTIF) {
    url = `/communicationServiceCredentials/notificationUpdate/${id}`;
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    url = `/communicationServiceCredentials/smsUpdate/${id}`;
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    url = `/communicationServiceCredentials/emailUpdate/${id}`;
  }
  return axios({
    method: 'PUT',
    url,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const communicationServiceCredentialsGet = ({ id: communicationServiceCredentialsId, serviceType }) => {
  let url;
  if (serviceType === SERVICE_TYPES.NOTIF) {
    url = `/communicationServiceCredentials/notificationGet/${communicationServiceCredentialsId}`;
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    url = `/communicationServiceCredentials/smsGet/${communicationServiceCredentialsId}`;
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    url = `/communicationServiceCredentials/emailGet/${communicationServiceCredentialsId}`;
  }
  return axios({
    method: 'GET',
    url,
  }).then(response => {
    return response.data;
  });
};

export const getConfig = ({ clientLanguage, serviceType }) => {
  let url;
  if (serviceType === SERVICE_TYPES.NOTIF) {
    url = '/communicationServiceCredentials/notificationConfig';
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    url = '/communicationServiceCredentials/smsConfig';
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    url = '/communicationServiceCredentials/emailConfig';
  }
  return axios({
    method: 'POST',
    url,
    data: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const getProvider = ({ clientLanguage, suffix }) => {
  return axios({
    method: 'GET',
    url: `/communicationServiceCredentials/smsProvider/${suffix}`,
    headers: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

// List Page Requests
export const getResults = (filters, serviceType) => {
  let url;
  if (serviceType === SERVICE_TYPES.NOTIF) {
    url = '/communicationServiceCredentials/notificationFilter';
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    url = '/communicationServiceCredentials/smsFilter';
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    url = '/communicationServiceCredentials/emailFilter';
  }
  return axios({
    method: 'GET',
    url,
    params: removeEmptyFieldsFromParams(filters),
  }).then(response => {
    return response.data;
  });
};
