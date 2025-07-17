import axios from '@shared/axios/common';

export const createClientListUrl = ({ contentType, fileName }) => {
  return axios({
    method: 'POST',
    url: '/clientListDoubleChecker/createClientListUrl',
    data: { contentType, fileName },
  }).then(response => {
    return response.data;
  });
};

export const uploadClientList = data => {
  return axios({
    method: 'POST',
    url: '/clientListDoubleChecker/upload',
    data,
  }).then(response => {
    return response.data;
  });
};
