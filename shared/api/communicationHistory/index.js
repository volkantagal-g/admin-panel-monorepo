import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { COMMUNICATION_CHANNEL_TYPES } from '@app/pages/CommunicationHistory/constants';
import { getUser } from '@shared/redux/selectors/auth';

export const getResults = (filters, communicationType) => {
  let url;
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
    url = '/communicationHistory/notificationFilter';
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
    url = '/communicationHistory/smsFilter';
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL) {
    url = '/communicationHistory/emailFilter';
  }
  return axios({
    method: 'GET',
    url,
    params: removeEmptyFieldsFromParams(filters),
  }).then(response => {
    return response.data;
  });
};

export const getSignedUrl = emailId => {
  return axios({
    method: 'GET',
    url: '/communicationHistory/getSignedUrl',
    params: { emailId },
  }).then(response => {
    return response.data;
  });
};

export const getSignedUrlHtml = ({ signedUrl }) => axios({
  method: 'POST',
  url: '/communicationHistory/getSignedUrlHtml',
  data: { signedUrl },
}).then(response => response.data);

export const getNotificationReportConfigs = ({ clientLanguage }) => {
  return axios({
    method: 'GET',
    url: '/communicationHistory/getNotificationReportConfigs',
    params: { clientLanguage },
  }).then(response => {
    return response.data;
  });
};

export const getExportHistory = (filters, communicationType) => {
  const { email } = getUser();
  let url;
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
    url = '/communicationHistory/getNotificationExportHistory';
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
    url = '/communicationHistory/getSmsExportHistory';
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL) {
    url = '/communicationHistory/getEmailExportHistory';
  }
  return axios({
    method: 'POST',
    url,
    data: { ...removeEmptyFieldsFromParams(filters), userEmail: email },
  }).then(response => {
    return response.data;
  });
};
