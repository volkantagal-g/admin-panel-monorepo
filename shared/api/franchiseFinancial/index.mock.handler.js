const uploadFileUrlMockHandler = {
  url: '/franchiseEarnings/franchise-earning/get-upload-signed-url',
  successData: { url: '/signedUrl', fileName: 'uploaded-file.csv' },
};

const parseFileUrlMockHandler = {
  url: '/franchiseEarningsLambda/franchise-earning/parse-excel',
  successData: { earningType: 'splitReport', fileName: 'uploaded-file.csv' },
};

export default [uploadFileUrlMockHandler, parseFileUrlMockHandler];
