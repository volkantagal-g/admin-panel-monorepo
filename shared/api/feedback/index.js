import axios from '@shared/axios/common';

export const getClientFeedbacks = async ({ clientId }) => {
  const response = await axios({
    method: 'POST',
    url: '/feedback/getClientFeedbacks',
    data: { clientId },
  });

  return response.data;
};
