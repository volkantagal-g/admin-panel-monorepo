import axios from '@shared/axios/common';

const prefix = '/getirJobs/core';

export const getJobTitlesByFilter = ({ langKey, searchString, limit, page }) => {
  return axios({
    method: 'POST',
    url: `${prefix}/getJobTitlesByFilter`,
    data: {
      langKey,
      searchString,
      limit,
      page,
    },
  }).then(response => {
    return response.data;
  });
};

export const getPostTypes = ({ langKey }) => {
  return axios({
    method: 'POST',
    url: `${prefix}/getPostTypes`,
    data: { langKey },
  }).then(response => {
    return response.data;
  });
};

export const getJobCategories = ({ langKey }) => {
  return axios({
    method: 'POST',
    url: `${prefix}/getJobCategories`,
    data: { langKey },
  }).then(response => {
    return response.data;
  });
};

export const getDrivingLicenses = ({ langKey }) => {
  return axios({
    method: 'POST',
    url: `${prefix}/getDrivingLicenses`,
    data: { langKey },
  }).then(response => {
    return response.data;
  });
};
