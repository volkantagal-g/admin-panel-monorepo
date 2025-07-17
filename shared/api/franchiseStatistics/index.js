import axios from '@shared/axios/common';

export const filterDdsCriteria = () => {
  return axios({
    method: 'GET',
    url: '/dds/dds100/criteria/filter',
  }).then(({ data }) => data);
};
