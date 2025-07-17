import axios from '@shared/axios/common';

export const getSummary = () => {
  return axios({
    method: 'POST',
    url: '/technology/compliance/getSummary',
  }).then(response => {
    return response.data;
  });
};

export const getRepositories = () => {
  return axios({
    method: 'POST',
    url: '/technology/compliance/getRepositories',
  }).then(response => {
    return response.data;
  });
};

export const getVulnerabilties = ({ repositoryId }) => {
  return axios({
    method: 'POST',
    url: '/technology/compliance/getVulnerabilities',
    data: { repositoryId },
  }).then(response => {
    return response.data;
  });
};

export const getNodeVersions = () => {
  return axios({
    method: 'POST',
    url: '/technology/compliance/getNodeVersions',
  }).then(response => {
    return response.data;
  });
};
