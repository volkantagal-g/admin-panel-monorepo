import axios from '@shared/axios/common';

export const getFilterOptionsAPI = () => {
  return axios({
    method: 'POST',
    url: '/companyKPIDictionary/getFilterOptions',
  }).then(response => {
    return response.data;
  });
};

export const getFilteredKPIDictionaryAPI = filters => {
  return axios({
    method: 'POST',
    url: '/companyKPIDictionary/getFilteredKPIDictionary',
    data: filters,
  }).then(response => {
    return response.data;
  });
};

export const getFilteredKPIAcronymDictionaryAPI = () => {
  return axios({
    method: 'POST',
    url: '/companyKPIDictionary/getFilteredKPIAcronymDictionary',
    data: {},
  }).then(response => {
    return response.data;
  });
};
