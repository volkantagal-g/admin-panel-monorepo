import axios from '@shared/axios/common';

import { SERVICE_TYPES } from '@shared/containers/Select/Category/constants';

export const getCategories = ({ serviceType, textQuery }) => {
  let url = '';
  if (serviceType === SERVICE_TYPES.NOTIF) {
    url = '/transactionalNotification/category';
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    url = '/transactionalSms/category';
  }
  return axios({
    method: 'GET',
    url,
    params: { textQuery },
  }).then(response => {
    return response.data;
  });
};
