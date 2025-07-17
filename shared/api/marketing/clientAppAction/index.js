import axios from '@shared/axios/common';

export const getAnnouncements = async ({ queryString, language }) => {
  return axios({
    method: 'POST',
    url: '/marketing/notificationCenter/search',
    data: { keyword: queryString, clientLanguage: language },
    params: { page: 0, size: 10 },
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncementsWithKeyword = async ({ queryString, language }) => {
  return axios({
    method: 'POST',
    url: '/marketing/notificationCenter/search-keyword',
    data: { keyword: queryString, clientLanguage: language },
    params: { page: 0, size: 10 },
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncementDetail = async ({ id, signal }) => {
  return axios({
    method: 'GET',
    url: `/marketing/notificationCenter/get/${id}`,
    signal,
  }).then(response => {
    return response.data;
  });
};
