import axios from '@shared/axios/common';

export const getBadges = ({ limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/getBadges',
    data: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getBadge = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/getBadge',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createBadge = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/createBadge',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateBadge = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/updateBadge',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const createBadgeImageUrl = ({ extension }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/createBadgeImageUrl',
    data: { extension },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductBadges = ({ badgeId }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/getMarketProductBadges',
    data: { badge: badgeId },
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProductBadgesBulk = ({ badgeId, productIds }) => {
  return axios({
    method: 'POST',
    url: '/marketProductBadge/updateMarketProductBadgesBulk',
    data: { badge: badgeId, products: productIds },
  }).then(response => {
    return response.data;
  });
};
