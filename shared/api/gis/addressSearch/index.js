import axios from '@shared/axios/common';

export const addressAutoComplete = async ({ body }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/addressSearch/addressAutoComplete',
    data: body,
  });
  return response.data;
};
