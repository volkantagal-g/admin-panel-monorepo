import axios from '@shared/axios/common';

export const getTobbGibRequest = async ({ ids }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/tobb/requestVKNInfo',
    data: { ids },
  });
  return data;
};
