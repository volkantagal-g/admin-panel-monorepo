import uploadHandlers from '@shared/api/upload/index.mock.handler';
import {
  detailId,
  detailResponseMock,
  listMock,
  step1ResponseMock,
  step2ResponseMock,
  step3ResponseMock,
} from './index.mock.data';

const listMockHandler = {
  url: '/e2eCourierPlan/filter',
  successData: listMock,
};

const createMockHandler = {
  url: '/e2eCourierPlan',
  successData: detailResponseMock,
};

export const getStep1MockHandler = {
  url: `/e2eCourierPlan/${detailId}`,
  method: 'get',
  successData: detailResponseMock,
};

const saveStep1MockHandler = {
  url: `/e2eCourierPlan/${detailId}/step/1/proceed`,
  method: 'put',
  successData: step1ResponseMock,
};

export const getStep2MockHandler = {
  url: `/e2eCourierPlan/${detailId}`,
  method: 'get',
  successData: step1ResponseMock,
};

const saveStep2MockHandler = {
  url: `/e2eCourierPlan/${detailId}/step/2/proceed`,
  method: 'put',
  successData: step2ResponseMock,
};

export const getStep3MockHandler = {
  url: `/e2eCourierPlan/${detailId}`,
  method: 'get',
  successData: step2ResponseMock,
};

const saveStep3MockHandler = {
  url: `/e2eCourierPlan/${detailId}/step/3/proceed`,
  method: 'put',
  successData: step3ResponseMock,
};

export const getStep4MockHandler = {
  url: `/e2eCourierPlan/${detailId}`,
  method: 'get',
  successData: step3ResponseMock,
};

const uploadFileUrlMockHandler = {
  url: '/e2eCourierPlan/get-signed-upload-url',
  successData: { url: '/signedUrl', fileName: 'uploaded-file.csv' },
};

const downloadFileUrlMockHandler = {
  url: '/e2eCourierPlan/get-signed-url',
  successData: { url: '/signedUrl', fileName: 'uploaded-file.csv' },
};

export default [
  listMockHandler,
  createMockHandler,
  saveStep1MockHandler,
  saveStep2MockHandler,
  saveStep3MockHandler,
  uploadFileUrlMockHandler,
  downloadFileUrlMockHandler,
  ...uploadHandlers,
];
