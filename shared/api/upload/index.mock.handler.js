import { mockUploadToS3 } from './index.mock.data';

const uploadToS3MockOptions = {
  url: '/signedUrl',
  method: 'put',
  successData: mockUploadToS3,
};

export default [
  uploadToS3MockOptions,
];
