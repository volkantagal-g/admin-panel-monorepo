import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const getCallbackProperties = ({ callbackType, serviceType, filters }) => {
  return axios({
    method: 'GET',
    url: `/communicationServiceCredentials/callback/${callbackType}`,
    params: { filters: removeEmptyFieldsFromParams(filters), serviceType },
  }).then(response => {
    return response.data;
  });
};
