import axios from '@shared/axios/common';

export const getResults = body => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getByFilters',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getComparisonStatsBetweenTwoDateRanges = body => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getComparisonStatsBetweenTwoDateRanges',
    data: body,
  }).then(response => {
    return response.data;
  });
};
