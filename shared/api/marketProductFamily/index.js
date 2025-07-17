import axios from '@shared/axios/common';

export const getMarketProductFamilyList = filter => {
  return axios({
    method: 'POST',
    url: '/marketProductPriceFamily/filter',
    data: {
      name: filter.name || undefined,
      limit: filter.limit,
      sort: filter.sort,
      sortOrder: filter.sortOrder,
      page: filter.page,
    },
  }).then(({ data }) => data);
};

export const createMarketProductFamily = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPriceFamily',
    data: body,
  }).then(({ data }) => data);
};

export const getMarketProductFamilyDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/marketProductPriceFamily/products-with-prices/${id}`,
  }).then(({ data }) => data);
};

export const getMarketProductFamilyDetailByLeadProductId = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/marketProductPriceFamily/lead-product/${id}`,
  }).then(({ data }) => data);
};
