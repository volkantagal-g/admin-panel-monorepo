import axios from '@shared/axios/common';

export const getTestTypeList = () => {
  return axios({
    method: 'GET',
    url: '/abTestingV2/getTestTypeList',
  }).then(({ data: responseData }) => responseData);
};

export const getTestList = data => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/getTestList',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const createTest = data => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/createTest',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const updateTest = data => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/updateTest',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const startTest = testId => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/startTest',
    data: { testId },
  }).then(({ data: responseData }) => responseData);
};

export const stopTest = testId => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/stopTest',
    data: { testId },
  }).then(({ data: responseData }) => responseData);
};

export const completeTest = requestData => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/completeTest',
    data: requestData,
  }).then(({ data: responseData }) => responseData);
};

export const getSignedABTestCSVFileURL = data => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/getSignedABTestCSVFileURL',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const getTest = testId => {
  return axios({
    method: 'POST',
    url: '/abTestingV2/getTest',
    data: { testId },
  }).then(({ data: responseData }) => responseData);
};

export const getAllTestCodes = async () => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/abTestingV2/getAllTestCodes',
  });
  return responseData;
};
