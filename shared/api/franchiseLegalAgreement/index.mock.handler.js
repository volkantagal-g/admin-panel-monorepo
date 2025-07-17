import * as MOCKS from './index.mock.data';

const uploadFranchiseLegalFileUrlMockHandler = {
  url: '/franchise/agreement/get-upload-signed-url',
  successData: { url: '/signedUrl', fileName: 'uploaded-file.pdf' },
};

const parseFranchiseLegalFileUrlMockHandler = {
  url: '/franchise/agreement/after-upload',
  successData: { fileName: 'uploaded-file.pdf' },
};

const getFranchiseAgreementMockHandler = {
  url: '/franchise/agreement/filter',
  method: 'get',
  successData: MOCKS.mockedLegalAgreementList,
};

const getFranchiseAgreementDetailHandler = {
  url: '/franchise/agreement/detail/6512b59b4e0a7e2837ae6deb',
  method: 'get',
  successData: MOCKS.mockedLegalAgreementDetail,
};

const getFranchiseAcceptanceDetailHandler = {
  url: '/franchise/agreement/acceptance-detail/6512b59b4e0a7e2837ae6deb',
  successData: MOCKS.mockedLegalAcceptanceDetail,
};

export default [
  uploadFranchiseLegalFileUrlMockHandler,
  parseFranchiseLegalFileUrlMockHandler,
  getFranchiseAgreementMockHandler,
  getFranchiseAgreementDetailHandler,
  getFranchiseAcceptanceDetailHandler,
];
