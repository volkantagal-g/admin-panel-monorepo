import axios from '@shared/axios/public';

import { base64ToBinary, getHeaderFromBase64 } from '@shared/utils/upload';

export const uploadToS3 = ({ signedUrl, data }) => {
  return axios({
    method: 'PUT',
    url: signedUrl,
    data: base64ToBinary(data),
    headers: getHeaderFromBase64(data),
  }).then(response => {
    return response.data;
  });
};
