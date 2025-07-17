import axios from '@shared/axios/common';

export const createFieldAnnouncement = data => {
  return axios({
    method: 'POST',
    url: '/fieldAnnouncement/announcement',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getFieldAnnouncementsListByWarehouse = ({ offset, limit, ...data }) => {
  return axios({
    method: 'POST',
    url: '/fieldAnnouncement/warehouse-announcements/filter',
    data,
    params: { offset, limit },
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncementList = data => {
  return axios({
    method: 'POST',
    url: '/fieldAnnouncement/announcement/filter',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncementDetail = announcementId => {
  return axios({
    method: 'GET',
    url: `/fieldAnnouncement/announcement/${announcementId}`,
  }).then(response => {
    return response.data;
  });
};

export const updateFieldAnnouncementDetail = ({ requestBody: { id, ...data } }) => {
  return axios({
    method: 'PATCH',
    url: `/fieldAnnouncement/announcement/${id}`,
    data,
  }).then(response => {
    return response.data;
  });
};

export const deleteAnnouncement = ({ id }) => {
  return axios({
    method: 'DELETE',
    url: `/fieldAnnouncement/delete/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const getSignedUrlForFile = params => {
  return axios({
    method: 'POST',
    url: '/fieldAnnouncement/announcement/uploadUrl',
    params,
  }).then(response => {
    return response.data;
  });
};
