import axios from '@shared/axios/common';

const CLIENT_PATH = 'client';

export const search = async data => {
  const response = await axios({
    method: 'POST',
    url: `/${CLIENT_PATH}/search`,
    data,
  });
  return response.data;
};
