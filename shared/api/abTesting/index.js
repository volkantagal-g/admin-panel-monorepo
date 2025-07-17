import axios from '@shared/axios/common';

export const getTestList = data => {
  return axios({
    method: 'POST',
    url: '/abTesting/getTestList',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const createTest = data => {
  return axios({
    method: 'POST',
    url: '/abTesting/createTest',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const updateTest = data => {
  return axios({
    method: 'POST',
    url: '/abTesting/updateTest',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const getSignedABTestCSVFileURL = data => {
  return axios({
    method: 'POST',
    url: '/abTesting/getSignedABTestCSVFileURL',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const getTest = testId => {
  return axios({
    method: 'POST',
    url: '/abTesting/getTest',
    data: { testId },
  }).then(({ data: responseData }) => responseData);
};
