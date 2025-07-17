import axios from '@shared/axios/common';

export const getResults = body => {
  return axios({
    method: 'POST',
    url: '/artisanOrder/getByFilters',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getComparisonStatsBetweenTwoDateRanges = body => {
  return axios({
    method: 'POST',
    url: '/artisanOrder/getComparisonStatsBetweenTwoDateRanges',
    data: body,
  }).then(response => {
    return response.data;
  });
};
