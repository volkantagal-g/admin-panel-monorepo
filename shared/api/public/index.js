import publicAxios from '@shared/axios/public';
import { base64ToBinary } from '@shared/utils/upload';

export const uploadToS3SignedUrl = ({ signedUrl, data }) => {
  const binaryData = base64ToBinary(data, false);
  return publicAxios({
    method: 'PUT',
    url: signedUrl,
    data: binaryData,
  }).then(response => {
    return response.data;
  });
};
