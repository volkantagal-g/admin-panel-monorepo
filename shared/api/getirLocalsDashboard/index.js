import axios from '@shared/axios/common';

const getirLocalsDashboard = '/getirLocals/dashboard';

export const getDomainSummary = body => {
  return axios({
    method: 'POST',
    url: `${getirLocalsDashboard}/getDomainSummary`,
    data: body,
  }).then(response => {
    return response.data;
  });
};
